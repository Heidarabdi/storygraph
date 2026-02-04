import { api } from "@storygraph/backend/convex/_generated/api";
import type { Id } from "@storygraph/backend/convex/_generated/dataModel";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState, useRef } from "react";
import type { ImperativePanelHandle } from "react-resizable-panels";

import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

// Extracted Components
import { EditorSidebar } from "@/components/editor/EditorSidebar";
import { AssetLibrarySheet } from "@/components/editor/AssetLibrarySheet";
import { SceneSettingsSheet } from "@/components/editor/SceneSettingsSheet";
import { EditorCanvas } from "@/components/editor/EditorCanvas";
import { EditorRightPanel } from "@/components/editor/EditorRightPanel";
import { Timeline } from "@/components/editor/Timeline";

export const Route = createFileRoute("/_authenticated/editor/$projectId")({
  component: EditorPage,
});

function EditorPage() {
  const { projectId: _projectId } = useParams({
    from: "/_authenticated/editor/$projectId",
  });
  const projectId = _projectId as Id<"projects">;

  // UI State
  const [activeSceneId, setActiveSceneId] = useState<string | null>(null);
  const [activeFrameId, setActiveFrameId] = useState<string | null>(null);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const timelinePanelRef = useRef<ImperativePanelHandle>(null);

  // Data Queries
  const project = useQuery(api.projects.get, { projectId });
  const scenes = useQuery(api.scenes.list, { projectId });
  const frames = useQuery(
    api.frames.list,
    activeSceneId ? { sceneId: activeSceneId as Id<"scenes"> } : "skip",
  );
  const assets = useQuery(
    api.assets.list,
    project?.orgId ? { orgId: project.orgId } : "skip",
  );
  const categories = useQuery(
    api.assetCategories.listAll,
    project?.orgId ? { orgId: project.orgId } : "skip",
  );

  // Group assets by category
  const groupedAssets =
    categories?.reduce(
      (acc, cat) => {
        acc[cat._id] = {
          name: cat.name,
          assets: assets?.filter((a) => a.categoryId === cat._id) || [],
        };
        return acc;
      },
      {} as Record<
        string,
        { name: string; assets: NonNullable<typeof assets> }
      >,
    ) || {};

  // Add "Uncategorized" group if there are assets without categories
  const uncategorizedAssets = assets?.filter((a) => !a.categoryId) || [];
  if (uncategorizedAssets.length > 0) {
    groupedAssets["uncategorized"] = {
      name: "Uncategorized",
      assets: uncategorizedAssets,
    };
  }

  // Mutations
  const createScene = useMutation(api.scenes.create);
  const createFrame = useMutation(api.frames.create);
  const updateFrame = useMutation(api.frames.update);
  const deleteFrame = useMutation(api.frames.remove);

  // Sync active scene
  useEffect(() => {
    if (scenes && scenes.length > 0 && !activeSceneId) {
      setActiveSceneId(scenes[0]._id);
    }
  }, [scenes, activeSceneId]);

  // Sync active frame
  useEffect(() => {
    if (frames && frames.length > 0 && !activeFrameId) {
      setActiveFrameId(frames[0]._id);
    }
  }, [frames, activeFrameId]);

  const activeFrame = frames?.find((f) => f._id === activeFrameId);
  const activeScene = scenes?.find((s) => s._id === activeSceneId);

  const handleAddFrame = async () => {
    if (!activeSceneId) {
      const newSceneId = await createScene({ projectId, name: "Scene 01" });
      setActiveSceneId(newSceneId);
      await createFrame({ sceneId: newSceneId, prompt: "" });
    } else {
      const newFrame = await createFrame({
        sceneId: activeSceneId as Id<"scenes">,
        prompt: "",
      });
      setActiveFrameId(newFrame);
    }
  };

  const handleUpdatePrompt = async (prompt: string) => {
    if (!activeFrameId) return;
    await updateFrame({ id: activeFrameId as Id<"frames">, prompt });
  };

  const handleDeleteFrame = async () => {
    if (!activeFrame) return;
    await deleteFrame({ id: activeFrame._id });
    setActiveFrameId(null);
  };

  const handleGenerate = async () => {
    if (!activeFrame) return;
    // Set status to generating
    await updateFrame({
      id: activeFrame._id,
      status: "generating",
    });
    // TODO: Call actual AI generation action here
    // For now, this just sets the status - actual generation would be an action
  };

  const handleInjectAsset = async (assetId: Id<"assets">) => {
    if (!activeFrame) return;
    const currentRefs = activeFrame.assetReferences || [];
    // Don't add duplicates
    if (currentRefs.includes(assetId)) return;
    await updateFrame({
      id: activeFrame._id,
      assetReferences: [...currentRefs, assetId],
    });
  };

  if (!project) return null;

  return (
    <TooltipProvider delayDuration={100}>
      <div className="relative flex h-svh w-full flex-col overflow-hidden bg-background">
        <EditorSidebar
          activeFrame={activeFrame}
          onDeleteFrame={handleDeleteFrame}
          onGenerate={handleGenerate}
          AssetLibraryComponent={
            <AssetLibrarySheet
              groupedAssets={groupedAssets}
              onAssetClick={handleInjectAsset}
            />
          }
          SceneSettingsComponent={<SceneSettingsSheet />}
        />

        <ResizablePanelGroup direction="vertical" className="flex-1">
          <ResizablePanel defaultSize={75} minSize={40}>
            <EditorCanvas
              activeFrame={activeFrame}
              activeScene={activeScene}
              showRightSidebar={showRightSidebar}
              setShowRightSidebar={setShowRightSidebar}
              onUpdatePrompt={handleUpdatePrompt}
              onAddFrame={handleAddFrame}
              rightPanel={
                <EditorRightPanel
                  showRightSidebar={showRightSidebar}
                  setShowRightSidebar={setShowRightSidebar}
                  assets={assets}
                  activeFrame={activeFrame}
                  frames={frames}
                />
              }
            />
          </ResizablePanel>

          <ResizableHandle
            withHandle
            className="bg-border/50 transition-colors hover:bg-border data-[panel-group-direction=vertical]:h-3"
          />

          <ResizablePanel
            ref={timelinePanelRef}
            defaultSize={25}
            minSize={8}
            maxSize={50}
            collapsible
            collapsedSize={0}
          >
            <Timeline
              frames={frames}
              activeFrameId={activeFrameId}
              setActiveFrameId={setActiveFrameId}
              onAddFrame={handleAddFrame}
              onCollapse={() => timelinePanelRef.current?.collapse()}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </TooltipProvider>
  );
}
