import { Plus } from "lucide-react";

interface Frame {
	_id: string;
	order: number;
	prompt: string;
	generatedImageUrl?: string;
	status: string;
}

interface TimelineProps {
	frames: Frame[] | undefined;
	activeFrameId: string | null;
	onFrameSelect: (id: string) => void;
	onAddFrame: () => void;
	projectName: string;
	activeSceneName: string;
}

export function Timeline({
	frames,
	activeFrameId,
	onFrameSelect,
	onAddFrame,
	projectName,
	activeSceneName,
}: TimelineProps) {
	return (
		<footer className="z-50 flex h-40 shrink-0 items-center gap-4 border-border border-t bg-card px-4 shadow-[0_-16px_48px_rgba(0,0,0,0.03)] backdrop-blur-md md:h-44 md:gap-10 md:px-10">
			<div className="no-scrollbar flex min-w-0 flex-1 items-center gap-4 overflow-x-auto py-6 md:gap-8">
				<div className="flex h-full shrink-0 flex-col justify-center gap-1 border-border border-r pr-4 md:pr-8">
					<h5 className="font-bold text-[9px] text-primary uppercase italic tracking-widest md:text-[10px]">
						{activeSceneName}
					</h5>
					<p className="hidden font-bold text-[8px] text-muted-foreground/40 uppercase tracking-widest sm:block md:text-[9px]">
						{projectName}
					</p>
				</div>

				{frames?.map((frame) => (
					<button
						key={frame._id}
						onClick={() => onFrameSelect(frame._id)}
						className={`group/f relative aspect-[2.39/1] h-full shrink-0 cursor-pointer overflow-hidden border transition-all duration-500 ${
							activeFrameId === frame._id
								? "border-accent p-0.5 ring-2 ring-accent/5 md:ring-4"
								: "border-border opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
						}`}
						type="button"
					>
						<div className="relative h-full w-full overflow-hidden bg-muted/20">
							<img
								src={`${
									frame.generatedImageUrl ||
									"https://images.unsplash.com/photo-1514565131-bce0801e5787"
								}?auto=format&fit=crop&q=80&w=400`}
								alt={frame.prompt}
								className="h-full w-full object-cover"
							/>
							<div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 p-1.5 backdrop-blur-sm transition-transform group-hover/f:translate-y-0">
								<p className="text-center font-bold text-[7px] text-white uppercase tracking-widest">
									{frame.status}
								</p>
							</div>
						</div>
						<div
							className={`absolute top-0 left-0 px-2 py-0.5 font-bold text-[7px] italic md:text-[8px] ${activeFrameId === frame._id ? "bg-accent text-white" : "bg-primary/20 text-primary"}`}
						>
							{frame.order.toString().padStart(2, "0")}
						</div>
					</button>
				))}

				<button
					onClick={onAddFrame}
					className="flex aspect-[2.39/1] h-full shrink-0 flex-col items-center justify-center gap-2 border border-border border-dashed text-muted-foreground transition-all hover:bg-muted/50 hover:text-primary"
					type="button"
				>
					<Plus size={18} className="md:size-5" />
					<span className="truncate px-2 font-bold text-[8px] uppercase italic leading-none tracking-widest md:text-[9px]">
						Append
					</span>
				</button>
			</div>
		</footer>
	);
}
