import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { validateDescription, validateName } from "./lib/validation";
import { resolveStorageUrls } from "./lib/storage";
import type { Id } from "./_generated/dataModel";

/**
 * ASSET LIBRARY PHILOSOPHY:
 * Assets are first-class citizens of an Organization. 
 * They are created in the Library (org-level) and are globally accessible
 * across all projects within that organization.
 */

// List assets within an Organization
export const list = query({
	args: {
		orgId: v.id("organizations"),
		categoryId: v.optional(v.id("assetCategories")),
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

		let q = ctx.db
			.query("assets")
			.withIndex("by_org", (qx) => qx.eq("orgId", args.orgId));

		if (args.categoryId) {
			q = ctx.db
				.query("assets")
				.withIndex("by_org_category", (qx) => 
					qx.eq("orgId", args.orgId).eq("categoryId", args.categoryId!)
				);
		}

		const assets = await q.collect();

		// Resolve reference image URLs
		const assetsWithUrls = await Promise.all(
			assets.map(async (asset) => ({
				...asset,
				referenceImages: await resolveStorageUrls(ctx, asset.referenceImages),
			}))
		);

		return assetsWithUrls;
	},
});

// Helper for the Library page to see everything they have access to across all their orgs
export const listAll = query({
	args: {
		categoryId: v.optional(v.id("assetCategories")),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return [];

		const memberships = await ctx.db
			.query("organizationMembers")
			.withIndex("by_user", (q) => q.eq("userId", userId))
			.collect();

		if (memberships.length === 0) return [];

		let allAssets: any[] = [];
		for (const membership of memberships) {
			let q = ctx.db
				.query("assets")
				.withIndex("by_org", (qx) => qx.eq("orgId", membership.orgId));
			
			if (args.categoryId) {
				q = ctx.db
					.query("assets")
					.withIndex("by_org_category", (qx) => 
						qx.eq("orgId", membership.orgId).eq("categoryId", args.categoryId!)
					);
			}
			const results = await q.collect();
			allAssets = allAssets.concat(results);
		}

		// Resolve reference image URLs for all assets
		const assetsWithUrls = await Promise.all(
			allAssets.map(async (asset) => ({
				...asset,
				referenceImages: await resolveStorageUrls(ctx, asset.referenceImages),
			}))
		);

		return assetsWithUrls;
	},
});


export const search = query({
	args: {
		orgId: v.id("organizations"),
		categoryId: v.optional(v.id("assetCategories")),
		query: v.string(),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) return [];

		if (args.query.trim().length === 0) return [];

		let assetsQuery = ctx.db.query("assets").withSearchIndex("search_assets", (q) => {
			let searchQ = q.search("name", args.query).eq("orgId", args.orgId);
			if (args.categoryId) searchQ = searchQ.eq("categoryId", args.categoryId);
			return searchQ;
		});

		return await assetsQuery.collect();
	},
});

export const create = mutation({
	args: {
		orgId: v.id("organizations"),
		categoryId: v.id("assetCategories"),
		name: v.string(),
		description: v.optional(v.string()),
		referenceImages: v.optional(v.array(v.string())),
		metadata: v.optional(v.any()),
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

		const validatedName = validateName(args.name, "Asset name");
		const validatedDescription = validateDescription(args.description);

		return await ctx.db.insert("assets", {
			orgId: args.orgId,
			categoryId: args.categoryId,
			name: validatedName,
			description: validatedDescription,
			referenceImages: args.referenceImages,
			metadata: args.metadata,
		});
	},
});

export const update = mutation({
	args: {
		id: v.id("assets"),
		name: v.optional(v.string()),
		description: v.optional(v.string()),
		categoryId: v.optional(v.id("assetCategories")),
		referenceImages: v.optional(v.array(v.string())),
		metadata: v.optional(v.any()),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId)
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const asset = await ctx.db.get(args.id);
		if (!asset)
			throw new ConvexError({ code: "NOT_FOUND", message: "Asset not found" });

		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", asset.orgId).eq("userId", userId),
			)
			.first();
		if (!membership || membership.role === "viewer")
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		const updates: any = {};
		if (args.name !== undefined) updates.name = validateName(args.name, "Asset name");
		if (args.description !== undefined) updates.description = validateDescription(args.description);
		if (args.categoryId !== undefined) updates.categoryId = args.categoryId;
		if (args.referenceImages !== undefined) updates.referenceImages = args.referenceImages;
		if (args.metadata !== undefined) updates.metadata = args.metadata;

		await ctx.db.patch(args.id, updates);
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
			throw new ConvexError({ code: "NOT_FOUND", message: "Asset not found" });

		const membership = await ctx.db
			.query("organizationMembers")
			.withIndex("by_org_user", (q) =>
				q.eq("orgId", asset.orgId).eq("userId", userId),
			)
			.first();
		if (!membership || membership.role === "viewer")
			throw new ConvexError({ code: "UNAUTHORIZED", message: "Unauthorized" });

		// Delete reference images from storage
		if (asset.referenceImages && asset.referenceImages.length > 0) {
			for (const imageUrl of asset.referenceImages) {
				// Extract storage ID from URL if it's a Convex storage URL
				// Format: https://xxx.convex.cloud/api/storage/{storageId}
				const match = imageUrl.match(/\/api\/storage\/([a-zA-Z0-9_-]+)$/);
				if (match) {
					try {
						await ctx.storage.delete(match[1] as Id<"_storage">);
					} catch (e) {
						// Ignore deletion errors - file may already be deleted
						console.warn("Failed to delete storage file:", e);
					}
				}
			}
		}

		await ctx.db.delete(args.id);
	},
});
