import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { query } from "./_generated/server";

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

// Get members of a specific organization (for team page)
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
				return user
					? {
							id: membership._id,
							userId: user._id,
							name: user.name || user.email || "Unknown",
							email: user.email || "",
							role: membership.role,
							avatar:
								user.image ||
								`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
							status: "Active" as const,
						}
					: null;
			}),
		);

		return members.filter((m) => m !== null);
	},
});
