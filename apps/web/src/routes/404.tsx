import { createFileRoute, Link } from "@tanstack/react-router";
import { Film, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/404")({
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-background selection:bg-primary selection:text-white overflow-hidden">
      {/* Cinematic Backdrop */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-linear-to-br from-background via-background to-accent/5" />
        <div className="absolute inset-0 opacity-[0.02] bg-[grid-black_24px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Icon */}
        <div className="flex h-24 w-24 items-center justify-center border border-border bg-white/80 backdrop-blur shadow-xl mx-auto mb-8">
          <Film size={48} className="text-primary/40" strokeWidth={1} />
        </div>

        {/* Error Code */}
        <div className="mb-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">Error 404</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-5xl italic text-primary mb-4 md:text-7xl">
          Frame Not Found
        </h1>

        {/* Subtitle */}
        <p className="font-serif text-lg italic text-muted-foreground mb-12 max-w-md mx-auto">
          The scene you're searching for has been lost in the cutting room floor. Perhaps it was never rendered.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard">
            <Button className="h-14 rounded-none bg-primary px-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-2xl transition-all hover:bg-black">
              <Home size={16} className="mr-3" />
              <span>Return to Workspace</span>
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="h-14 rounded-none border-border px-10 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-white">
              View Landing Page
            </Button>
          </Link>
        </div>

        {/* Decorative line */}
        <div className="mt-16 flex items-center justify-center gap-4 text-muted-foreground/30">
          <div className="h-px w-16 bg-current" />
          <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Lost in the void</span>
          <div className="h-px w-16 bg-current" />
        </div>
      </div>
    </div>
  );
}
