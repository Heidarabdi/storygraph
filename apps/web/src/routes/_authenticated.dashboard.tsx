import { api } from "@storygraph/backend/convex/_generated/api";
import type { Id } from "@storygraph/backend/convex/_generated/dataModel";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import {
	Archive,
	ChevronRight,
	Clock,
	Download,
	Grid,
	History as HistoryIcon,
	LayoutGrid,
	List,
	Plus,
	Star,
} from "lucide-react";
import { useState } from "react";
import { NewProjectModal } from "@/components/dashboard/NewProjectModal";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/dashboard")({
	component: DashboardPage,
});

function DashboardPage() {
	const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
	const [activeNav, setActiveNav] = useState("all");
	const [isLoadingState, setIsLoadingState] = useState(false);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	const navItems = [
		{ id: "all", label: "All Projects", icon: LayoutGrid },
		{ id: "recent", label: "Recent", icon: Clock },
		{ id: "shared", label: "Shared", icon: Star },
		{ id: "archived", label: "Archived", icon: Archive },
	];

	const organizations = useQuery(api.organizations.list);
	const deleteProject = useMutation(api.projects.remove);

	// Auto-select first org if none selected
	const [hasAutoSelected, setHasAutoSelected] = useState(false);
	if (
		organizations &&
		organizations.length > 0 &&
		!selectedOrgId &&
		!hasAutoSelected
	) {
		setSelectedOrgId(organizations[0]._id);
		setHasAutoSelected(true);
	}

	// Get projects for current org
	const projects = useQuery(
		api.projects.list,
		selectedOrgId ? { orgId: selectedOrgId as Id<"organizations"> } : "skip",
	);

	const isLoading = !projects || isLoadingState;

	const getFilteredProjects = () => {
		if (!projects) return [];

		let result = [...projects];

		if (activeNav === "recent") {
			result = result.slice(0, 5);
		} else if (activeNav === "shared") {
			return [];
		} else if (activeNav === "archived") {
			return [];
		}

		if (searchQuery) {
			result = result.filter((p) =>
				p.name.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		}

		return result;
	};

	const filteredProjects = getFilteredProjects();

	const handleDeleteProject = async (id: string) => {
		try {
			await deleteProject({ projectId: id as Id<"projects"> });
		} catch (error) {
			console.error("Failed to delete project:", error);
		}
	};

	return (
		<div className="flex h-full w-full overflow-hidden bg-background">
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
									setIsLoadingState(true);
									setTimeout(() => setIsLoadingState(false), 500);
								}}
								className={`flex w-full items-center gap-3 px-4 py-3 font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${
									activeNav === item.id
										? "bg-primary text-primary-foreground shadow-xl"
										: "text-muted-foreground hover:bg-muted hover:text-primary"
								}`}
								type="button"
							>
								<Icon size={16} strokeWidth={1.5} />
								<span>{item.label}</span>
							</button>
						);
					})}
				</nav>

				<div className="border-border/50 border-t px-8 pt-4">
					<div className="mb-4 font-bold text-[9px] text-muted-foreground/60 uppercase tracking-[0.3em]">
						Recent Projects
					</div>
					<div className="space-y-1">
						{projects?.slice(0, 3).map((project) => (
							<button
								key={project._id}
								onClick={() => {
									setActiveNav("all");
									setSearchQuery(project.name);
								}}
								className="group flex w-full items-center gap-3 px-4 py-3 font-bold text-[10px] text-muted-foreground uppercase tracking-[0.2em] transition-all hover:bg-muted hover:text-primary"
								type="button"
							>
								<div className="h-1 w-1 bg-accent/40 group-hover:bg-accent" />
								<span className="truncate">{project.name}</span>
							</button>
						))}
						{(!projects || projects.length === 0) && !isLoading && (
							<p className="px-4 py-2 font-serif text-[10px] text-muted-foreground/40 italic">
								No recent journeys...
							</p>
						)}
					</div>
				</div>
			</aside>

			{/* Main Content Area */}
			<div className="flex min-w-0 flex-1 flex-col">
				{/* Sub-Header / Org Switcher */}
				<div className="z-10 flex h-14 shrink-0 items-center border-border border-b bg-card/40 px-6 backdrop-blur-md">
					<div className="flex items-center gap-2 md:gap-4">
						<button
							className="p-1 text-muted-foreground transition-colors hover:text-primary"
							type="button"
						>
							<HistoryIcon size={18} strokeWidth={1.5} />
						</button>
						<button
							className="p-1 text-muted-foreground transition-colors hover:text-primary"
							type="button"
						>
							<Download size={18} strokeWidth={1.5} />
						</button>
						<div className="ml-2 flex items-center gap-2">
							<span className="font-serif text-primary text-sm italic">
								{organizations?.find((o) => o._id === selectedOrgId)?.name ||
									"Personal Workspace"}
							</span>
							<ChevronRight size={14} className="text-muted-foreground/40" />
						</div>
					</div>
				</div>

				<main className="flex-1 overflow-y-auto p-4 md:p-10">
					<div className="mx-auto max-w-7xl">
						{/* Header Section */}
						<div className="mb-12 flex flex-col items-baseline justify-between gap-6 border-border border-b pb-10 md:flex-row">
							<div className="space-y-1">
								<h2 className="font-bold text-[10px] text-accent uppercase tracking-[0.4em]">
									{"Project Vault //"}
								</h2>
								<h1 className="font-serif text-4xl text-primary lowercase italic">
									{activeNav === "all"
										? "personal journeys"
										: (navItems
												.find((n) => n.id === activeNav)
												?.label.toLowerCase() ?? "projects")}
								</h1>
							</div>

							<div className="flex w-full items-center gap-6 sm:w-auto">
								{/* Unified View Toggle */}
								<div className="flex items-center gap-1 bg-muted/20 p-1">
									<button
										type="button"
										onClick={() => setViewMode("grid")}
										className={`p-2 transition-all ${viewMode === "grid" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground/40 hover:text-primary"}`}
										title="Grid View"
									>
										<Grid size={18} />
									</button>
									<button
										type="button"
										onClick={() => setViewMode("list")}
										className={`p-2 transition-all ${viewMode === "list" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground/40 hover:text-primary"}`}
										title="Details View"
									>
										<List size={18} />
									</button>
								</div>

								<div className="relative w-full sm:w-72">
									<input
										type="text"
										placeholder="Search journeys..."
										className="h-12 w-full border-border border-b bg-transparent px-4 font-bold text-[10px] uppercase tracking-widest focus:border-primary focus:outline-none"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
								</div>
							</div>
						</div>

						<div
							className={
								viewMode === "grid"
									? "grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3"
									: "space-y-px border-border border-y"
							}
						>
							{/* Create New Project Card - Adapts to Mode */}
							{viewMode === "grid" ? (
								<button
									onClick={() => setIsNewProjectModalOpen(true)}
									className="group flex h-[420px] flex-col items-center justify-center border-2 border-border border-dashed bg-card/50 transition-all hover:border-accent hover:bg-card/80"
									type="button"
								>
									<div className="mb-6 flex h-20 w-20 items-center justify-center border border-border bg-muted transition-colors group-hover:bg-card">
										<Plus
											size={32}
											className="text-primary"
											strokeWidth={1.5}
										/>
									</div>
									<span className="font-bold text-[11px] uppercase tracking-[0.3em]">
										New Project
									</span>
									<span className="mt-2 font-serif text-[10px] text-muted-foreground lowercase italic">
										Begin a new visual journey
									</span>
								</button>
							) : (
								<button
									onClick={() => setIsNewProjectModalOpen(true)}
									className="group flex w-full items-center gap-4 border-border/50 border-x bg-card/50 p-4 transition-all hover:bg-muted/30 md:gap-6 md:p-6"
									type="button"
								>
									<div className="flex h-16 w-16 items-center justify-center border border-border bg-muted transition-colors group-hover:bg-card md:h-20 md:w-20">
										<Plus size={24} className="text-primary" />
									</div>
									<div className="flex-1 text-left">
										<span className="block font-bold text-xs uppercase tracking-[0.15em] md:text-sm">
											New Journey Protocol
										</span>
										<span className="font-serif text-[10px] text-muted-foreground lowercase italic opacity-60 md:text-xs">
											initialize new visual journey entry
										</span>
									</div>
								</button>
							)}

							{isLoading
								? Array.from({ length: 3 }).map((_, i) => (
										<Skeleton
											// biome-ignore lint/suspicious/noArrayIndexKey: Static array for skeleton loading
											key={i}
											className={
												viewMode === "grid"
													? "h-[420px] border border-border bg-card"
													: "h-24 border border-border bg-card"
											}
										/>
									))
								: filteredProjects.map((project) => (
										<ProjectCard
											key={project._id}
											project={project}
											onDelete={handleDeleteProject}
											viewMode={viewMode}
										/>
									))}
						</div>
					</div>
				</main>
			</div>

			<NewProjectModal
				isOpen={isNewProjectModalOpen}
				onClose={() => setIsNewProjectModalOpen(false)}
				orgId={selectedOrgId}
			/>
		</div>
	);
}
