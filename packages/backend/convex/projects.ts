import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { validateDescription, validateName } from "./lib/validation";

// List projects for a specific organization
export const list = query({
	args: { orgId: v.id("organizations") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return []; // Or throw

		// Simple check: is user member of org?
		// (For production, move this to a helper function)
		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", args.orgId).eq("userId", userId),
			)
			.first();

		if (!membership) return [];

		const projects = await ctx.db
			.query("projects")
			.withIndex("by_org", (q) => q.eq("orgId", args.orgId))
			.order("desc") // default sort by creation time
			.collect();

		return projects;
	},
});

// Create a new project
export const create = mutation({
	args: {
		orgId: v.id("organizations"),
		name: v.string(),
		description: v.optional(v.string()),
		isPublic: v.optional(v.boolean()),
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

		if (!membership)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		// Validate inputs
		const validatedName = validateName(args.name, "Project name");
		const validatedDescription = validateDescription(args.description);

		const projectId = await ctx.db.insert("projects", {
			orgId: args.orgId,
			name: validatedName,
			description: validatedDescription,
			isPublic: args.isPublic ?? false,
			// thumbnail: TODO generate pattern
		});

		return projectId;
	},
});

// Recent projects (across all user's orgs or specific?
// For now, let's stick to org-scoped for the dashboard if a folder is selected,
// OR all projects if "My Workspace" implies everything.
// The dashboard UI mock seemed to imply a global list or folder based.
// Let's simplified: Get recent projects from the CURRENTLY active context org.
// But wait, the mock dashboard shows "All Projects" and has a sidebar.
// Let's implement 'getRecent' to fetch from the org passed in args.
export const getRecent = query({
	args: { orgId: v.optional(v.id("organizations")) },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return [];

		if (!args.orgId) {
			// If no org provided, find the user's "Personal" org or first available
			// For now, return empty to force UI to pick an org
			return [];
		}

		const orgId = args.orgId;

		// Verify access
		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", orgId).eq("userId", userId),
			)
			.first();
		if (!membership) return [];

		return await ctx.db
			.query("projects")
			.withIndex("by_org", (q) => q.eq("orgId", orgId))
			.order("desc")
			.take(10);
	},
});

// Get a single project
export const get = query({
	args: { projectId: v.id("projects") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return null;

		const project = await ctx.db.get(args.projectId);
		if (!project) return null;

		// Verify access via org membership
		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", project.orgId).eq("userId", userId),
			)
			.first();

		if (!membership) return null;

		return project;
	},
});

// Delete a project
export const remove = mutation({
	args: { projectId: v.id("projects") },
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

		if (!membership || membership.role !== "admin") {
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });
		}

		// Cascading delete: scenes and frames (Assets are now Org-scoped and preserved)
		
		// 1. Delete all scenes and their frames (Skipping assets as they are global now)

		// 2. Delete all scenes and their frames
		const scenes = await ctx.db
			.query("scenes")
			.withIndex("by_project", (q) => q.eq("projectId", args.projectId))
			.collect();
		for (const scene of scenes) {
			const frames = await ctx.db
				.query("frames")
				.withIndex("by_scene", (q) => q.eq("sceneId", scene._id))
				.collect();
			for (const frame of frames) {
				await ctx.db.delete(frame._id);
			}
			await ctx.db.delete(scene._id);
		}

		// 3. Delete the project
		await ctx.db.delete(args.projectId);
	},
});
