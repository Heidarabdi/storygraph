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
}: TimelineProps) {
	return (
		<footer className="z-50 flex h-32 shrink-0 items-center gap-4 border-border border-t bg-card px-4 md:h-36 md:gap-6 md:px-6">
			{/* Frames */}
			<div className="no-scrollbar flex min-w-0 flex-1 items-center gap-3 overflow-x-auto py-4 md:gap-4">
				{frames?.map((frame) => (
					<button
						key={frame._id}
						onClick={() => onFrameSelect(frame._id)}
						className={`group relative aspect-[2.39/1] h-full shrink-0 cursor-pointer overflow-hidden border transition-all ${activeFrameId === frame._id
								? "border-accent ring-2 ring-accent/20"
								: "border-border opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
							}`}
						type="button"
					>
						<img
							src={
								frame.generatedImageUrl ||
								"https://images.unsplash.com/photo-1514565131-bce0801e5787?auto=format&fit=crop&q=80&w=400"
							}
							alt={frame.prompt}
							className="h-full w-full object-cover"
						/>
						{/* Frame Number Badge */}
						<div
							className={`absolute top-0 left-0 px-1.5 py-0.5 font-bold text-[7px] ${activeFrameId === frame._id
									? "bg-accent text-white"
									: "bg-muted/80 text-foreground"
								}`}
						>
							{frame.order.toString().padStart(2, "0")}
						</div>
						{/* Status Badge */}
						{frame.status !== "complete" && (
							<div className="absolute inset-x-0 bottom-0 bg-black/60 px-1 py-0.5 text-center font-bold text-[6px] text-white uppercase">
								{frame.status}
							</div>
						)}
					</button>
				))}

				{/* Add Frame Button */}
				<button
					onClick={onAddFrame}
					className="flex aspect-[2.39/1] h-full shrink-0 flex-col items-center justify-center gap-1 border border-border border-dashed text-muted-foreground transition-all hover:border-primary hover:text-primary"
					type="button"
				>
					<Plus size={16} />
					<span className="font-bold text-[7px] uppercase tracking-wider">
						Add
					</span>
				</button>
			</div>
		</footer>
	);
}
