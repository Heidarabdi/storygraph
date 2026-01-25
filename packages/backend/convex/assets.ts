import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
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
					q.eq("projectId", args.projectId).eq("type", args.type!),
				);
		}

		return await assetsQuery.collect();
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
		if (!userId) throw new Error("Unauthorized");

		const project = await ctx.db.get(args.projectId);
		if (!project) throw new Error("Project not found");

		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", project.orgId).eq("userId", userId),
			)
			.first();
		if (!membership) throw new Error("Unauthorized");

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
		if (!userId) throw new Error("Unauthorized");

		const asset = await ctx.db.get(args.id);
		if (!asset) throw new Error("Asset not found");

		const project = await ctx.db.get(asset.projectId);
		if (!project) throw new Error("Project not found");

		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", project.orgId).eq("userId", userId),
			)
			.first();
		if (!membership) throw new Error("Unauthorized");

		await ctx.db.delete(args.id);
	},
});
