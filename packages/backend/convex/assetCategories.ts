import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { validateDescription, validateName } from "./lib/validation";

export const listAll = query({
	args: {
		orgId: v.id("organizations"),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return [];

		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", args.orgId).eq("userId", userId),
			)
			.first();
		if (!membership) return [];

		return await ctx.db
			.query("assetCategories")
			.withIndex("by_org", (q) => q.eq("orgId", args.orgId))
			.collect();
	},
});

export const create = mutation({
	args: {
		orgId: v.id("organizations"),
		name: v.string(),
		description: v.optional(v.string()),
		icon: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", args.orgId).eq("userId", userId),
			)
			.first();
		if (!membership || membership.role === "viewer")
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const validatedName = validateName(args.name, "Category name");
		const validatedDescription = validateDescription(args.description);

		return await ctx.db.insert("assetCategories", {
			orgId: args.orgId,
			name: validatedName,
			description: validatedDescription,
			icon: args.icon,
		});
	},
});

export const update = mutation({
	args: {
		id: v.id("assetCategories"),
		name: v.optional(v.string()),
		description: v.optional(v.string()),
		icon: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const category = await ctx.db.get(args.id);
		if (!category)
			throw new ConvexError({ code: "NOT_FOUND", message: "Category not found" });

		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", category.orgId).eq("userId", userId),
			)
			.first();
		if (!membership || membership.role === "viewer")
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const updates: Partial<typeof category> = {};
		if (args.name !== undefined) {
			updates.name = validateName(args.name, "Category name");
		}
		if (args.description !== undefined) {
			updates.description = validateDescription(args.description);
		}
		if (args.icon !== undefined) {
			updates.icon = args.icon;
		}

		await ctx.db.patch(args.id, updates);
	},
});

export const remove = mutation({
	args: { id: v.id("assetCategories") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const category = await ctx.db.get(args.id);
		if (!category)
			throw new ConvexError({ code: "NOT_FOUND", message: "Category not found" });

		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", category.orgId).eq("userId", userId),
			)
			.first();
		if (!membership || membership.role !== "admin")
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "Only admins can delete categories",
			});

		// Check if there are any assets using this category
		const assets = await ctx.db
			.query("assets")
			.withIndex("by_org_category", (q) =>
				q.eq("orgId", category.orgId).eq("categoryId", args.id),
			)
			.first();

		if (assets) {
			throw new ConvexError({
				code: "CONFLICT",
				message: "Cannot delete category while it has assets",
			});
		}

		await ctx.db.delete(args.id);
	},
});
