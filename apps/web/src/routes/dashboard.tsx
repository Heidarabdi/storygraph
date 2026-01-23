import { createFileRoute, Link } from "@tanstack/react-router";
import {
    MoreHorizontal,
    Plus,
    Grid,
    Users,
    Archive,
    Folder,
    ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        <div className="flex flex-col border border-border bg-white dark:bg-neutral-900">
            <Skeleton className="aspect-2.39/1 w-full bg-muted" />
            <div className="flex flex-1 flex-col p-6 space-y-4">
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
                        <Skeleton className="h-3 w-12 bg-muted ml-auto" />
                        <Skeleton className="h-4 w-16 bg-muted ml-auto" />
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
    }, [activeNav, selectedFolder]);

    const filteredProjects = mockProjects.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFolder = selectedFolder ? p.folder === selectedFolder : true;
        return matchesSearch && matchesFolder;
    });

    const navItems = [
        { id: "all", label: "All Projects", icon: Grid },
        { id: "shared", label: "Shared with Me", icon: Users },
        { id: "archive", label: "Archive", icon: Archive },
    ];

    return (
        <div className="flex h-full overflow-hidden bg-background/50">
            {/* Sidebar */}
            <aside className="hidden md:flex w-72 flex-col border-r border-border bg-white/40 backdrop-blur-md shrink-0">
                <nav className="p-8 space-y-2">
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
                                className={`flex w-full items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeNav === item.id && !selectedFolder
                                        ? "bg-primary text-white shadow-xl"
                                        : "text-muted-foreground hover:bg-gray-100 hover:text-primary"
                                    }`}
                            >
                                <Icon size={16} strokeWidth={1.5} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="px-8 pt-4 border-t border-border/50">
                    <div className="mb-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
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
                                className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all group ${selectedFolder === folder.name
                                        ? "bg-primary text-white shadow-xl"
                                        : "text-muted-foreground hover:bg-gray-100 hover:text-primary"
                                    }`}
                            >
                                <span className="flex items-center gap-3">
                                    <Folder size={14} strokeWidth={1.5} />
                                    {folder.name}
                                </span>
                                <span className={`text-[8px] font-mono italic opacity-60 ${selectedFolder === folder.name ? "text-white/60" : ""}`}>
                                    ({folder.count})
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-8 mt-auto">
                    <Button className="w-full h-12 rounded-none shadow-none text-[10px] font-bold uppercase tracking-widest">
                        <Plus size={16} className="mr-2" />
                        New Folder
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-12 overflow-y-auto scrollbar-thin">
                <div className="mx-auto max-w-6xl">
                    {/* Top Sections */}
                    <div className="mb-12 flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                                {selectedFolder && (
                                    <>
                                        <button onClick={() => { setSelectedFolder(null); setActiveNav("all"); }} className="text-muted-foreground hover:text-primary transition-colors">
                                            Workspace
                                        </button>
                                        <ChevronRight size={12} className="text-muted-foreground/40" />
                                    </>
                                )}
                                <span>{selectedFolder || "Workspace"}</span>
                            </div>
                            <h1 className="font-serif text-4xl italic tracking-tight text-primary">
                                {selectedFolder || "All Projects"}
                            </h1>
                            {isLoading ? (
                                <Skeleton className="h-4 w-40 bg-muted" />
                            ) : (
                                <p className="font-serif text-[11px] italic text-muted-foreground tracking-widest uppercase">
                                    {filteredProjects.length} active visual journeys
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="outline" className="rounded-none border-border h-12 px-8 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
                                Import Project
                            </Button>
                            <Button className="rounded-none h-12 px-8 shadow-none text-[10px] font-bold uppercase tracking-widest">
                                Create New
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {/* Create New Project Card */}
                        <button className="flex h-[420px] flex-col items-center justify-center border-2 border-dashed border-border bg-white/50 transition-all hover:border-accent group hover:bg-white/80">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center border border-border bg-gray-50 transition-colors group-hover:bg-white dark:bg-neutral-800">
                                <Plus size={32} className="text-primary" strokeWidth={1.5} />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-[0.3em]">New Project</span>
                            <span className="mt-2 font-serif text-[10px] italic text-muted-foreground">
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
                                <Link key={project.id} to="/editor" className="flex flex-col group border border-border bg-white dark:bg-neutral-900 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                                    {/* Thumbnail */}
                                    <div className="relative aspect-2.39/1 overflow-hidden bg-neutral-200">
                                        <img
                                            src={`https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800`}
                                            alt={project.name}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                                            <span className="bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                                                Open Workspace
                                            </span>
                                        </div>
                                        {project.id === "1" && (
                                            <div className="absolute right-4 top-4 bg-white/90 px-2 py-1 text-[8px] font-bold uppercase tracking-tighter backdrop-blur shadow-sm">
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
                                                        className="opacity-40 hover:opacity-100 transition-opacity"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        <MoreHorizontal size={18} strokeWidth={1.5} />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-none border-border">
                                                    <DropdownMenuItem className="text-[10px] uppercase font-bold tracking-widest">Duplicate</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-[10px] uppercase font-bold tracking-widest">Move to Folder</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-[10px] uppercase font-bold tracking-widest text-red-600">Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <p className="mb-8 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                            {project.description || "A cinematic exploration of light and shadow, focusing on high-contrast textures."}
                                        </p>

                                        {/* Footer */}
                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex -space-x-2">
                                                <div className="h-7 w-7 border border-border bg-white flex items-center justify-center overflow-hidden">
                                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Avatar" className="h-full w-full" />
                                                </div>
                                                <div className="h-7 w-7 border border-border bg-white flex items-center justify-center overflow-hidden">
                                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Avatar" className="h-full w-full" />
                                                </div>
                                                <div className="flex h-7 w-7 items-center justify-center border border-border bg-gray-100 text-[8px] font-bold dark:bg-neutral-800">
                                                    +2
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                                                    Edited
                                                </div>
                                                <div className="text-[10px] font-medium">
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
