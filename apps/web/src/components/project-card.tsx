import { Link } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectCardProps {
	id: string;
	name: string;
	thumbnail?: string;
	description?: string;
	lastModified: string; // Formatting handled by parent for now
}

export function ProjectCard({
	id: _id,
	name,
	thumbnail,
	description,
	lastModified,
}: ProjectCardProps) {
	return (
		<Link
			to="/editor/$projectId"
			params={{ projectId: _id }}
			className="group flex flex-col border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
		>
			{/* Thumbnail */}
			<div className="relative aspect-2.39/1 overflow-hidden bg-neutral-200">
				<img
					src={
						thumbnail ||
						"https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800"
					}
					alt={name}
					className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
				/>
				<div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
					<span className="bg-background px-4 py-2 font-bold text-[10px] text-primary uppercase tracking-widest shadow-sm">
						Open Workspace
					</span>
				</div>
			</div>

			{/* Content */}
			<div className="flex flex-1 flex-col p-6">
				<div className="mb-4 flex items-start justify-between">
					<h2 className="font-serif text-2xl">{name}</h2>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								className="opacity-40 transition-opacity hover:opacity-100"
								onClick={(e) => e.preventDefault()}
								type="button"
							>
								<MoreHorizontal size={18} strokeWidth={1.5} />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="rounded-none border-border"
						>
							<DropdownMenuItem className="font-bold text-[10px] uppercase tracking-widest">
								Duplicate
							</DropdownMenuItem>
							<DropdownMenuItem className="font-bold text-[10px] uppercase tracking-widest">
								Move to Folder
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="font-bold text-[10px] text-red-600 uppercase tracking-widest">
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<p className="mb-8 line-clamp-2 text-muted-foreground text-xs leading-relaxed">
					{description || "No description provided."}
				</p>

				{/* Footer */}
				<div className="mt-auto flex items-center justify-between">
					<div className="flex -space-x-2">
						{/* Mock avatars for now */}
						<div className="flex h-7 w-7 items-center justify-center overflow-hidden border border-border bg-card">
							<div className="h-full w-full bg-muted" />
						</div>
					</div>

					<div className="text-right">
						<div className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest">
							Updated
						</div>
						<div className="font-medium text-[10px]">{lastModified}</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
