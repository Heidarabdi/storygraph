import { Link } from "@tanstack/react-router";
import { Copy, History, MoreHorizontal, Trash2 } from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
	_id: string;
	_creationTime: number;
	name: string;
	thumbnail?: string;
}

interface ProjectCardProps {
	project: Project;
	onDelete: (id: string) => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
	return (
		<div className="group relative border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
			{/* Main Link for Navigating to Project */}
			<Link
				to="/editor/$projectId"
				params={{
					projectId: project._id,
				}}
				className="flex h-full flex-col"
			>
				{/* Thumbnail Area */}
				<div className="relative aspect-[2.39/1] overflow-hidden bg-neutral-200">
					<img
						src={
							project.thumbnail ||
							"https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800"
						}
						alt={project.name}
						className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					/>
					<div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
							<div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
						</div>
					</div>
				</div>

				{/* Project Info */}
				<div className="flex flex-1 flex-col p-6">
					<div className="mb-4 flex items-start justify-between">
						<div className="space-y-1">
							<h3 className="font-bold text-[11px] text-primary uppercase tracking-[0.2em] transition-colors group-hover:text-accent">
								{project.name}
							</h3>
							<p className="font-serif text-[9px] text-muted-foreground italic">
								Created on{" "}
								{new Date(project._creationTime).toLocaleDateString()}
							</p>
						</div>
					</div>

					<div className="mt-auto flex items-center justify-between border-border border-t pt-4">
						<div className="flex items-center gap-2">
							<div className="h-1 w-1 bg-accent" />
							<span className="font-bold text-[8px] text-muted-foreground uppercase tracking-widest">
								Scene 01 ACTIVE
							</span>
						</div>
						<div className="font-bold text-[9px] text-primary/40 uppercase italic tracking-[0.2em]">
							Refining Frame 04
						</div>
					</div>
				</div>
			</Link>

			{/* Top Actions - Placed outside the Link to ensure valid HTML and accessible interaction */}
			<div className="absolute top-4 right-4 z-20 flex gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 border border-white/20 bg-black/40 text-white backdrop-blur hover:bg-black/60"
							type="button"
						>
							<MoreHorizontal size={14} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						className="rounded-none border-border"
					>
						<DropdownMenuItem className="flex items-center gap-3 px-4 py-2 font-bold text-[10px] uppercase tracking-widest">
							<Copy size={12} /> Duplicate
						</DropdownMenuItem>
						<DropdownMenuItem className="flex items-center gap-3 px-4 py-2 font-bold text-[10px] uppercase tracking-widest">
							<History size={12} /> Revert DNA
						</DropdownMenuItem>
						<DropdownMenuSeparator />
					</DropdownMenuContent>
				</DropdownMenu>

				<ConfirmDeleteDialog
					title={`Delete "${project.name}"?`}
					description="This will permanently delete this project and all its scenes, frames, and assets. This action cannot be undone."
					onConfirm={() => onDelete(project._id)}
					trigger={
						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 border border-white/20 bg-black/40 text-red-400 backdrop-blur hover:bg-red-600/80 hover:text-white"
							type="button"
						>
							<Trash2 size={14} />
						</Button>
					}
				/>
			</div>
		</div>
	);
}
