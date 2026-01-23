import { Link, useRouterState } from "@tanstack/react-router";
import { Brush, Search, Share2, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default function Header() {
	const routerState = useRouterState();
	const pathname = routerState.location.pathname;
	const isEditorPage = pathname.includes("/editor");

	// Public routes that should show the public nav
	const publicRoutes = ["/", "/pricing"];
	const isPublicPage = publicRoutes.includes(pathname) || pathname.startsWith("/auth");

	const navLinkClass = (path: string) => `text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${pathname === path ? "text-primary" : "text-muted-foreground hover:text-primary"}`;

	return (
		<header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background/90 px-6 backdrop-blur-md">
			{/* Left: Logo & Project */}
			<div className="flex items-center gap-12">
				<Link to="/" className="flex items-center gap-3">
					<Brush size={24} className="text-primary" strokeWidth={1.5} />
					<span className="font-serif text-xl font-semibold tracking-tight">
						Storygraph
					</span>
				</Link>

				<nav className="hidden h-14 items-center gap-8 md:flex">
					{isPublicPage ? (
						<>
							<Link to="/" className={navLinkClass("/")}>
								Story
							</Link>
							<Link to="/pricing" className={navLinkClass("/pricing")}>
								Pricing
							</Link>
							<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 cursor-not-allowed">
								Showcase
							</span>
						</>
					) : (
						<>
							<Link to="/dashboard" className={navLinkClass("/dashboard")}>
								Dashboard
							</Link>
							<Link to="/library" className={navLinkClass("/library")}>
								Library
							</Link>
							<Link to="/team" className={navLinkClass("/team")}>
								Team
							</Link>
						</>
					)}
				</nav>
			</div>

			{/* Center: Search (if on dashboard or library) */}
			{!isEditorPage && !isPublicPage && (
				<div className="hidden flex-1 max-w-sm px-12 lg:block">
					<div className="relative flex items-center bg-white/50 dark:bg-white/5 border border-border px-3 py-1.5 rounded-sm">
						<Search size={14} className="text-muted-foreground" />
						<Input
							className="h-6 border-0 bg-transparent text-[10px] focus-visible:ring-0 placeholder:text-muted-foreground/50 px-2"
							placeholder="Search workspace..."
						/>
					</div>
				</div>
			)}

			{/* Right: Actions / User Profile */}
			<div className="flex items-center gap-6">
				{isPublicPage ? (
					<div className="flex items-center gap-6">
						<Link to="/auth/login" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
							Sign In
						</Link>
						<Link to="/auth/signup">
							<Button className="h-9 rounded-none bg-primary px-6 text-[10px] font-bold uppercase tracking-widest text-white shadow-none">
								Get Started
							</Button>
						</Link>
					</div>
				) : (
					<>
						{isEditorPage && (
							<div className="flex items-center gap-4">
								<button className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
									<Share2 size={16} strokeWidth={1.5} />
									<span>Export</span>
								</button>
								<Separator orientation="vertical" className="h-4 bg-border" />
								<Button
									variant="default"
									size="sm"
									className="h-8 rounded-none px-6 text-[10px] font-bold uppercase tracking-widest shadow-none"
								>
									Present
								</Button>
							</div>
						)}

						<div className="flex items-center gap-4">
							<Link to="/settings" className={`p-2 transition-colors ${pathname === "/settings" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
								<Settings size={18} strokeWidth={1.5} />
							</Link>

							<div className="h-4 w-px bg-border hidden lg:block" />

							<Link to="/settings" className="flex items-center gap-3 transition-opacity hover:opacity-80">
								<div className="hidden text-right lg:block">
									<div className="text-[10px] font-bold uppercase tracking-widest leading-none">
										Julian Thorne
									</div>
									<div className="mt-1 text-[9px] uppercase text-muted-foreground">
										Creative Director
									</div>
								</div>
								<div className="flex h-9 w-9 items-center justify-center overflow-hidden bg-primary ring-1 ring-border/50 shadow-sm">
									<img
										src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julian"
										alt="Profile"
										className="h-full w-full object-cover opacity-90"
									/>
								</div>
							</Link>
						</div>
					</>
				)}
			</div>
		</header>
	);
}
