import { api } from "@storygraph/backend/convex/_generated/api";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import {
	Download,
	History as HistoryIcon,
	Menu,
	Settings2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AssetLibrarySidebar } from "@/components/editor/AssetLibrarySidebar";
import { FrameView } from "@/components/editor/FrameView";
import { SynthesisSpecsSidebar } from "@/components/editor/SynthesisSpecsSidebar";

import { Timeline } from "@/components/editor/Timeline";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";

export const Route = createFileRoute("/_authenticated/editor/$projectId")({
	component: EditorPage,
});

function EditorPage() {
	const { projectId } = useParams({
		from: "/_authenticated/editor/$projectId",
	});
	const [leftPanelOpen, setLeftPanelOpen] = useState(true);
	const [rightPanelOpen, setRightPanelOpen] = useState(true);

	// Data Queries
	// @ts-expect-error
	const project = useQuery(api.projects.get, { projectId });
	// @ts-expect-error
	const scenes = useQuery(api.scenes.list, { projectId });
	const [activeSceneId, setActiveSceneId] = useState<string | null>(null);

	const frames = useQuery(
		api.frames.list,
		activeSceneId ? { sceneId: activeSceneId as any } : "skip",
	);
	const [activeFrameId, setActiveFrameId] = useState<string | null>(null);

	// @ts-expect-error
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

	const activeFrame = frames?.find((f) => f._id === activeFrameId);
	const activeScene = scenes?.find((s) => s._id === activeSceneId);

	const handleAddFrame = async () => {
		if (!activeSceneId) {
			// @ts-expect-error
			const newSceneId = await createScene({ projectId, name: "Scene 01" });
			setActiveSceneId(newSceneId);
			await createFrame({ sceneId: newSceneId, prompt: "New Frame Intent..." });
		} else {
			await createFrame({
				sceneId: activeSceneId as any,
				prompt: "New Frame Intent...",
			});
		}
	};

	const handleUpdatePrompt = async (prompt: string) => {
		if (!activeFrameId) return;
		await updateFrame({ id: activeFrameId as any, prompt });
	};

	if (!project) return null;

	return (
		<TooltipProvider>
			<div className="flex h-full min-h-[500px] flex-col overflow-hidden bg-background selection:bg-primary selection:text-primary-foreground">
				{/* Master Toolbar */}
				<div className="z-50 flex h-12 shrink-0 items-center justify-between border-border border-b bg-card px-4 md:px-6">
					<div className="flex items-center gap-3 md:gap-6">
						<div className="flex lg:hidden">
							<Sheet>
								<SheetTrigger asChild>
									<Button variant="ghost" size="icon" className="h-8 w-8">
										<Menu size={18} />
									</Button>
								</SheetTrigger>
								<SheetContent
									side="left"
									className="w-80 border-border border-r p-0"
								>
									<AssetLibrarySidebar
										assets={assets as any}
										onClose={() => {}}
									/>
								</SheetContent>
							</Sheet>
						</div>
						<div className="flex items-center gap-3 border-border border-r pr-4 md:pr-6">
							<span className="max-w-[120px] truncate font-bold text-[10px] text-primary uppercase tracking-[0.2em] md:max-w-none md:tracking-[0.3em]">
								{activeScene?.name || "No Scene"} // {project.name}
							</span>
						</div>
					</div>
					<div className="flex items-center gap-2 md:gap-4">
						<button className="p-1 text-muted-foreground transition-colors hover:text-primary">
							<HistoryIcon size={16} strokeWidth={1.5} />
						</button>
						<button className="p-1 text-muted-foreground transition-colors hover:text-primary">
							<Download size={16} strokeWidth={1.5} />
						</button>
						<div className="ml-2 flex lg:hidden">
							<Sheet>
								<SheetTrigger asChild>
									<Button variant="ghost" size="icon" className="h-8 w-8">
										<Settings2 size={18} />
									</Button>
								</SheetTrigger>
								<SheetContent
									side="right"
									className="w-80 border-border border-l p-0"
								>
									<SynthesisSpecsSidebar onClose={() => {}} />
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</div>

				<main className="relative flex flex-1 overflow-hidden">
					{/* Left Sidebar - Library */}
					{leftPanelOpen && (
						<aside className="fade-in slide-in-from-left relative hidden w-80 shrink-0 animate-in flex-col border-border border-r bg-card/40 backdrop-blur-md duration-500 lg:flex">
							<AssetLibrarySidebar
								assets={assets as any}
								onClose={() => setLeftPanelOpen(false)}
							/>
						</aside>
					)}

					{/* Center Content - Canvas Area */}
					<div className="scrollbar-none flex flex-1 flex-col items-center overflow-y-auto scroll-smooth bg-background/30 px-4 py-10 md:px-10 md:py-16">
						<FrameView
							activeFrame={activeFrame as any}
							assets={assets as any}
							onUpdatePrompt={handleUpdatePrompt}
							onDeleteFrame={(id) => deleteFrame({ id: id as any })}
							leftPanelOpen={leftPanelOpen}
							setLeftPanelOpen={setLeftPanelOpen}
						/>
					</div>

					{/* Right Sidebar - Properties */}
					{rightPanelOpen && (
						<aside className="fade-in slide-in-from-right relative hidden w-80 shrink-0 animate-in flex-col border-border border-l bg-card/50 backdrop-blur-md duration-500 lg:flex">
							<SynthesisSpecsSidebar onClose={() => setRightPanelOpen(false)} />
						</aside>
					)}
				</main>

				{/* Timeline Master Bar */}
				<Timeline
					frames={frames as any}
					activeFrameId={activeFrameId}
					onFrameSelect={setActiveFrameId}
					onAddFrame={handleAddFrame}
					projectName={project.name}
					activeSceneName={activeScene?.name || "Scene --"}
				/>
			</div>
		</TooltipProvider>
	);
}
