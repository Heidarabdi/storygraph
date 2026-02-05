import { Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	Download,
	FolderOpen,
	RotateCcw,
	Settings2,
	Trash2,
	Zap,
} from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { EditorFrame } from "@/types/editor";

interface EditorSidebarProps {
	onDeleteFrame: () => void;
	onGenerate: () => void;
	activeFrame: EditorFrame | undefined;
	AssetLibraryComponent: React.ReactNode;
	SceneSettingsComponent: React.ReactNode;
}

export function EditorSidebar({
	onDeleteFrame,
	onGenerate,
	activeFrame,
	AssetLibraryComponent,
	SceneSettingsComponent,
}: EditorSidebarProps) {
	return (
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
				{AssetLibraryComponent}
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
				{SceneSettingsComponent}
			</Sheet>

			<div className="my-1 h-px w-full bg-border/50" />

			{/* Generate Button */}
			<Tooltip>
				<TooltipTrigger asChild>
					<button
						type="button"
						onClick={onGenerate}
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
					onConfirm={onDeleteFrame}
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
	);
}
