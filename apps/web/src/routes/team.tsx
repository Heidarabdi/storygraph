import { createFileRoute, Link } from "@tanstack/react-router";
import {
    UserPlus,
    MoreVertical,
    Shield,
    User,
    Mail,
    Search,
    Filter,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/team")({
    component: TeamPage,
});

const mockTeam = [
    {
        id: "1",
        name: "Julian Thorne",
        email: "julian@storygraph.studio",
        role: "Admin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Julian",
        status: "Active",
    },
    {
        id: "2",
        name: "Sarah Chen",
        email: "sarah.c@zenith.films",
        role: "Editor",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        status: "Active",
    },
    {
        id: "3",
        name: "Marcus Aurelius",
        email: "marcus@lost-islands.com",
        role: "Viewer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
        status: "Pending",
    },
];

function TeamPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="flex h-full flex-col bg-background/50 overflow-hidden">
            {/* Header */}
            <div className="border-b border-border bg-white p-12">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                        <div className="space-y-2 text-center md:text-left">
                            <h1 className="font-serif text-4xl italic tracking-tight text-primary">Collective</h1>
                            <p className="font-serif text-[11px] italic text-muted-foreground tracking-[0.2em] uppercase">
                                Your studio collaborators and visual directors
                            </p>
                        </div>
                        <Button className="h-12 rounded-none px-8 text-[10px] font-bold uppercase tracking-widest shadow-none">
                            <UserPlus size={16} className="mr-3" />
                            Invite Collaborator
                        </Button>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative flex-1 group">
                            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                            <Input
                                placeholder="Search directory..."
                                className="h-12 border-border border-b-2 border-x-0 border-t-0 rounded-none bg-transparent pl-12 focus-visible:ring-0 focus-visible:border-primary text-[11px] uppercase tracking-widest font-bold"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="outline" className="h-12 rounded-none border-border px-6 text-[9px] font-bold uppercase tracking-widest hover:bg-gray-50 flex items-center gap-2">
                                <Filter size={14} />
                                Role: All
                            </Button>
                            <div className="h-8 w-px bg-border mx-2" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{mockTeam.length} Members</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team List */}
            <div className="flex-1 overflow-y-auto p-12 scrollbar-thin">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-px bg-border border border-border overflow-hidden">
                        {mockTeam.map((member) => (
                            <div key={member.id} className="group flex flex-col md:flex-row items-center justify-between bg-white p-8 transition-colors hover:bg-gray-50/50 gap-8">
                                <div className="flex items-center gap-6">
                                    <div className="h-16 w-16 overflow-hidden bg-primary ring-1 ring-border shadow-sm shrink-0">
                                        <img src={member.avatar} alt={member.name} className="h-full w-full object-cover opacity-90" />
                                    </div>
                                    <div className="space-y-1 text-center md:text-left">
                                        <h3 className="font-serif text-2xl">{member.name}</h3>
                                        <div className="flex items-center gap-3 justify-center md:justify-start">
                                            <div className="flex items-center gap-1.5 opacity-50">
                                                <Mail size={12} strokeWidth={2.5} />
                                                <span className="text-[10px] font-bold uppercase tracking-tighter">{member.email}</span>
                                            </div>
                                            {member.status === "Pending" && (
                                                <span className="bg-accent/10 text-accent px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest italic">Pending Invite</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-8 w-8 items-center justify-center border ${member.role === 'Admin' ? 'border-accent/40 bg-accent/5' : 'border-border bg-gray-50'}`}>
                                            {member.role === 'Admin' ? <Shield size={14} className="text-accent" /> : <User size={14} className="text-muted-foreground" />}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Role</div>
                                            <div className="text-[11px] font-medium text-primary/80">{member.role}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="h-10 w-10 flex items-center justify-center text-muted-foreground/40 hover:text-primary transition-colors">
                                                    <MoreVertical size={18} strokeWidth={1.5} />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-none border-border">
                                                <DropdownMenuItem className="text-[10px] uppercase font-bold tracking-widest px-4 py-2">Transfer Ownership</DropdownMenuItem>
                                                <DropdownMenuItem className="text-[10px] uppercase font-bold tracking-widest px-4 py-2">Change Role</DropdownMenuItem>
                                                <DropdownMenuItem className="text-[10px] uppercase font-bold tracking-widest px-4 py-2 text-red-600">Remove from Studio</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-accent/5 border border-accent/20 p-12 text-center max-w-3xl mx-auto space-y-6">
                        <h4 className="font-serif text-2xl italic text-accent">Need more seats?</h4>
                        <p className="text-xs text-muted-foreground italic leading-relaxed font-serif px-12">
                            Standard studio licenses include up to 10 visual directors. For larger collectives, explore our enterprise infrastructure.
                        </p>
                        <Link to="/pricing">
                            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white rounded-none text-[10px] font-bold uppercase tracking-widest h-12">
                                Upgrade Licensing
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
