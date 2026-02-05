import type { Id } from "@storygraph/backend/convex/_generated/dataModel";
import { ChevronsDown, Plus } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface Frame {
	_id: Id<"frames">;
	order: number;
	prompt: string;
	generatedImageUrl?: string;
}

interface TimelineProps {
	frames: Frame[] | undefined;
	activeFrameId: string | null;
	setActiveFrameId: (id: string) => void;
	onAddFrame: () => void;
	onCollapse: () => void;
}

export function Timeline({
	frames,
	activeFrameId,
	setActiveFrameId,
	onAddFrame,
	onCollapse,
}: TimelineProps) {
	return (
		<div className="flex h-full flex-col bg-card/80 backdrop-blur-md">
			{/* Timeline Header */}
			<div className="flex h-10 shrink-0 items-center justify-between border-border border-b px-4">
				<span className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
					Timeline · {frames?.length || 0} frames
				</span>
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							type="button"
							onClick={onCollapse}
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
							className={`absolute top-0 left-0 px-1.5 py-0.5 font-bold text-[7px] ${
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
					onClick={onAddFrame}
					type="button"
					className="flex aspect-[2.39/1] h-[calc(100%-0.5rem)] shrink-0 flex-col items-center justify-center gap-1 rounded border border-border border-dashed text-muted-foreground transition-all hover:border-primary hover:text-primary"
				>
					<Plus size={16} />
				</button>
			</div>
		</div>
	);
}
