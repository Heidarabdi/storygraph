import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
	args: {
		projectId: v.id("projects"),
		type: v.optional(
			v.union(
				v.literal("character"),
				v.literal("environment"),
				v.literal("prop"),
				v.literal("style"),
			),
		),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return [];

		const project = await ctx.db.get(args.projectId);
		if (!project) return [];

		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", project.orgId).eq("userId", userId),
			)
			.first();
		if (!membership) return [];

		let assetsQuery = ctx.db
			.query("assets")
			.withIndex("by_project", (q) => q.eq("projectId", args.projectId));

		if (args.type) {
			assetsQuery = ctx.db
				.query("assets")
				.withIndex("by_project_type", (q) =>
					q
						.eq("projectId", args.projectId)
						.eq(
							"type",
							args.type as "character" | "environment" | "prop" | "style",
						),
				);
		}

		return await assetsQuery.collect();
	},
});

// List all assets across all organizations the user belongs to (for library page)
export const listAll = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return [];

		// Get all organizations the user is a member of
		const memberships = await ctx.db
			.query("organizationMembers")
			.withIndex("by_user", (q) => q.eq("userId", userId))
			.collect();

		if (memberships.length === 0) return [];

		// Get all projects from those organizations
		const allAssets = [];
		for (const membership of memberships) {
			const projects = await ctx.db
				.query("projects")
				.withIndex("by_org", (q) => q.eq("orgId", membership.orgId))
				.collect();

			for (const project of projects) {
				const assets = await ctx.db
					.query("assets")
					.withIndex("by_project", (q) => q.eq("projectId", project._id))
					.collect();
				allAssets.push(...assets);
			}
		}

		return allAssets;
	},
});

export const create = mutation({
	args: {
		projectId: v.id("projects"),
		type: v.union(
			v.literal("character"),
			v.literal("environment"),
			v.literal("prop"),
			v.literal("style"),
		),
		name: v.string(),
		description: v.optional(v.string()),
		referenceImages: v.optional(v.array(v.string())),
		metadata: v.optional(v.any()),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const project = await ctx.db.get(args.projectId);
		if (!project)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", project.orgId).eq("userId", userId),
			)
			.first();
		if (!membership)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const assetId = await ctx.db.insert("assets", {
			projectId: args.projectId,
			type: args.type,
			name: args.name,
			description: args.description,
			referenceImages: args.referenceImages,
			metadata: args.metadata,
		});

		return assetId;
	},
});

export const remove = mutation({
	args: { id: v.id("assets") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const asset = await ctx.db.get(args.id);
		if (!asset)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const project = await ctx.db.get(asset.projectId);
		if (!project)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", project.orgId).eq("userId", userId),
			)
			.first();
		if (!membership)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });
		if (membership.role === "viewer")
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		await ctx.db.delete(args.id);
	},
});
