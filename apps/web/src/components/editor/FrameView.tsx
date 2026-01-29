import type { Id } from "@storygraph/backend/convex/_generated/dataModel";
import { Eye, PanelLeftOpen, RotateCcw, Sparkles, X, Zap } from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface Asset {
	_id: Id<"assets">;
	name: string;
	type: string;
}

interface Frame {
	_id: Id<"frames">;
	order: number;
	prompt: string;
	generatedImageUrl?: string;
	assetReferences?: Id<"assets">[];
}

interface FrameViewProps {
	activeFrame: Frame | undefined;
	assets: Asset[] | undefined;
	onUpdatePrompt: (val: string) => void;
	onDeleteFrame: (id: Id<"frames">) => void;
	leftPanelOpen: boolean;
	setLeftPanelOpen: (val: boolean) => void;
}

export function FrameView({
	activeFrame,
	assets,
	onUpdatePrompt,
	onDeleteFrame,
	leftPanelOpen,
	setLeftPanelOpen,
}: FrameViewProps) {
	return (
		<div className="w-full max-w-5xl space-y-12">
			{/* Active Frame Display */}
			<div className="group relative">
				{!leftPanelOpen && (
					<Tooltip>
						<TooltipTrigger asChild>
							<button
								className="absolute top-0 -left-16 hidden border border-border bg-card p-2 text-muted-foreground transition-colors hover:text-primary lg:flex"
								onClick={() => setLeftPanelOpen(true)}
								type="button"
							>
								<PanelLeftOpen size={18} strokeWidth={1.5} />
							</button>
						</TooltipTrigger>
						<TooltipContent side="right">Open Library</TooltipContent>
					</Tooltip>
				)}

				<div className="absolute -top-8 left-0 flex items-center gap-4">
					<div className="flex items-center gap-2">
						<div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
						<span className="font-bold text-[11px] text-primary uppercase tracking-[0.3em]">
							{"Frame // "}
							{activeFrame?.order.toString().padStart(2, "0") || "00"}
						</span>
					</div>
					<div className="hidden h-px w-12 bg-border sm:block" />
					<span className="hidden font-bold text-[9px] text-muted-foreground uppercase italic tracking-[0.2em] sm:inline">
						2.39:1 Anamorphic
					</span>
				</div>

				<div className="border border-border bg-card p-1.5 shadow-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl">
					<div className="group/img relative aspect-[2.39/1] overflow-hidden border border-border/50 bg-muted/20">
						<img
							src={
								activeFrame?.generatedImageUrl ||
								"https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1200"
							}
							alt="Current frame"
							className="h-full w-full object-cover saturate-[0.85] transition-transform duration-2000 group-hover/img:scale-105"
						/>
						<div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
							<div className="flex scale-95 gap-4 px-4 text-center transition-transform group-hover:scale-100">
								<Button className="h-10 rounded-none bg-primary px-6 font-bold text-[9px] text-primary-foreground uppercase tracking-widest shadow-2xl transition-all hover:bg-accent md:h-12 md:px-8 md:text-[10px]">
									<Eye size={14} className="mr-2" /> Inspect DNA
								</Button>
							</div>
						</div>
					</div>
				</div>

				<div className="absolute top-0 -right-4 flex flex-col gap-3 sm:-right-16">
					<button
						className="flex h-10 w-10 items-center justify-center border border-border bg-card text-primary shadow-sm transition-all hover:text-accent hover:shadow-lg sm:h-12 sm:w-12"
						type="button"
					>
						<RotateCcw size={16} className="sm:size-[18px]" strokeWidth={1.5} />
					</button>
					<button
						className="flex h-10 w-10 items-center justify-center border border-border bg-card text-primary shadow-sm transition-all hover:text-accent hover:shadow-lg sm:h-12 sm:w-12"
						type="button"
					>
						<Sparkles size={16} className="sm:size-[18px]" strokeWidth={1.5} />
					</button>
					<ConfirmDeleteDialog
						title="Delete Frame?"
						description="Are you sure you want to delete this frame? This action cannot be undone."
						onConfirm={() => activeFrame?._id && onDeleteFrame(activeFrame._id)}
						trigger={
							<button
								className="flex h-10 w-10 items-center justify-center border border-border bg-card text-primary shadow-sm transition-all hover:text-red-500 hover:shadow-lg sm:h-12 sm:w-12"
								type="button"
							>
								<X size={16} className="sm:size-[18px]" strokeWidth={1.5} />
							</button>
						}
					/>
				</div>
			</div>

			{/* Narrative Controls */}
			<div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-10 overflow-visible pt-6 pb-20 lg:grid-cols-12 lg:gap-12 lg:pb-0">
				<div className="flex flex-col gap-10 lg:col-span-8">
					<div className="group space-y-4">
						<label className="flex items-center gap-3 font-bold text-[10px] text-muted-foreground uppercase tracking-[0.4em] transition-colors group-focus-within:text-primary">
							<Zap size={14} className="text-accent" />
							{"Frame Intent // Synthesis instructions"}
						</label>
						<textarea
							className="h-32 w-full resize-none border-border border-b-2 bg-transparent py-4 font-serif text-foreground text-xl italic leading-relaxed outline-none transition-all placeholder:text-muted-foreground/20 focus:border-primary md:text-2xl"
							placeholder="Direct the scene's emotional weight..."
							value={activeFrame?.prompt || ""}
							onChange={(e) => onUpdatePrompt(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
						<div className="group space-y-3">
							<label className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
								{"Vocal Beat // Dialogue"}
							</label>
							<Input
								className="rounded-none border-0 border-border border-b bg-transparent px-0 py-4 font-serif text-base text-foreground/80 italic shadow-none focus-visible:border-primary focus-visible:ring-0 md:text-lg"
								defaultValue="The protocol was never meant for survival."
							/>
						</div>
						<div className="group space-y-3">
							<label className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
								{"Technical Spec // Camera"}
							</label>
							<Input
								className="rounded-none border-0 border-border border-b bg-transparent px-0 py-4 font-bold text-[9px] text-accent uppercase tracking-[0.2em] shadow-none focus-visible:border-primary focus-visible:ring-0 md:text-[10px]"
								defaultValue="35MM ANAMORPHIC // F2.8 // RAIN FX"
							/>
						</div>
					</div>
				</div>

				<div className="space-y-10 border-border lg:col-span-4 lg:border-l lg:pl-12">
					<div className="space-y-6">
						<h4 className="font-bold text-[10px] text-primary/40 uppercase italic tracking-widest">
							Active DNA Manifest
						</h4>
						<div className="space-y-4">
							{activeFrame?.assetReferences?.map((assetId) => {
								const asset = assets?.find((a) => a._id === assetId);
								if (!asset) return null;
								return (
									<div
										key={asset._id}
										className="group flex cursor-help items-center justify-between"
									>
										<span className="font-bold text-[10px] text-foreground/70 uppercase tracking-widest transition-colors group-hover:text-accent">
											{asset.name}
										</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
