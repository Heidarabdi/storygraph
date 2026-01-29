import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
	args: { sceneId: v.id("scenes") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return [];

		const scene = await ctx.db.get(args.sceneId);
		if (!scene) return [];

		// Access check via project -> org
		const project = await ctx.db.get(scene.projectId);
		if (!project) return [];

		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", project.orgId).eq("userId", userId),
			)
			.first();
		if (!membership) return [];

		return await ctx.db
			.query("frames")
			.withIndex("by_scene_order", (q) => q.eq("sceneId", args.sceneId))
			.collect();
	},
});

export const create = mutation({
	args: {
		sceneId: v.id("scenes"),
		prompt: v.string(),
		assetReferences: v.optional(v.array(v.id("assets"))),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const scene = await ctx.db.get(args.sceneId);
		if (!scene)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const project = await ctx.db.get(scene.projectId);
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

		// Calculate order
		const lastFrame = await ctx.db
			.query("frames")
			.withIndex("by_scene_order", (q) => q.eq("sceneId", args.sceneId))
			.order("desc")
			.first();
		const order = lastFrame ? lastFrame.order + 1 : 1;

		// Validate prompt (using name validator with custom label, max 500 chars)
		const trimmedPrompt = args.prompt.trim();
		if (!trimmedPrompt) {
			throw new ConvexError({
				code: "VALIDATION_ERROR",
				message: "Frame prompt is required",
			});
		}
		if (trimmedPrompt.length > 500) {
			throw new ConvexError({
				code: "VALIDATION_ERROR",
				message: "Frame prompt must be less than 500 characters",
			});
		}

		const frameId = await ctx.db.insert("frames", {
			sceneId: args.sceneId,
			order,
			prompt: trimmedPrompt,
			status: "pending",
			assetReferences: args.assetReferences ?? [],
		});

		return frameId;
	},
});

export const update = mutation({
	args: {
		id: v.id("frames"),
		prompt: v.optional(v.string()),
		order: v.optional(v.number()),
		status: v.optional(
			v.union(
				v.literal("pending"),
				v.literal("generating"),
				v.literal("complete"),
				v.literal("failed"),
			),
		),
		generatedImageUrl: v.optional(v.string()),
		assetReferences: v.optional(v.array(v.id("assets"))),
	},
	handler: async (ctx, args) => {
		const { id, ...updates } = args;
		const userId = await getAuthUserId(ctx);
		if (!userId)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const frame = await ctx.db.get(id);
		if (!frame)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const scene = await ctx.db.get(frame.sceneId);
		if (!scene)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const project = await ctx.db.get(scene.projectId);
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

		await ctx.db.patch(id, updates);
	},
});

export const remove = mutation({
	args: { id: v.id("frames") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const frame = await ctx.db.get(args.id);
		if (!frame)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const scene = await ctx.db.get(frame.sceneId);
		if (!scene)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const project = await ctx.db.get(scene.projectId);
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
