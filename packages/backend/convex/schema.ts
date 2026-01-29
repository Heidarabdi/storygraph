import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Storygraph schema — org-based multi-tenant model.
 * Auth: ...authTables + custom users (app profile). See labs.convex.dev/auth/setup/schema.
 * Conventions: PLANNING.md §7; implementation_plan (Phase 2).
 */
// -----------------------------------------------------------------------------
// Enums / literal unions (align with PLANNING.md + implementation_plan)
// -----------------------------------------------------------------------------
const subscriptionTier = v.union(
	v.literal("prototyping"),
	v.literal("director"),
	v.literal("studio"),
	v.literal("enterprise"),
);

const orgMemberRole = v.union(
	v.literal("admin"),
	v.literal("member"),
	v.literal("viewer"),
);

const orgPlan = v.union(
	v.literal("prototyping"),
	v.literal("director"),
	v.literal("studio"),
	v.literal("enterprise"),
);

const assetType = v.union(
	v.literal("character"),
	v.literal("environment"),
	v.literal("prop"),
	v.literal("style"),
);

const frameStatus = v.union(
	v.literal("pending"),
	v.literal("generating"),
	v.literal("complete"),
	v.literal("failed"),
);

const activityResourceType = v.union(
	v.literal("organization"),
	v.literal("project"),
	v.literal("asset"),
	v.literal("scene"),
	v.literal("frame"),
	v.literal("user"),
);

// -----------------------------------------------------------------------------
// Schema
// -----------------------------------------------------------------------------
export default defineSchema({
	// ---- Auth (Convex Auth) ----
	...authTables,

	// App profile extension of auth users (sync via auth profile callback)
	users: defineTable({
		// Auth-managed optional fields
		name: v.optional(v.string()),
		image: v.optional(v.string()),
		email: v.optional(v.string()),
		emailVerificationTime: v.optional(v.number()),
		phone: v.optional(v.string()),
		phoneVerificationTime: v.optional(v.number()),
		isAnonymous: v.optional(v.boolean()),
		// Storygraph app profile
		subscriptionTier: v.optional(subscriptionTier),
		credits: v.optional(v.number()),
	})
		.index("email", ["email"])
		.index("phone", ["phone"]),

	// ---- Multi-tenancy (implementation_plan: org-based model) ----
	organizations: defineTable({
		name: v.string(),
		slug: v.string(),
		plan: v.optional(orgPlan),
		ownerId: v.id("users"),
	})
		.index("by_slug", ["slug"])
		.index("by_owner", ["ownerId"]),

	organizationMembers: defineTable({
		orgId: v.id("organizations"),
		userId: v.id("users"),
		role: orgMemberRole,
	})
		.index("by_org", ["orgId"])
		.index("by_user", ["userId"])
		.index("by_org_user", ["orgId", "userId"]),

	// ---- Project structure ----
	projects: defineTable({
		orgId: v.id("organizations"),
		name: v.string(),
		description: v.optional(v.string()),
		thumbnail: v.optional(v.string()), // storage ID or URL
		isPublic: v.optional(v.boolean()),
	}).index("by_org", ["orgId"]),

	assets: defineTable({
		projectId: v.id("projects"),
		type: assetType,
		name: v.string(),
		description: v.optional(v.string()),
		referenceImages: v.optional(v.array(v.string())), // storage IDs
		metadata: v.optional(
			v.record(v.string(), v.union(v.string(), v.number(), v.boolean())),
		), // typed: style params, emotions, etc.
	})
		.index("by_project", ["projectId"])
		.index("by_project_type", ["projectId", "type"]),

	scenes: defineTable({
		projectId: v.id("projects"),
		name: v.string(),
		order: v.number(),
		description: v.optional(v.string()),
	})
		.index("by_project", ["projectId"])
		.index("by_project_order", ["projectId", "order"]),

	frames: defineTable({
		sceneId: v.id("scenes"),
		order: v.number(),
		prompt: v.string(),
		generatedImageUrl: v.optional(v.string()), // storage ID or URL
		assetReferences: v.optional(v.array(v.id("assets"))),
		status: frameStatus,
		generationHistory: v.optional(
			v.array(
				v.object({
					prompt: v.string(),
					imageUrl: v.optional(v.string()),
					model: v.optional(v.string()),
					finishedAt: v.number(),
				}),
			),
		),
	})
		.index("by_scene", ["sceneId"])
		.index("by_scene_order", ["sceneId", "order"])
		.index("by_status", ["status"]),

	// ---- AI history & auditing (implementation_plan) ----
	generations: defineTable({
		frameId: v.id("frames"),
		userId: v.id("users"),
		model: v.string(),
		prompt: v.string(),
		parameters: v.optional(
			v.record(v.string(), v.union(v.string(), v.number(), v.boolean())),
		),
		cost: v.optional(v.number()),
		durationMs: v.optional(v.number()),
		status: v.optional(
			v.union(v.literal("pending"), v.literal("complete"), v.literal("failed")),
		),
		resultStorageId: v.optional(v.string()),
	})
		.index("by_frame", ["frameId"])
		.index("by_user", ["userId"]),

	activityLogs: defineTable({
		orgId: v.id("organizations"),
		userId: v.id("users"),
		action: v.string(),
		resourceType: activityResourceType,
		resourceId: v.string(),
		metadata: v.optional(
			v.record(v.string(), v.union(v.string(), v.number(), v.boolean())),
		),
	})
		.index("by_org", ["orgId"])
		.index("by_user", ["userId"]),
});
