import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Filter,
	Mail,
	MoreVertical,
	Search,
	Shield,
	User,
	UserPlus,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/team")({
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
		<div className="flex h-full flex-col overflow-hidden bg-background/50">
			{/* Header */}
			<div className="border-border border-b bg-card p-6 md:p-12">
				<div className="mx-auto max-w-7xl">
					<div className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row">
						<div className="space-y-3 text-center md:text-left">
							<h1 className="font-serif text-3xl text-primary italic tracking-tight md:text-4xl">
								Collective
							</h1>
							<p className="font-serif text-[9px] text-muted-foreground uppercase italic tracking-[0.15em] md:text-[11px] md:tracking-[0.2em]">
								Your studio collaborators and visual directors
							</p>
						</div>
						<Button className="h-12 w-full rounded-none px-8 font-bold text-[10px] uppercase tracking-widest shadow-none md:w-auto">
							<UserPlus size={16} className="mr-3" />
							Invite Collaborator
						</Button>
					</div>

					<div className="flex flex-col items-center gap-6 md:flex-row">
						<div className="group relative flex-1">
							<Search
								size={14}
								className="absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
							/>
							<Input
								placeholder="Search directory..."
								className="h-12 rounded-none border-border border-x-0 border-t-0 border-b-2 bg-transparent pl-12 font-bold text-[11px] uppercase tracking-widest focus-visible:border-primary focus-visible:ring-0"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<div className="flex items-center gap-4">
							<Button
								variant="outline"
								className="flex h-12 items-center gap-2 rounded-none border-border px-6 font-bold text-[9px] uppercase tracking-widest hover:bg-muted"
							>
								<Filter size={14} />
								Role: All
							</Button>
							<div className="mx-2 h-8 w-px bg-border" />
							<span className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
								{mockTeam.length} Members
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Team List */}
			<div className="scrollbar-thin flex-1 overflow-y-auto p-6 md:p-12">
				<div className="mx-auto max-w-7xl">
					<div className="grid gap-px overflow-hidden border border-border bg-border">
						{mockTeam.map((member) => (
							<div
								key={member.id}
								className="group flex flex-col items-start justify-between gap-6 bg-card p-6 transition-colors hover:bg-muted/50 md:gap-8 md:p-8 min-[600px]:flex-row min-[600px]:items-center"
							>
								<div className="flex w-full items-center gap-4 md:gap-6">
									<div className="h-12 w-12 shrink-0 overflow-hidden bg-primary shadow-sm ring-1 ring-border md:h-16 md:w-16">
										<img
											src={member.avatar}
											alt={member.name}
											className="h-full w-full object-cover opacity-90"
										/>
									</div>
									<div className="min-w-0 flex-1 space-y-1 text-left">
										<h3 className="truncate font-serif text-lg md:text-2xl">
											{member.name}
										</h3>
										<div className="flex flex-col gap-2 overflow-hidden sm:flex-row sm:items-center sm:gap-3">
											<div className="flex items-center gap-1.5 overflow-hidden opacity-50">
												<Mail
													size={10}
													strokeWidth={2.5}
													className="shrink-0"
												/>
												<span className="truncate font-bold text-[9px] uppercase tracking-tighter md:text-[10px]">
													{member.email}
												</span>
											</div>
											{member.status === "Pending" && (
												<span className="w-fit shrink-0 bg-accent/10 px-2 py-0.5 font-bold text-[8px] text-accent uppercase italic tracking-widest">
													Pending Invite
												</span>
											)}
										</div>
									</div>
								</div>

								<div className="flex w-full items-center justify-between gap-6 border-t pt-4 md:gap-12 min-[600px]:w-auto min-[600px]:justify-end min-[600px]:border-t-0 min-[600px]:pt-0">
									<div className="flex items-center gap-3">
										<div
											className={`flex h-8 w-8 items-center justify-center border ${member.role === "Admin" ? "border-accent/40 bg-accent/5" : "border-border bg-muted"}`}
										>
											{member.role === "Admin" ? (
												<Shield size={14} className="text-accent" />
											) : (
												<User size={14} className="text-muted-foreground" />
											)}
										</div>
										<div className="text-left">
											<div className="mb-1 font-bold text-[9px] uppercase leading-none tracking-widest md:text-[10px]">
												Role
											</div>
											<div className="font-medium text-[10px] text-primary/80 md:text-[11px]">
												{member.role}
											</div>
										</div>
									</div>

									<div className="flex items-center gap-4">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<button
													className="flex h-10 w-10 items-center justify-center text-muted-foreground/40 transition-colors hover:text-primary"
													type="button"
												>
													<MoreVertical size={18} strokeWidth={1.5} />
												</button>
											</DropdownMenuTrigger>
											<DropdownMenuContent
												align="end"
												className="rounded-none border-border"
											>
												<DropdownMenuItem className="px-4 py-2 font-bold text-[10px] uppercase tracking-widest">
													Transfer Ownership
												</DropdownMenuItem>
												<DropdownMenuItem className="px-4 py-2 font-bold text-[10px] uppercase tracking-widest">
													Change Role
												</DropdownMenuItem>
												<DropdownMenuItem className="px-4 py-2 font-bold text-[10px] text-red-600 uppercase tracking-widest">
													Remove from Studio
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="mx-auto mt-16 max-w-3xl space-y-6 border border-accent/20 bg-accent/5 p-6 text-center md:p-12">
						<h4 className="font-serif text-2xl text-accent italic">
							Need more seats?
						</h4>
						<p className="px-6 font-serif text-[11px] text-muted-foreground italic leading-relaxed md:px-12 md:text-xs">
							Standard studio licenses include up to 10 visual directors. For
							larger collectives, explore our enterprise infrastructure.
						</p>
						<Link to="/pricing">
							<Button
								variant="outline"
								className="h-12 rounded-none border-accent font-bold text-[10px] text-accent uppercase tracking-widest hover:bg-accent hover:text-white"
							>
								Upgrade Licensing
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
