import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
	args: { projectId: v.id("projects") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return [];

		const project = await ctx.db.get(args.projectId);
		if (!project) return [];

		// Access check
		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", project.orgId).eq("userId", userId),
			)
			.first();
		if (!membership) return [];

		return await ctx.db
			.query("scenes")
			.withIndex("by_project_order", (q) => q.eq("projectId", args.projectId))
			.collect();
	},
});

export const create = mutation({
	args: {
		projectId: v.id("projects"),
		name: v.string(),
		description: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const project = await ctx.db.get(args.projectId);
		if (!project)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		// Access check
		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", project.orgId).eq("userId", userId),
			)
			.first();
		if (!membership)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		// Calculate order
		const lastScene = await ctx.db
			.query("scenes")
			.withIndex("by_project_order", (q) => q.eq("projectId", args.projectId))
			.order("desc")
			.first();
		const order = lastScene ? lastScene.order + 1 : 1;

		const sceneId = await ctx.db.insert("scenes", {
			projectId: args.projectId,
			name: args.name,
			description: args.description,
			order,
		});

		return sceneId;
	},
});

export const update = mutation({
	args: {
		id: v.id("scenes"),
		name: v.optional(v.string()),
		description: v.optional(v.string()),
		order: v.optional(v.number()),
	},
	handler: async (ctx, args) => {
		const { id, ...updates } = args;
		const userId = await getAuthUserId(ctx);
		if (!userId)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const scene = await ctx.db.get(id);
		if (!scene)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const project = await ctx.db.get(scene.projectId);
		if (!project)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		// Access check
		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", project.orgId).eq("userId", userId),
			)
			.first();
		if (!membership)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		await ctx.db.patch(id, updates);
	},
});

export const remove = mutation({
	args: { id: v.id("scenes") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const scene = await ctx.db.get(args.id);
		if (!scene)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const project = await ctx.db.get(scene.projectId);
		if (!project)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		// Access check
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

		// Delete associated frames
		const frames = await ctx.db
			.query("frames")
			.withIndex("by_scene", (q) => q.eq("sceneId", args.id))
			.collect();
		for (const frame of frames) {
			await ctx.db.delete(frame._id);
		}

		await ctx.db.delete(args.id);
	},
});
