import { createFileRoute, Link } from "@tanstack/react-router";
import { Film, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/404")({
	component: NotFoundPage,
});

function NotFoundPage() {
	return (
		<div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background p-6 selection:bg-primary selection:text-white">
			{/* Cinematic Backdrop */}
			<div className="absolute inset-0 z-0">
				<div className="h-full w-full bg-linear-to-br from-background via-background to-accent/5" />
				<div className="absolute inset-0 bg-[grid-black_24px] opacity-[0.02]" />
			</div>

			{/* Content */}
			<div className="fade-in slide-in-from-bottom-8 relative z-10 animate-in text-center duration-1000">
				{/* Icon */}
				<div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center border border-border bg-white/80 shadow-xl backdrop-blur">
					<Film size={48} className="text-primary/40" strokeWidth={1} />
				</div>

				{/* Error Code */}
				<div className="mb-4">
					<span className="font-bold text-[10px] text-accent uppercase tracking-[0.5em]">
						Error 404
					</span>
				</div>

				{/* Title */}
				<h1 className="mb-4 font-serif text-5xl text-primary italic md:text-7xl">
					Frame Not Found
				</h1>

				{/* Subtitle */}
				<p className="mx-auto mb-12 max-w-md font-serif text-lg text-muted-foreground italic">
					The scene you're searching for has been lost in the cutting room
					floor. Perhaps it was never rendered.
				</p>

				{/* Actions */}
				<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Link to="/dashboard">
						<Button className="h-14 rounded-none bg-primary px-10 font-bold text-[11px] text-white uppercase tracking-[0.2em] shadow-2xl transition-all hover:bg-black">
							<Home size={16} className="mr-3" />
							<span>Return to Workspace</span>
						</Button>
					</Link>
					<Link to="/">
						<Button
							variant="outline"
							className="h-14 rounded-none border-border px-10 font-bold text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-white"
						>
							View Landing Page
						</Button>
					</Link>
				</div>

				{/* Decorative line */}
				<div className="mt-16 flex items-center justify-center gap-4 text-muted-foreground/30">
					<div className="h-px w-16 bg-current" />
					<span className="font-bold text-[9px] uppercase tracking-[0.3em]">
						Lost in the void
					</span>
					<div className="h-px w-16 bg-current" />
				</div>
			</div>
		</div>
	);
}
