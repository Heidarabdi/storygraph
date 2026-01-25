import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) {
            return [];
        }

        // Get all org memberships for the user
        const memberships = await ctx.db
            .query("organizationMembers")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .collect();

        if (!memberships.length) {
            return [];
        }

        // Fetch the actual organization documents
        const orgs = await Promise.all(
            memberships.map(async (membership) => {
                const org = await ctx.db.get(membership.orgId);
                return org ? { ...org, role: membership.role } : null;
            }),
        );

        return orgs.filter((org) => org !== null);
    },
});
