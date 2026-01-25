import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
		if (!userId) throw new Error("Unauthorized");

		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", args.orgId).eq("userId", userId),
			)
			.first();

		if (!membership) throw new Error("Not a member of this organization");

		const projectId = await ctx.db.insert("projects", {
			orgId: args.orgId,
			name: args.name,
			description: args.description,
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

		// Verify access
		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", args.orgId!).eq("userId", userId),
			)
			.first();
		if (!membership) return [];

		return await ctx.db
			.query("projects")
			.withIndex("by_org", (q) => q.eq("orgId", args.orgId!))
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
		if (!userId) throw new Error("Unauthorized");

		const project = await ctx.db.get(args.projectId);
		if (!project) throw new Error("Project not found");

		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", project.orgId).eq("userId", userId),
			)
			.first();

		if (!membership || membership.role !== "admin") {
			throw new Error("Only organization admins can delete projects");
		}

		// TODO: Cascading delete for scenes, frames, and assets
		await ctx.db.delete(args.projectId);
	},
});
