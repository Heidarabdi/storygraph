import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Brush } from "lucide-react";

export const Route = createFileRoute("/auth")({
    component: AuthLayout,
});

function AuthLayout() {
    return (
        <div className="relative min-h-full w-full flex flex-col items-center justify-center p-6 bg-background selection:bg-primary selection:text-white overflow-y-auto">
            {/* Cinematic Backdrop */}
            <div className="fixed inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=2000"
                    className="h-full w-full object-cover opacity-10 saturate-0"
                    alt="Background"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-background via-background/80 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-lg py-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {/* Logo Header */}
                <Link to="/" className="flex flex-col items-center mb-12 group">
                    <div className="flex h-14 w-14 items-center justify-center border border-border bg-white shadow-xl mb-6 transition-transform group-hover:scale-105">
                        <Brush size={28} className="text-primary" strokeWidth={1.5} />
                    </div>
                    <h1 className="font-serif text-3xl italic tracking-tight text-primary">Storygraph</h1>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mt-2">Visual Narrative System</p>
                </Link>

                {/* Auth Form Container */}
                <div className="border border-border bg-white/80 backdrop-blur-2xl p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                    <Outlet />
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground italic">
                        By continuing, you agree to the Storygraph <button className="text-primary hover:underline">Terms of Service</button> and <button className="text-primary hover:underline">Privacy Policy</button>.
                    </p>
                </div>
            </div>
        </div>
    );
}
