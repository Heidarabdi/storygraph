import { Link2, PanelRightClose, Plus, Upload, User, X } from "lucide-react";
import type { EditorAsset, EditorFrame } from "@/types/editor";

interface EditorRightPanelProps {
	showRightSidebar: boolean;
	setShowRightSidebar: (val: boolean) => void;
	assets: EditorAsset[] | undefined;
	activeFrame: EditorFrame | undefined;
	frames: EditorFrame[] | undefined;
}

export function EditorRightPanel({
	showRightSidebar,
	setShowRightSidebar,
	assets,
	activeFrame,
	frames,
}: EditorRightPanelProps) {
	return (
		<div
			className={`shrink-0 transition-all duration-300 ease-in-out ${
				showRightSidebar
					? "w-96 opacity-100"
					: "pointer-events-none w-0 opacity-0"
			}`}
		>
			<div className="relative flex h-full w-96 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
				{/* Sidebar Header */}
				<div className="relative z-10 flex items-center justify-between border-border border-b bg-card px-6 py-5">
					<span className="font-bold text-foreground/80 text-xs tracking-tight">
						Properties
					</span>
					<button
						type="button"
						onClick={() => setShowRightSidebar(false)}
						className="rounded-md p-1 text-muted-foreground/40 transition-colors hover:bg-muted hover:text-primary"
					>
						<PanelRightClose size={16} />
					</button>
				</div>

				<div className="scrollbar-none flex-1 space-y-6 overflow-y-auto p-4">
					{/* Assets Section */}
					<div className="space-y-4">
						<div className="flex items-center justify-between px-2">
							<span className="flex items-center gap-2.5 font-semibold text-muted-foreground text-xs tracking-tight">
								<User size={12} className="text-accent" />
								Assets
							</span>
							<button
								type="button"
								className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md transition-all hover:scale-110 active:scale-95"
							>
								<Plus size={14} />
							</button>
						</div>
						<div className="flex flex-wrap gap-2">
							{assets && assets.length > 0 ? (
								assets.slice(0, 3).map((asset) => (
									<div
										key={asset._id}
										className="group flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/10 px-2.5 py-1 font-medium text-accent text-xs transition-all hover:bg-accent/20"
									>
										{asset.name}
										<button
											type="button"
											className="opacity-40 transition-opacity hover:opacity-100"
										>
											<X size={10} />
										</button>
									</div>
								))
							) : (
								<p className="py-1 text-muted-foreground/30 text-xs italic">
									No assets tagged
								</p>
							)}
						</div>
					</div>

					<div className="mx-2 h-px bg-border/50" />

					{/* Continuity Section */}
					<div className="space-y-4">
						<div className="flex items-center justify-between px-2">
							<span className="flex items-center gap-2.5 font-semibold text-muted-foreground text-xs tracking-tight">
								<Link2 size={12} className="text-accent" />
								Continuity
							</span>
							<button
								type="button"
								className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md transition-all hover:scale-110 active:scale-95"
							>
								<Plus size={14} />
							</button>
						</div>
						<div>
							{activeFrame &&
							activeFrame.order > 1 &&
							frames &&
							frames.length > 1 ? (
								<div className="group flex items-center justify-between rounded-lg border border-accent/20 bg-accent/10 p-2.5 font-medium text-accent text-xs transition-all hover:bg-accent/20">
									<span className="flex items-center gap-2">
										<span className="flex h-5 w-5 items-center justify-center rounded bg-accent/20 font-bold text-[10px]">
											F{(activeFrame.order - 1).toString().padStart(2, "0")}
										</span>
										Previous Frame
									</span>
									<button
										type="button"
										className="opacity-40 transition-opacity hover:opacity-100"
									>
										<X size={10} />
									</button>
								</div>
							) : (
								<p className="py-1 text-muted-foreground/30 text-xs italic">
									Entry point
								</p>
							)}
						</div>
					</div>

					<div className="mx-2 h-px bg-border/50" />

					{/* Reference Images Section */}
					<div className="space-y-4">
						<div className="flex items-center justify-between px-2">
							<span className="flex items-center gap-2.5 font-semibold text-muted-foreground text-xs tracking-tight">
								<Upload size={12} className="text-accent" />
								References
							</span>
							<span className="font-mono text-muted-foreground/30 text-xs">
								0/3
							</span>
						</div>
						<div className="grid grid-cols-4 gap-2">
							<button
								type="button"
								className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-border border-dashed bg-muted/20 text-muted-foreground/40 transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
							>
								<Plus size={16} />
							</button>
							{/* Placeholders for uploaded refs */}
							<div className="aspect-square rounded-xl border border-border/30 border-dashed bg-muted/5" />
							<div className="aspect-square rounded-xl border border-border/30 border-dashed bg-muted/5" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
