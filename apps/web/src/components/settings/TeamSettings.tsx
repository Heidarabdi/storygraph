import { User } from "lucide-react";

const teamMembers = [
	{ name: "Julian Thorne", role: "Admin", isOwner: true, status: "Active" },
	{ name: "Sarah Chen", role: "Editor", status: "Last seen 2h ago" },
	{ name: "Marcus Vane", role: "Viewer", status: "Last seen Yesterday" },
];

export default function TeamSettings() {
	return (
		<div className="fade-in slide-in-from-bottom-4 animate-in duration-500">
			<header className="mb-8 px-2 md:mb-10 lg:px-0">
				<h1 className="mb-2 font-serif text-3xl italic md:text-4xl">
					Team Management
				</h1>
				<p className="text-muted-foreground text-xs leading-relaxed tracking-wide md:text-sm">
					Curate your creative circle. Manage roles and invitations for your
					production studio.
				</p>
			</header>

			<div className="space-y-12">
				{/* Invite Section */}
				<section className="mx-2 border border-border bg-card p-4 md:p-8 lg:mx-0">
					<h3 className="mb-6 font-bold text-[10px] text-foreground uppercase tracking-[0.2em] md:text-xs">
						Invite Team Member
					</h3>
					<div className="flex flex-col gap-4">
						<input
							className="w-full rounded-none border border-border bg-background px-4 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground/50 placeholder:italic focus:border-primary"
							placeholder="colleague@studio.com"
							type="email"
						/>
						<div className="flex flex-col gap-4 sm:flex-row">
							<div className="relative flex-1">
								<select className="w-full appearance-none rounded-none border border-border bg-background px-4 py-3 font-bold text-[11px] text-foreground uppercase tracking-widest outline-none transition-colors focus:border-primary md:text-sm">
									<option className="bg-background">Director</option>
									<option className="bg-background">Editor</option>
									<option className="bg-background">Viewer</option>
								</select>
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
									<svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
										<title>Dropdown Arrow</title>
										<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
									</svg>
								</div>
							</div>
							<button
								className="w-full bg-primary px-8 py-3 font-bold text-[10px] text-primary-foreground uppercase tracking-widest shadow-lg transition-all hover:bg-neutral-800 sm:w-auto"
								type="button"
							>
								Send Invite
							</button>
						</div>
					</div>
				</section>

				{/* Members List */}
				<section>
					<h3 className="mb-6 px-2 font-bold text-foreground text-xs uppercase tracking-[0.2em]">
						Current Members{" "}
						<span className="ml-2 font-normal text-muted-foreground">
							({teamMembers.length})
						</span>
					</h3>
					<div className="space-y-4">
						{teamMembers.map((member) => (
							<div
								key={member.name}
								className="group flex items-center justify-between border border-border bg-card p-5 transition-colors hover:border-accent"
							>
								<div className="flex min-w-0 items-center gap-4">
									<div className="h-10 w-10 shrink-0 overflow-hidden border border-border bg-muted md:h-12 md:w-12">
										<img
											src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
											alt={member.name}
											className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0"
										/>
									</div>
									<div className="min-w-0">
										<h4 className="truncate font-medium font-serif text-base text-foreground leading-tight md:text-lg">
											{member.name}
										</h4>
										<p className="truncate text-[9px] text-muted-foreground uppercase tracking-[0.15em] md:text-[10px]">
											{member.role}
											{member.isOwner && " • Owner"}
										</p>
									</div>
								</div>
								<span
									className={`hidden font-bold text-[9px] uppercase tracking-widest sm:inline md:text-[10px] ${member.status === "Active" ? "text-accent" : "text-muted-foreground"}`}
								>
									{member.status}
								</span>
							</div>
						))}

						{/* Pending Invitation */}
						<div className="flex items-center justify-between border border-border bg-card/50 p-5 opacity-70">
							<div className="flex items-center gap-4">
								<div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border bg-muted">
									<User size={20} className="text-muted-foreground/30" />
								</div>
								<div>
									<h4 className="font-medium font-serif text-lg text-muted-foreground italic leading-tight">
										sarah.lee@filmlabs.io
									</h4>
									<p className="text-[10px] text-muted-foreground uppercase tracking-widest">
										Editor
									</p>
								</div>
							</div>
							<div className="flex items-center gap-6">
								<span className="hidden font-bold text-[10px] text-muted-foreground uppercase italic tracking-widest md:inline">
									Pending Invitation
								</span>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
