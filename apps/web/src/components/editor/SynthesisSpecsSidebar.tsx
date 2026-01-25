import { ChevronDown, PanelRightClose, Settings2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";

interface SynthesisSpecsSidebarProps {
	onClose: () => void;
}

export function SynthesisSpecsSidebar({ onClose }: SynthesisSpecsSidebarProps) {
	return (
		<div className="flex h-full flex-col overflow-hidden">
			<div className="flex h-14 shrink-0 items-center justify-between border-border border-b px-6">
				<h3 className="font-serif text-lg text-primary italic">
					Synthesis Specs
				</h3>
				<Button
					variant="ghost"
					size="icon"
					className="hidden h-8 w-8 text-muted-foreground hover:text-primary lg:flex"
					onClick={onClose}
				>
					<PanelRightClose size={18} strokeWidth={1.5} />
				</Button>
			</div>

			<ScrollArea className="flex-1">
				<div className="space-y-12 px-8 py-10">
					<div className="space-y-6">
						<label className="flex w-full items-center justify-between font-bold text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
							Visual Engine
							<Settings2 size={12} className="opacity-20" />
						</label>
						<div className="group relative">
							<select className="w-full cursor-pointer appearance-none rounded-none border-border border-b-2 bg-transparent px-1 py-3 font-bold text-[11px] text-primary uppercase tracking-widest shadow-none outline-none focus:border-primary">
								<option className="bg-card">Flux.1 Ultra Render</option>
								<option className="bg-card">SDXL Cinematic v4</option>
								<option className="bg-card">Aether Fine-Tune v2</option>
							</select>
							<ChevronDown
								size={14}
								className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary"
							/>
						</div>
					</div>

					<div className="space-y-10 border-border/50 border-t pt-6">
						{/* Consistency Slider */}
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<label className="font-bold text-[10px] text-primary/60 uppercase tracking-[0.2em]">
									DNA Consistency
								</label>
								<span className="font-bold font-mono text-[10px] text-accent">
									92%
								</span>
							</div>
							<Slider
								defaultValue={[92]}
								max={100}
								step={1}
								className="**:[[role=slider]]:h-3 **:[[role=slider]]:w-3 **:[[role=slider]]:border-none **:[[role=slider]]:bg-accent"
							/>
						</div>
						{/* Variance Slider */}
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<label className="font-bold text-[10px] text-primary/60 uppercase tracking-[0.2em]">
									Creative Variance
								</label>
								<span className="font-bold font-mono text-[10px] text-accent">
									0.45
								</span>
							</div>
							<Slider
								defaultValue={[45]}
								max={100}
								step={1}
								className="**:[[role=slider]]:h-3 **:[[role=slider]]:w-3 **:[[role=slider]]:border-none **:[[role=slider]]:bg-accent"
							/>
						</div>
					</div>
				</div>
			</ScrollArea>

			<div className="shrink-0 space-y-4 border-border border-t bg-card p-8 shadow-2xl">
				<Button className="group h-14 w-full rounded-none bg-primary font-bold text-[11px] text-primary-foreground uppercase tracking-[0.3em] shadow-2xl transition-all hover:bg-accent hover:text-primary-foreground">
					<Zap
						size={18}
						className="mr-3 transition-transform group-hover:scale-125"
					/>
					Synthesize Frame
				</Button>
				<div className="flex flex-col items-center justify-center gap-2">
					<span className="font-bold text-[8px] text-muted-foreground uppercase tracking-widest">
						Estimated Synthesis: 4.2s
					</span>
				</div>
			</div>
		</div>
	);
}
