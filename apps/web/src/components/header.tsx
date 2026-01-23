import { Link, useRouterState } from "@tanstack/react-router";
import {
	Bell,
	Brush,
	ChevronRight,
	Menu,
	Moon,
	Share2,
	Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import NotificationPanel from "@/components/NotificationPanel";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
	const routerState = useRouterState();
	const pathname = routerState.location.pathname;
	const isEditorPage = pathname.includes("/editor");
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme, resolvedTheme } = useTheme();

	// Avoid hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

	// Public routes that should show the public nav
	const publicRoutes = ["/", "/pricing"];
	const isPublicPage =
		publicRoutes.includes(pathname) || pathname.startsWith("/auth");

	const navLinkClass = (path: string) =>
		`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
			pathname === path
				? "text-primary border-b-2 border-primary pb-4 -mb-[1px]"
				: "text-muted-foreground hover:text-primary pb-4 -mb-[1px] border-b-2 border-transparent"
		}`;

	const mobileNavLinkClass = (path: string) =>
		`text-[clamp(1rem,4vw,1.2rem)] font-bold uppercase tracking-[0.1em] py-6 border-b border-border w-full text-left px-8 flex items-center justify-between group transition-all ${
			pathname === path
				? "text-primary bg-muted/60"
				: "text-muted-foreground hover:text-primary hover:bg-muted/30"
		}`;

	const toggleTheme = () => {
		setTheme(isDark ? "light" : "dark");
	};

	const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
		const LinkComponent = ({
			to,
			label,
			disabled = false,
		}: {
			to: string;
			label: string;
			disabled?: boolean;
		}) => {
			if (disabled) {
				return (
					<span
						className={
							mobile
								? "w-full cursor-not-allowed border-border border-b px-8 py-6 font-bold text-[clamp(1rem,4vw,1.2rem)] text-muted-foreground/30 uppercase tracking-widest"
								: "-mb-px cursor-not-allowed pb-4 font-bold text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em]"
						}
					>
						{label}
					</span>
				);
			}
			return (
				<Link
					to={to}
					className={mobile ? mobileNavLinkClass(to) : navLinkClass(to)}
					onClick={() => {
						if (mobile) {
							// Small delay to ensure the router starts navigation before the sheet unmounts
							setTimeout(() => setIsMobileMenuOpen(false), 100);
						}
					}}
				>
					{label}
					{mobile && (
						<ChevronRight
							size={18}
							className="text-primary opacity-0 transition-opacity group-hover:opacity-100"
						/>
					)}
				</Link>
			);
		};

		return (
			<>
				{isPublicPage ? (
					<>
						<LinkComponent to="/" label="Story" />
						<LinkComponent to="/pricing" label="Pricing" />
						<LinkComponent to="/showcase" label="Showcase" disabled />
					</>
				) : (
					<>
						<LinkComponent to="/dashboard" label="Projects" />
						<LinkComponent to="/library" label="Assets" />
						<LinkComponent to="/team" label="Team" />
					</>
				)}
			</>
		);
	};

	return (
		<>
			<header className="sticky top-0 z-50 flex h-16 items-center justify-between border-border border-b bg-background/90 px-3 backdrop-blur-md md:h-20 md:px-6">
				{/* Left: Logo & Nav */}
				<div className="flex items-center gap-2 sm:gap-6 md:gap-12">
					<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
						<SheetTrigger asChild>
							<button className="p-2 transition-colors hover:bg-muted md:hidden">
								<Menu size={20} />
							</button>
						</SheetTrigger>
						<SheetContent
							side="left"
							className="flex w-[300px] flex-col p-0 sm:w-[400px]"
						>
							<SheetHeader className="border-border border-b p-6 text-left">
								<SheetTitle className="flex items-center gap-2 font-serif text-2xl italic tracking-tight">
									<Brush size={24} className="text-primary" />
									Storygraph
								</SheetTitle>
							</SheetHeader>
							<nav className="flex flex-1 flex-col">
								<NavLinks mobile />
								{!isPublicPage && (
									<Link
										to="/settings"
										className={mobileNavLinkClass("/settings")}
										onClick={() => setIsMobileMenuOpen(false)}
									>
										Settings
									</Link>
								)}
							</nav>
						</SheetContent>
					</Sheet>

					<Link to="/" className="group flex items-center gap-2 md:gap-3">
						<div className="flex h-10 w-10 items-center justify-center border border-border bg-card transition-transform group-hover:scale-105">
							<Brush size={24} className="text-primary" strokeWidth={1.5} />
						</div>
						<span className="hidden font-semibold font-serif text-foreground text-xl tracking-tight md:text-2xl min-[420px]:inline">
							Storygraph
						</span>
					</Link>

					<nav className="hidden h-20 items-center gap-8 pt-5 md:flex">
						<NavLinks />
					</nav>
				</div>

				{/* Right: Actions */}
				<div className="flex items-center gap-2 md:gap-4">
					{isPublicPage ? (
						<div className="flex items-center gap-3 md:gap-4">
							<button
								onClick={toggleTheme}
								className="rounded-full p-2 transition-colors hover:bg-muted"
							>
								{isDark ? <Sun size={20} /> : <Moon size={20} />}
							</button>

							<Separator
								orientation="vertical"
								className="hidden h-4 bg-border sm:block"
							/>

							<Link
								to="/auth/login"
								className="hidden font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors hover:text-primary sm:block"
							>
								Login
							</Link>
							<Link to="/auth/signup">
								<Button className="h-9 rounded-none bg-primary px-3 font-bold text-[9px] text-primary-foreground uppercase tracking-widest shadow-none transition-all hover:bg-accent sm:px-4 sm:text-[10px] md:px-6">
									Get Started
								</Button>
							</Link>
						</div>
					) : (
						<>
							{isEditorPage && (
								<div className="hidden items-center gap-4 sm:flex">
									<button className="flex items-center gap-1.5 font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors hover:text-primary">
										<Share2 size={16} strokeWidth={1.5} />
										<span>Export</span>
									</button>
									<Separator orientation="vertical" className="h-4 bg-border" />
									<Button
										variant="default"
										size="sm"
										className="h-8 rounded-none px-6 font-bold text-[10px] uppercase tracking-widest shadow-none"
									>
										Present
									</Button>
									<Separator orientation="vertical" className="h-4 bg-border" />
								</div>
							)}

							<button
								onClick={() => setIsNotificationOpen(true)}
								className="relative rounded-full p-2 transition-colors hover:bg-muted"
							>
								<Bell size={20} />
								<span className="absolute top-2 right-2 h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
							</button>

							<button
								onClick={toggleTheme}
								className="rounded-full p-2 transition-colors hover:bg-muted"
							>
								{isDark ? <Sun size={20} /> : <Moon size={20} />}
							</button>

							<Separator orientation="vertical" className="h-4 bg-border" />

							<Link
								to="/settings"
								className="flex items-center transition-opacity hover:opacity-80"
							>
								<div className="flex h-9 w-9 items-center justify-center overflow-hidden bg-primary shadow-sm ring-1 ring-border/50 md:h-10 md:w-10">
									<img
										src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julian"
										alt="Profile"
										className="h-full w-full object-cover opacity-90"
									/>
								</div>
							</Link>
						</>
					)}
				</div>
			</header>

			<NotificationPanel
				isOpen={isNotificationOpen}
				onClose={() => setIsNotificationOpen(false)}
			/>
		</>
	);
}
