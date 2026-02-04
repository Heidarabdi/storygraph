/**
 * Shared type definitions for editor components
 * Uses Convex's FunctionReturnType for type-safe inference from API queries
 */
import type { FunctionReturnType } from "convex/server";
import type { Id } from "@storygraph/backend/convex/_generated/dataModel";
import type { api } from "@storygraph/backend/convex/_generated/api";

// Inferred types from Convex queries
export type FrameList = FunctionReturnType<typeof api.frames.list>;
export type AssetList = FunctionReturnType<typeof api.assets.list>;
export type SceneList = FunctionReturnType<typeof api.scenes.list>;

// Single item types (extracted from arrays)
export type EditorFrame = NonNullable<FrameList>[number];
export type EditorAsset = NonNullable<AssetList>[number];
export type EditorScene = NonNullable<SceneList>[number];

// Grouped assets type for Asset Library
export interface GroupedAssets {
  [categoryId: string]: {
    name: string;
    assets: EditorAsset[];
  };
}

// Re-export Id for convenience
export type { Id };
