import { createFileRoute, Link } from "@tanstack/react-router";
import {
    MoreHorizontal,
    Plus,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
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
    },
    {
        id: "2",
        name: "Lost in Aether",
        lastModified: "5d ago",
        thumbnail: "/mock/thumb2.jpg",
        description: "Exploring the floating islands of the Zenith realm.",
    },
    {
        id: "3",
        name: "Stellar Horizon",
        lastModified: "1w ago",
        thumbnail: "/mock/thumb3.jpg",
        description: "Deep space exploration and first contact protocols.",
    },
];

function DashboardPage() {
    const [searchQuery] = useState("");

    const filteredProjects = mockProjects.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-full bg-background/50 p-12 overflow-y-auto scrollbar-thin">
            <div className="mx-auto max-w-7xl">
                {/* Top Sections */}
                <div className="mb-12 flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="font-serif text-4xl italic tracking-tight text-primary">Workspace</h1>
                        <p className="font-serif text-[11px] italic text-muted-foreground tracking-widest uppercase">
                            {filteredProjects.length} active visual journeys
                        </p>
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Create New Project Card */}
                    <button className="flex h-[420px] flex-col items-center justify-center border-2 border-dashed border-border bg-white/50 transition-all hover:border-accent group hover:bg-white/80">
                        <div className="mb-6 flex h-20 w-20 items-center justify-center border border-border bg-gray-50 transition-colors group-hover:bg-white dark:bg-neutral-800">
                            <Plus size={32} className="text-primary" strokeWidth={1.5} />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.3em] New Project">New Project</span>
                        <span className="mt-2 font-serif text-[10px] italic text-muted-foreground">
                            Begin a new visual journey
                        </span>
                    </button>

                    {/* Project Cards */}
                    {filteredProjects.map((project) => (
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
                    ))}
                </div>
            </div>
        </div>
    );
}
