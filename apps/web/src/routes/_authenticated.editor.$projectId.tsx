import { api } from "@storygraph/backend/convex/_generated/api";
import type { Id } from "@storygraph/backend/convex/_generated/dataModel";
import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import {
  ArrowLeft,
  ChevronsDown,
  Download,
  FolderOpen,
  ImagePlus,
  Link2,
  PanelRightClose,
  PanelRightOpen,
  Plus,
  RotateCcw,
  Settings2,
  Sparkles,
  Trash2,
  Upload,
  User,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { ImperativePanelHandle } from "react-resizable-panels";

// Editor Types
interface EditorFrame {
  _id: Id<"frames">;
  order: number;
  prompt: string;
  generatedImageUrl?: string;
  status: string;
  assetReferences?: Id<"assets">[];
}

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
  const assets = useQuery(api.assets.list, { projectId });

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

  const activeFrame = frames?.find((f) => f._id === activeFrameId) as
    | EditorFrame
    | undefined;
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

  if (!project) return null;

  return (
    <TooltipProvider delayDuration={100}>
      <div className="relative flex h-svh w-full flex-col overflow-hidden bg-background">
        {/* ===== LEFT FLOATING TOOLBAR ===== */}
        <div className="fixed top-12 left-4 z-50 flex flex-col gap-2">
          {/* Back Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/dashboard"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/80 text-muted-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-card hover:text-primary"
              >
                <ArrowLeft size={18} />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Back to Projects</TooltipContent>
          </Tooltip>

          {/* Assets Sheet */}
          <Sheet>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/80 text-muted-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-card hover:text-primary"
                  >
                    <FolderOpen size={18} />
                  </button>
                </SheetTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">Assets</TooltipContent>
            </Tooltip>
            <SheetContent side="left" className="w-80 border-border p-0">
              <SheetHeader className="border-border border-b p-4">
                <SheetTitle className="text-sm">Assets</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-2 gap-3 p-4">
                {assets?.map((asset) => (
                  <div
                    key={asset._id}
                    className="group cursor-pointer space-y-2"
                  >
                    <div className="aspect-square overflow-hidden rounded border border-border bg-muted/20 transition-all group-hover:border-primary">
                      <img
                        src={
                          asset.referenceImages?.[0] ||
                          `https://api.dicebear.com/7.x/shapes/svg?seed=${asset.name}`
                        }
                        alt={asset.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="truncate text-center text-[10px] font-medium uppercase tracking-wider">
                      {asset.name}
                    </p>
                  </div>
                ))}
                <button
                  type="button"
                  className="flex aspect-square flex-col items-center justify-center gap-1 rounded border border-dashed border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
                >
                  <Plus size={16} />
                  <span className="text-[8px] uppercase">Add</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Scene Properties Sheet */}
          <Sheet>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/80 text-muted-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-card hover:text-primary"
                  >
                    <Settings2 size={18} />
                  </button>
                </SheetTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">Scene Properties</TooltipContent>
            </Tooltip>
            <SheetContent side="left" className="w-80 border-border p-0">
              <SheetHeader className="border-border border-b p-4 text-left">
                <SheetTitle className="text-sm">Scene Properties</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 p-6">
                <div className="space-y-3">
                  <Label className="text-xs font-semibold tracking-tight text-muted-foreground/80">
                    Model
                  </Label>
                  <Select defaultValue="flux">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flux">Flux.1 Ultra</SelectItem>
                      <SelectItem value="sdxl">SDXL Cinematic</SelectItem>
                      <SelectItem value="sd3">Stable Diffusion 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-semibold tracking-tight text-muted-foreground/80">
                    Style
                  </Label>
                  <Select defaultValue="cinematic">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cinematic">Cinematic</SelectItem>
                      <SelectItem value="noir">Noir</SelectItem>
                      <SelectItem value="anime">Anime</SelectItem>
                      <SelectItem value="sketch">Hand-drawn Sketch</SelectItem>
                      <SelectItem value="3d">3D Render</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-semibold tracking-tight text-muted-foreground/80">
                    <span>Consistency</span>
                    <span className="text-accent">92%</span>
                  </div>
                  <Slider defaultValue={[92]} max={100} step={1} />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-semibold tracking-tight text-muted-foreground/80">
                    <span>Creativity</span>
                    <span className="text-accent">0.45</span>
                  </div>
                  <Slider defaultValue={[45]} max={100} step={1} />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="my-1 h-px w-full bg-border/50" />

          {/* Generate Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-lg transition-all hover:bg-accent/80"
              >
                <Zap size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Generate Frame</TooltipContent>
          </Tooltip>

          {/* Regenerate */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/80 text-muted-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-card hover:text-primary"
              >
                <RotateCcw size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Regenerate</TooltipContent>
          </Tooltip>

          {/* Download */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/80 text-muted-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-card hover:text-primary"
              >
                <Download size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Export</TooltipContent>
          </Tooltip>

          {/* Delete Frame */}
          {activeFrame && (
            <ConfirmDeleteDialog
              title="Delete Frame?"
              description="This cannot be undone."
              onConfirm={handleDeleteFrame}
              trigger={
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/80 text-muted-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-card hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              }
            />
          )}
        </div>

        {/* ===== MAIN CONTENT WITH RESIZABLE TIMELINE ===== */}
        <ResizablePanelGroup direction="vertical" className="flex-1">
          {/* Canvas Panel - Scrollable */}
          <ResizablePanel defaultSize={75} minSize={40}>
            <div className="flex h-full flex-col items-center overflow-y-auto p-6 pl-20">
              {activeFrame ? (
                <div className="flex w-full max-w-6xl flex-col gap-6 py-8">
                  {/* Scene/Frame Info */}
                  <div className="flex items-center gap-3 text-xs font-medium tracking-tight text-muted-foreground/60">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {activeScene?.name || "Scene"}
                    </span>
                    <span className="text-muted-foreground/20">/</span>
                    <span className="font-serif italic text-sm">
                      Frame {activeFrame.order.toString().padStart(2, "0")}
                    </span>
                  </div>

                  {/* Main Content: Layout with Side Panel */}
                  <div className="flex w-full gap-8 relative">
                    {/* Floating Toggle for Right Sidebar (When Hidden) */}
                    {!showRightSidebar && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setShowRightSidebar(true)}
                            className="absolute -right-4 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-xl transition-all hover:bg-accent hover:text-accent-foreground"
                          >
                            <PanelRightOpen size={18} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          Show Properties
                        </TooltipContent>
                      </Tooltip>
                    )}

                    {/* Left Column: Frame + Prompt */}
                    <div className="flex flex-1 flex-col gap-6">
                      {/* Frame Image */}
                      <div className="w-full border border-border bg-card p-1 shadow-2xl">
                        <div className="aspect-[2.39/1] overflow-hidden bg-muted/20">
                          <img
                            src={
                              activeFrame.generatedImageUrl ||
                              "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1600"
                            }
                            alt="Frame"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Prompt Input - Compact with buttons inside */}
                      <div className="relative">
                        <textarea
                          className="min-h-[120px] w-full resize-none rounded-xl border border-border bg-card/50 p-6 pr-28 font-serif text-xl italic leading-relaxed text-foreground placeholder:text-muted-foreground/20 focus:border-accent focus:outline-none"
                          placeholder="What happens in this frame?"
                          value={activeFrame.prompt}
                          onChange={(e) => handleUpdatePrompt(e.target.value)}
                          maxLength={2000}
                        />
                        {/* Buttons inside input - right edge */}
                        <div className="absolute right-4 bottom-4 flex items-center gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-muted hover:text-primary"
                              >
                                <ImagePlus size={18} />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>Add Reference</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground shadow-lg transition-all hover:bg-accent/80"
                              >
                                <Sparkles size={18} />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>Enhance Prompt</TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Refined Metadata Sidebar - Collapsible */}
                    <div
                      className={`shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${
                        showRightSidebar
                          ? "w-96 opacity-100"
                          : "w-0 opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="h-full w-96 rounded-2xl border border-border bg-card/40 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col">
                        {/* Sidebar Header */}
                        <div className="px-5 py-4 border-b border-border bg-card/60 flex items-center justify-between">
                          <span className="text-xs font-bold tracking-tight text-foreground/80">
                            Properties
                          </span>
                          <button
                            onClick={() => setShowRightSidebar(false)}
                            className="text-muted-foreground/30 hover:text-primary transition-colors"
                          >
                            <PanelRightClose size={16} />
                          </button>
                        </div>

                        <div className="p-2 space-y-2 overflow-y-auto">
                          {/* Assets Section */}
                          <div className="p-4 space-y-4 rounded-xl bg-card/30 border border-border/50 shadow-sm transition-all hover:bg-card/50">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-2.5 text-xs font-semibold tracking-tight text-muted-foreground">
                                <User size={12} className="text-accent" />
                                Assets
                              </span>
                              <button
                                type="button"
                                className="h-6 w-6 flex items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md transition-all hover:scale-110 active:scale-95"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {assets && assets.length > 0 ? (
                                assets.slice(0, 3).map((asset) => (
                                  <div
                                    key={asset._id}
                                    className="group flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent transition-all hover:bg-accent/20"
                                  >
                                    {asset.name}
                                    <button
                                      type="button"
                                      className="opacity-40 hover:opacity-100 transition-opacity"
                                    >
                                      <X size={10} />
                                    </button>
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-muted-foreground/30 italic py-1">
                                  No assets tagged
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Continuity Section */}
                          <div className="p-4 space-y-4 rounded-xl bg-card/30 border border-border/50 shadow-sm transition-all hover:bg-card/50">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-2.5 text-xs font-semibold tracking-tight text-muted-foreground">
                                <Link2 size={12} className="text-accent" />
                                Continuity
                              </span>
                              <button
                                type="button"
                                className="h-6 w-6 flex items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md transition-all hover:scale-110 active:scale-95"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <div>
                              {activeFrame.order > 1 &&
                              frames &&
                              frames.length > 1 ? (
                                <div className="group flex items-center justify-between rounded-lg border border-accent/20 bg-accent/10 p-2.5 text-xs font-medium text-accent transition-all hover:bg-accent/20">
                                  <span className="flex items-center gap-2">
                                    <span className="flex h-5 w-5 items-center justify-center rounded bg-accent/20 font-bold text-[10px]">
                                      F
                                      {(activeFrame.order - 1)
                                        .toString()
                                        .padStart(2, "0")}
                                    </span>
                                    Previous Frame
                                  </span>
                                  <button
                                    type="button"
                                    className="opacity-40 hover:opacity-100 transition-opacity"
                                  >
                                    <X size={10} />
                                  </button>
                                </div>
                              ) : (
                                <p className="text-xs text-muted-foreground/30 italic py-1">
                                  Entry point
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Reference Images Section */}
                          <div className="p-4 space-y-4 rounded-xl bg-card/30 border border-border/50 shadow-sm transition-all hover:bg-card/50">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-2.5 text-xs font-semibold tracking-tight text-muted-foreground">
                                <Upload size={12} className="text-accent" />
                                References
                              </span>
                              <span className="text-xs font-mono text-muted-foreground/30">
                                0/3
                              </span>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                              <button
                                type="button"
                                className="aspect-square flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-muted/20 text-muted-foreground/40 transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                              >
                                <Plus size={16} />
                              </button>
                              {/* Placeholders for uploaded refs */}
                              <div className="aspect-square rounded-xl bg-muted/5 border border-border/30 border-dashed" />
                              <div className="aspect-square rounded-xl bg-muted/5 border border-border/30 border-dashed" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-sm text-muted-foreground">
                    No frame selected
                  </p>
                  <Button
                    onClick={handleAddFrame}
                    variant="outline"
                    className="mt-4"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Frame
                  </Button>
                </div>
              )}
            </div>
          </ResizablePanel>

          {/* Resize Handle with Grip */}
          <ResizableHandle
            withHandle
            className="bg-border/50 transition-colors hover:bg-border data-[panel-group-direction=vertical]:h-3"
          />

          {/* Timeline Panel - Resizable */}
          <ResizablePanel
            ref={timelinePanelRef}
            defaultSize={25}
            minSize={8}
            maxSize={50}
            collapsible
            collapsedSize={0}
          >
            <div className="flex h-full flex-col bg-card/80 backdrop-blur-md">
              {/* Timeline Header */}
              <div className="flex h-10 shrink-0 items-center justify-between border-border border-b px-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Timeline · {frames?.length || 0} frames
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => timelinePanelRef.current?.collapse()}
                      className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                    >
                      <ChevronsDown size={14} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Collapse Timeline</TooltipContent>
                </Tooltip>
              </div>

              {/* Timeline Content */}
              <div className="no-scrollbar flex flex-1 items-center gap-3 overflow-x-auto px-4 py-2">
                {frames?.map((frame) => (
                  <button
                    key={frame._id}
                    onClick={() => setActiveFrameId(frame._id)}
                    type="button"
                    className={`relative aspect-[2.39/1] h-[calc(100%-0.5rem)] shrink-0 overflow-hidden rounded border transition-all ${
                      activeFrameId === frame._id
                        ? "border-accent ring-2 ring-accent/30"
                        : "border-border opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
                    }`}
                  >
                    <img
                      src={
                        frame.generatedImageUrl ||
                        "https://images.unsplash.com/photo-1514565131-bce0801e5787?auto=format&fit=crop&q=80&w=400"
                      }
                      alt={frame.prompt}
                      className="h-full w-full object-cover"
                    />
                    <div
                      className={`absolute top-0 left-0 px-1.5 py-0.5 text-[7px] font-bold ${
                        activeFrameId === frame._id
                          ? "bg-accent text-white"
                          : "bg-black/60 text-white"
                      }`}
                    >
                      {frame.order.toString().padStart(2, "0")}
                    </div>
                  </button>
                ))}

                {/* Add Frame Button */}
                <button
                  onClick={handleAddFrame}
                  type="button"
                  className="flex aspect-[2.39/1] h-[calc(100%-0.5rem)] shrink-0 flex-col items-center justify-center gap-1 rounded border border-dashed border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </TooltipProvider>
  );
}
