import { ImagePlus, PanelRightOpen, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditorCanvasProps {
	activeFrame:
		| {
				order: number;
				prompt: string;
				generatedImageUrl?: string;
		  }
		| undefined;
	activeScene:
		| {
				name: string;
		  }
		| undefined;
	showRightSidebar: boolean;
	setShowRightSidebar: (val: boolean) => void;
	onUpdatePrompt: (val: string) => void;
	onAddFrame: () => void;
	rightPanel: React.ReactNode;
}

export function EditorCanvas({
	activeFrame,
	activeScene,
	showRightSidebar,
	setShowRightSidebar,
	onUpdatePrompt,
	onAddFrame,
	rightPanel,
}: EditorCanvasProps) {
	return (
		<div className="flex h-full w-full flex-col items-center overflow-y-auto p-6 pl-20">
			{activeFrame ? (
				<div className="flex w-full max-w-6xl flex-col gap-6 py-8">
					{/* Scene/Frame Info */}
					<div className="flex items-center gap-3 font-medium text-muted-foreground/60 text-xs tracking-tight">
						<span className="flex items-center gap-1.5">
							<span className="h-1 w-1 rounded-full bg-accent" />
							{activeScene?.name || "Scene"}
						</span>
						<span className="text-muted-foreground/20">/</span>
						<span className="font-serif text-sm italic">
							Frame {activeFrame.order.toString().padStart(2, "0")}
						</span>
					</div>

					{/* Main Content: Layout with Side Panel */}
					<div className="relative flex w-full gap-8">
						{/* Floating Toggle for Right Sidebar (When Hidden) */}
						{!showRightSidebar && (
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										type="button"
										onClick={() => setShowRightSidebar(true)}
										className="absolute top-6 -right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-xl transition-all hover:bg-accent hover:text-accent-foreground"
									>
										<PanelRightOpen size={18} />
									</button>
								</TooltipTrigger>
								<TooltipContent side="left">Show Properties</TooltipContent>
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
									className="min-h-[120px] w-full resize-none rounded-xl border border-border bg-card/50 p-6 pr-28 font-serif text-foreground text-xl italic leading-relaxed placeholder:text-muted-foreground/20 focus:border-accent focus:outline-none"
									placeholder="What happens in this frame?"
									value={activeFrame.prompt}
									onChange={(e) => onUpdatePrompt(e.target.value)}
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

						{/* Right Side Panel */}
						{rightPanel}
					</div>
				</div>
			) : (
				<div className="flex h-full flex-col items-center justify-center text-center">
					<p className="text-muted-foreground text-sm">No frame selected</p>
					<Button onClick={onAddFrame} variant="outline" className="mt-4">
						<Plus size={16} className="mr-2" />
						Add Frame
					</Button>
				</div>
			)}
		</div>
	);
}
