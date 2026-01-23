import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Archive,
	ChevronRight,
	Folder,
	Grid,
	MoreHorizontal,
	Plus,
	Users,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/dashboard")({
	component: DashboardPage,
});

// Mock data for projects
const mockProjects = [
	{
		id: "1",
		name: "The Neon Protocol",
		lastModified: "2h ago",
		thumbnail: "/mock/thumb1.jpg",
		description: "A cyberpunk thriller set in the underbelly of Neo-Tokyo.",
		folder: "Short Films",
	},
	{
		id: "2",
		name: "Lost in Aether",
		lastModified: "5d ago",
		thumbnail: "/mock/thumb2.jpg",
		description: "Exploring the floating islands of the Zenith realm.",
		folder: "Commercials",
	},
	{
		id: "3",
		name: "Stellar Horizon",
		lastModified: "1w ago",
		thumbnail: "/mock/thumb3.jpg",
		description: "Deep space exploration and first contact protocols.",
		folder: "Short Films",
	},
];

const mockFolders = [
	{ id: "1", name: "Commercials", count: 4 },
	{ id: "2", name: "Short Films", count: 8 },
	{ id: "3", name: "Music Videos", count: 2 },
];

// Skeleton Card Component
function ProjectCardSkeleton() {
	return (
		<div className="flex flex-col border border-border bg-card">
			<Skeleton className="aspect-2.39/1 w-full bg-muted" />
			<div className="flex flex-1 flex-col space-y-4 p-6">
				<div className="flex items-start justify-between">
					<Skeleton className="h-7 w-3/4 bg-muted" />
					<Skeleton className="h-5 w-5 bg-muted" />
				</div>
				<Skeleton className="h-4 w-full bg-muted" />
				<Skeleton className="h-4 w-2/3 bg-muted" />
				<div className="mt-auto flex items-center justify-between pt-8">
					<div className="flex -space-x-2">
						<Skeleton className="h-7 w-7 bg-muted" />
						<Skeleton className="h-7 w-7 bg-muted" />
						<Skeleton className="h-7 w-7 bg-muted" />
					</div>
					<div className="space-y-1 text-right">
						<Skeleton className="ml-auto h-3 w-12 bg-muted" />
						<Skeleton className="ml-auto h-4 w-16 bg-muted" />
					</div>
				</div>
			</div>
		</div>
	);
}

function DashboardPage() {
	const [searchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [activeNav, setActiveNav] = useState("all");
	const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

	// Simulate data fetching
	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 1200);
		return () => clearTimeout(timer);
	}, []);

	const filteredProjects = mockProjects.filter((p) => {
		const matchesSearch = p.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesFolder = selectedFolder ? p.folder === selectedFolder : true;
		return matchesSearch && matchesFolder;
	});

	const navItems = [
		{ id: "all", label: "All Projects", icon: Grid },
		{ id: "shared", label: "Shared with Me", icon: Users },
		{ id: "archive", label: "Archive", icon: Archive },
	];

	return (
		<div className="flex h-full overflow-hidden bg-background">
			{/* Sidebar */}
			<aside className="hidden w-72 shrink-0 flex-col border-border border-r bg-card/40 backdrop-blur-md md:flex">
				<nav className="space-y-2 p-8">
					{navItems.map((item) => {
						const Icon = item.icon;
						return (
							<button
								key={item.id}
								onClick={() => {
									setActiveNav(item.id);
									setSelectedFolder(null);
									setIsLoading(true);
								}}
								className={`flex w-full items-center gap-3 px-4 py-3 font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${
									activeNav === item.id && !selectedFolder
										? "bg-primary text-primary-foreground shadow-xl"
										: "text-muted-foreground hover:bg-muted hover:text-primary"
								}`}
							>
								<Icon size={16} strokeWidth={1.5} />
								<span>{item.label}</span>
							</button>
						);
					})}
				</nav>

				<div className="border-border/50 border-t px-8 pt-4">
					<div className="mb-4 font-bold text-[9px] text-muted-foreground/60 uppercase tracking-[0.3em]">
						Recent Folders
					</div>
					<div className="space-y-1">
						{mockFolders.map((folder) => (
							<button
								key={folder.id}
								onClick={() => {
									setSelectedFolder(folder.name);
									setActiveNav("folder");
									setIsLoading(true);
								}}
								className={`group flex w-full items-center justify-between gap-3 px-4 py-3 font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${
									selectedFolder === folder.name
										? "bg-primary text-primary-foreground shadow-xl"
										: "text-muted-foreground hover:bg-muted hover:text-primary"
								}`}
							>
								<span className="flex items-center gap-3">
									<Folder size={14} strokeWidth={1.5} />
									{folder.name}
								</span>
								<span
									className={`font-mono text-[8px] italic opacity-60 ${selectedFolder === folder.name ? "text-white/60" : ""}`}
								>
									({folder.count})
								</span>
							</button>
						))}
					</div>
				</div>

				<div className="mt-auto p-8">
					<Button className="h-12 w-full rounded-none font-bold text-[10px] uppercase tracking-widest shadow-none">
						<Plus size={16} className="mr-2" />
						New Folder
					</Button>
				</div>
			</aside>

			{/* Main Content */}
			<main className="scrollbar-thin flex-1 overflow-y-auto p-4 md:p-12">
				<div className="mx-auto max-w-6xl">
					{/* Top Sections */}
					<div className="mb-12 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
						<div className="space-y-1">
							<div className="flex items-center gap-2 font-bold text-[10px] text-accent uppercase tracking-[0.3em]">
								{selectedFolder && (
									<>
										<button
											onClick={() => {
												setSelectedFolder(null);
												setActiveNav("all");
											}}
											className="text-muted-foreground transition-colors hover:text-primary"
										>
											Workspace
										</button>
										<ChevronRight
											size={12}
											className="text-muted-foreground/40"
										/>
									</>
								)}
								<span>{selectedFolder || "Workspace"}</span>
							</div>
							<h1 className="font-serif text-3xl text-primary italic tracking-tight md:text-4xl">
								{selectedFolder || "All Projects"}
							</h1>
							{isLoading ? (
								<Skeleton className="h-4 w-40 bg-muted" />
							) : (
								<p className="font-serif text-[10px] text-muted-foreground uppercase italic tracking-widest md:text-[11px]">
									{filteredProjects.length} active visual journeys
								</p>
							)}
						</div>
						<div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
							<Button
								variant="outline"
								className="h-12 w-full rounded-none border-border px-8 font-bold text-[10px] uppercase tracking-widest transition-colors hover:bg-muted sm:w-auto"
							>
								Import Project
							</Button>
							<Button className="h-12 w-full rounded-none px-8 font-bold text-[10px] uppercase tracking-widest shadow-none sm:w-auto">
								Create New
							</Button>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
						{/* Create New Project Card */}
						<button className="group flex h-[420px] flex-col items-center justify-center border-2 border-border border-dashed bg-card/50 transition-all hover:border-accent hover:bg-card/80">
							<div className="mb-6 flex h-20 w-20 items-center justify-center border border-border bg-muted transition-colors group-hover:bg-card">
								<Plus size={32} className="text-primary" strokeWidth={1.5} />
							</div>
							<span className="font-bold text-[11px] uppercase tracking-[0.3em]">
								New Project
							</span>
							<span className="mt-2 font-serif text-[10px] text-muted-foreground italic">
								Begin a new visual journey
							</span>
						</button>

						{/* Loading Skeletons or Project Cards */}
						{isLoading ? (
							<>
								<ProjectCardSkeleton />
								<ProjectCardSkeleton />
								<ProjectCardSkeleton />
							</>
						) : (
							filteredProjects.map((project) => (
								<Link
									key={project.id}
									to="/editor"
									className="group flex flex-col border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
								>
									{/* Thumbnail */}
									<div className="relative aspect-2.39/1 overflow-hidden bg-neutral-200">
										<img
											src={
												"https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800"
											}
											alt={project.name}
											className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
										/>
										<div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
											<span className="bg-background px-4 py-2 font-bold text-[10px] text-primary uppercase tracking-widest shadow-sm">
												Open Workspace
											</span>
										</div>
										{project.id === "1" && (
											<div className="absolute top-4 right-4 border border-border bg-background/90 px-2 py-1 font-bold text-[8px] text-foreground uppercase tracking-tighter shadow-sm backdrop-blur">
												In Progress
											</div>
										)}
									</div>

									{/* Content */}
									<div className="flex flex-1 flex-col p-6">
										<div className="mb-4 flex items-start justify-between">
											<h2 className="font-serif text-2xl">{project.name}</h2>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<button
														className="opacity-40 transition-opacity hover:opacity-100"
														onClick={(e) => e.preventDefault()}
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
											{project.description ||
												"A cinematic exploration of light and shadow, focusing on high-contrast textures."}
										</p>

										{/* Footer */}
										<div className="mt-auto flex items-center justify-between">
											<div className="flex -space-x-2">
												<div className="flex h-7 w-7 items-center justify-center overflow-hidden border border-border bg-card">
													<img
														src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
														alt="Avatar"
														className="h-full w-full"
													/>
												</div>
												<div className="flex h-7 w-7 items-center justify-center overflow-hidden border border-border bg-card">
													<img
														src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
														alt="Avatar"
														className="h-full w-full"
													/>
												</div>
												<div className="flex h-7 w-7 items-center justify-center border border-border bg-muted font-bold text-[8px]">
													+2
												</div>
											</div>

											<div className="text-right">
												<div className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest">
													Edited
												</div>
												<div className="font-medium text-[10px]">
													{project.lastModified}
												</div>
											</div>
										</div>
									</div>
								</Link>
							))
						)}
					</div>
				</div>
			</main>
		</div>
	);
}
