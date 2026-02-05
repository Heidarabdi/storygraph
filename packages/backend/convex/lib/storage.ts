import type { Id } from "../_generated/dataModel";

/**
 * Shared utility for resolving storage IDs to URLs.
 * This provides a consistent approach across all entities (users, projects, assets).
 */

type StorageContext = {
	storage: { getUrl: (id: Id<"_storage">) => Promise<string | null> };
};

/**
 * Resolves a single storage ID or URL to a valid URL.
 * - If the value starts with "http", it's already a URL - return as-is
 * - Otherwise, treat it as a storage ID and resolve it
 * - Returns null if resolution fails (allows fallback handling)
 */
export async function resolveStorageUrl(
	ctx: StorageContext,
	value: string | undefined | null
): Promise<string | null> {
	if (!value) return null;
	
	// If already a URL, return as-is
	if (value.startsWith("http")) return value;
	
	// Otherwise it's a storage ID - resolve it
	try {
		const url = await ctx.storage.getUrl(value as unknown as Id<"_storage">);
		return url || null;
	} catch (e) {
		console.warn("Failed to resolve storage ID:", value, e);
		return null;
	}
}

/**
 * Resolves an array of storage IDs/URLs to valid URLs.
 * - Filters out any values that fail to resolve
 * - Returns undefined if no valid URLs remain (for schema consistency)
 */
export async function resolveStorageUrls(
	ctx: StorageContext,
	values: string[] | undefined | null
): Promise<string[] | undefined> {
	if (!values || values.length === 0) return undefined;
	
	const resolvedUrls = await Promise.all(
		values.map((value) => resolveStorageUrl(ctx, value))
	);
	
	// Filter out nulls - only return valid URLs
	const validUrls = resolvedUrls.filter((url): url is string => url !== null);
	return validUrls.length > 0 ? validUrls : undefined;
}
