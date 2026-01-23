import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Brush } from "lucide-react";

export const Route = createFileRoute("/auth")({
	component: AuthLayout,
});

function AuthLayout() {
	return (
		<div className="relative flex min-h-full w-full flex-col items-center justify-center overflow-y-auto bg-background p-6 selection:bg-primary selection:text-primary-foreground">
			{/* Cinematic Backdrop */}
			<div className="fixed inset-0 z-0">
				<img
					src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=2000"
					className="h-full w-full object-cover opacity-[0.03] saturate-0 dark:opacity-[0.07]"
					alt="Background"
				/>
				<div className="absolute inset-0 bg-linear-to-tr from-background via-background/80 to-transparent" />
			</div>

			{/* Content Container */}
			<div className="fade-in slide-in-from-bottom-8 relative z-10 w-full max-w-lg animate-in py-12 duration-1000">
				{/* Logo Header */}
				<span className="group mb-8 flex flex-col items-center md:mb-12">
					<div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center border border-border bg-card shadow-xl transition-transform group-hover:scale-105 md:mb-6 md:h-14 md:w-14">
						<Brush
							size={24}
							className="text-primary md:size-[28px]"
							strokeWidth={1.5}
						/>
					</div>
					<h1 className="font-serif text-2xl text-primary italic tracking-tight md:text-3xl">
						Storygraph
					</h1>
					<p className="mt-2 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.3em] md:text-[10px]">
						Visual Narrative System
					</p>
				</span>

				{/* Auth Form Container */}
				<div className="mx-2 border border-border bg-card/80 p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] backdrop-blur-2xl sm:mx-0 md:p-12">
					<Outlet />
				</div>

				{/* Footer */}
				<div className="mt-12 text-center">
					<p className="font-bold text-[9px] text-muted-foreground uppercase italic tracking-widest">
						By continuing, you agree to the Storygraph{" "}
						<button className="text-primary underline-offset-4 transition-colors hover:text-accent hover:underline">
							Terms of Service
						</button>{" "}
						and{" "}
						<button className="text-primary underline-offset-4 transition-colors hover:text-accent hover:underline">
							Privacy Policy
						</button>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
