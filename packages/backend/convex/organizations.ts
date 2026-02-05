import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { resolveStorageUrl } from "./lib/storage";

// Role type for organization members
const orgMemberRole = v.union(
	v.literal("admin"),
	v.literal("member"),
	v.literal("viewer"),
);

/**
 * List all organizations the current user belongs to.
 */
export const list = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return [];
		}

		// Get all org memberships for the user
		const memberships = await ctx.db
			.query("organizationMembers")
			.withIndex("by_user", (q) => q.eq("userId", userId))
			.collect();

		if (!memberships.length) {
			return [];
		}

		// Fetch the actual organization documents
		const orgs = await Promise.all(
			memberships.map(async (membership) => {
				const org = await ctx.db.get(membership.orgId);
				return org ? { ...org, role: membership.role } : null;
			}),
		);

		return orgs.filter((org) => org !== null);
	},
});

/**
 * Get members of a specific organization (for team page).
 */
export const getMembers = query({
	args: { orgId: v.optional(v.id("organizations")) },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return [];

		// If no orgId provided, get the first org the user belongs to
		let targetOrgId = args.orgId;
		if (!targetOrgId) {
			const firstMembership = await ctx.db
				.query("organizationMembers")
				.withIndex("by_user", (q) => q.eq("userId", userId))
				.first();
			if (!firstMembership) return [];
			targetOrgId = firstMembership.orgId;
		}

		if (!targetOrgId) return [];

		// Verify the user is a member of this organization
		const userMembership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", targetOrgId).eq("userId", userId),
			)
			.first();
		if (!userMembership) return [];

		// Get all members of the organization
		const memberships = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org", (q) => q.eq("orgId", targetOrgId))
			.collect();

		// Fetch user details for each member
		const members = await Promise.all(
			memberships.map(async (membership) => {
				const user = await ctx.db.get(membership.userId);
				if (!user) return null;

				// Resolve avatar URL (handles both storage IDs and URLs)
				const resolvedAvatar = await resolveStorageUrl(ctx, user.image);

				return {
					id: membership._id,
					userId: user._id,
					name: user.name || user.email || "Unknown",
					email: user.email || "",
					role: membership.role,
					avatar:
						resolvedAvatar ||
						`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
					status: "Active" as const,
				};
			}),
		);

		return members.filter((m) => m !== null);
	},
});

/**
 * Update organization settings.
 * Only admins can update the organization.
 */
export const update = mutation({
	args: {
		orgId: v.id("organizations"),
		name: v.optional(v.string()),
		slug: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "You must be logged in",
			});
		}

		// Verify user is admin of this org
		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", args.orgId).eq("userId", userId),
			)
			.first();

		if (!membership || membership.role !== "admin") {
			throw new ConvexError({
				code: "FORBIDDEN",
				message: "Only admins can update organization settings",
			});
		}

		const updates: Record<string, unknown> = {};
		if (args.name !== undefined) updates.name = args.name;
		if (args.slug !== undefined) updates.slug = args.slug;

		if (Object.keys(updates).length > 0) {
			await ctx.db.patch(args.orgId, updates);
		}

		return { success: true };
	},
});

/**
 * Update a member's role in the organization.
 * Only admins can change roles.
 */
export const updateMemberRole = mutation({
	args: {
		membershipId: v.id("organizationMembers"),
		role: orgMemberRole,
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "You must be logged in",
			});
		}

		// Get the membership being updated
		const targetMembership = await ctx.db.get(args.membershipId);
		if (!targetMembership) {
			throw new ConvexError({
				code: "NOT_FOUND",
				message: "Membership not found",
			});
		}

		// Verify current user is admin of this org
		const currentUserMembership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", targetMembership.orgId).eq("userId", userId),
			)
			.first();

		if (!currentUserMembership || currentUserMembership.role !== "admin") {
			throw new ConvexError({
				code: "FORBIDDEN",
				message: "Only admins can change member roles",
			});
		}

		// Prevent demoting the last admin
		if (targetMembership.role === "admin" && args.role !== "admin") {
			const adminCount = await ctx.db
				.query("organizationMembers")
				.withIndex("by_org", (q) => q.eq("orgId", targetMembership.orgId))
				.filter((q) => q.eq(q.field("role"), "admin"))
				.collect();

			if (adminCount.length <= 1) {
				throw new ConvexError({
					code: "FORBIDDEN",
					message: "Cannot demote the last admin",
				});
			}
		}

		await ctx.db.patch(args.membershipId, { role: args.role });
		return { success: true };
	},
});

/**
 * Remove a member from the organization.
 * Only admins can remove members.
 */
export const removeMember = mutation({
	args: {
		membershipId: v.id("organizationMembers"),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "You must be logged in",
			});
		}

		// Get the membership being removed
		const targetMembership = await ctx.db.get(args.membershipId);
		if (!targetMembership) {
			throw new ConvexError({
				code: "NOT_FOUND",
				message: "Membership not found",
			});
		}

		// Verify current user is admin of this org
		const currentUserMembership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", targetMembership.orgId).eq("userId", userId),
			)
			.first();

		if (!currentUserMembership || currentUserMembership.role !== "admin") {
			throw new ConvexError({
				code: "FORBIDDEN",
				message: "Only admins can remove members",
			});
		}

		// Prevent removing the last admin
		if (targetMembership.role === "admin") {
			const adminCount = await ctx.db
				.query("organizationMembers")
				.withIndex("by_org", (q) => q.eq("orgId", targetMembership.orgId))
				.filter((q) => q.eq(q.field("role"), "admin"))
				.collect();

			if (adminCount.length <= 1) {
				throw new ConvexError({
					code: "FORBIDDEN",
					message: "Cannot remove the last admin",
				});
			}
		}

		await ctx.db.delete(args.membershipId);
		return { success: true };
	},
});
