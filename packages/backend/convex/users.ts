import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";

/**
 * Get the current authenticated user's profile.
 * Resolves image storage ID to URL if present.
 */
export const viewer = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			return null;
		}
		const user = await ctx.db.get(userId);
		if (!user) return null;

		// Resolve image storage ID to URL if it's a storage ID
		let imageUrl = user.image;
		if (user.image && !user.image.startsWith("http")) {
			try {
				// Import Id type from _generated/dataModel for proper typing
				const storageId = user.image as unknown as import("./_generated/dataModel").Id<"_storage">;
				const url = await ctx.storage.getUrl(storageId);
				if (url) imageUrl = url;
			} catch {
				// Keep original value if resolution fails
			}
		}

		return {
			...user,
			image: imageUrl,
		};
	},
});

/**
 * Update the current user's profile.
 * Only the authenticated user can update their own profile.
 */
export const update = mutation({
	args: {
		name: v.optional(v.string()),
		image: v.optional(v.string()),
		bio: v.optional(v.string()),
		role: v.optional(v.string()),
		showInDirectory: v.optional(v.boolean()),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "You must be logged in to update your profile",
			});
		}

		// Only patch fields that were provided
		const updates: Record<string, unknown> = {};
		if (args.name !== undefined) updates.name = args.name;
		if (args.image !== undefined) updates.image = args.image;
		if (args.bio !== undefined) updates.bio = args.bio;
		if (args.role !== undefined) updates.role = args.role;
		if (args.showInDirectory !== undefined)
			updates.showInDirectory = args.showInDirectory;

		if (Object.keys(updates).length === 0) {
			return { success: true, message: "No updates provided" };
		}

		await ctx.db.patch(userId, updates);
		return { success: true };
	},
});

/**
 * Update user notification preferences.
 */
export const updatePreferences = mutation({
	args: {
		emailNotifications: v.optional(v.boolean()),
		projectUpdates: v.optional(v.boolean()),
		teamMentions: v.optional(v.boolean()),
		weeklyDigest: v.optional(v.boolean()),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		if (!userId) {
			throw new ConvexError({
				code: "UNAUTHORIZED",
				message: "You must be logged in to update preferences",
			});
		}

		const updates: Record<string, unknown> = {};
		if (args.emailNotifications !== undefined)
			updates.emailNotifications = args.emailNotifications;
		if (args.projectUpdates !== undefined)
			updates.projectUpdates = args.projectUpdates;
		if (args.teamMentions !== undefined)
			updates.teamMentions = args.teamMentions;
		if (args.weeklyDigest !== undefined)
			updates.weeklyDigest = args.weeklyDigest;

		if (Object.keys(updates).length === 0) {
			return { success: true, message: "No updates provided" };
		}

		await ctx.db.patch(userId, updates);
		return { success: true };
	},
});
