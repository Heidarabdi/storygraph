import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { rateLimiter } from "./rateLimits";

/**
 * File Storage API
 * Provides secure file upload and retrieval for the Storygraph app.
 * Uses Convex's built-in storage system with proper Id<"_storage"> types.
 */

/**
 * Generate a short-lived upload URL for client-side file uploads.
 * The URL expires in 1 hour.
 * Only authenticated users can generate upload URLs.
 */
export const generateUploadUrl = mutation({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "You must be logged in to upload files",
			});
		}

		await rateLimiter.limit(ctx, "uploadFile", { key: userId, throws: true });

		return await ctx.storage.generateUploadUrl();
	},
});

/**
 * Get a public URL for a stored file (query version).
 * Returns null if the file doesn't exist.
 * Uses proper Id<"_storage"> type for type safety.
 */
export const getUrl = query({
	args: { storageId: v.id("_storage") },
	handler: async (ctx, args) => {
		return await ctx.storage.getUrl(args.storageId);
	},
});

/**
 * Get a public URL for a stored file (mutation version).
 * Use this when you need to get a URL immediately after uploading,
 * since you can't call a query from within a mutation chain.
 */
export const getUrlMutation = mutation({
	args: { storageId: v.id("_storage") },
	handler: async (ctx, args) => {
		return await ctx.storage.getUrl(args.storageId);
	},
});

/**
 * Get multiple file URLs at once.
 * Useful for loading multiple images in a list.
 */
export const getUrls = query({
	args: { storageIds: v.array(v.id("_storage")) },
	handler: async (ctx, args) => {
		const urls = await Promise.all(
			args.storageIds.map(async (id) => ({
				storageId: id,
				url: await ctx.storage.getUrl(id),
			})),
		);
		return urls;
	},
});

/**
 * Delete a file from storage.
 * Only authenticated users can delete files.
 * Uses proper Id<"_storage"> type for type safety.
 */
export const deleteFile = mutation({
	args: { storageId: v.id("_storage") },
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "You must be logged in to delete files",
			});
		}
		await ctx.storage.delete(args.storageId);
	},
});
