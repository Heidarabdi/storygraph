import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Mail, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth/forgot-password")({
    component: () => <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-2 text-center">
            <h2 className="font-serif text-2xl italic">Recover Access</h2>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Restore your visual coordinate</p>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <p className="text-[11px] text-muted-foreground leading-relaxed italic text-center px-6">
                Enter your registered studio email. We will dispatch a secure recovery transmission to reset your cipher.
            </p>

            <div className="group space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Studio Email</label>
                <div className="relative">
                    <Input
                        type="email"
                        className="rounded-none border-0 border-b border-border bg-transparent px-8 py-3 focus-visible:ring-0 focus-visible:border-primary text-sm shadow-none"
                        placeholder="director@studio.com"
                    />
                    <Mail size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
            </div>

            <Button className="w-full h-14 rounded-none bg-primary text-white text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl hover:bg-black group transition-all">
                Send Recovery Transmission
                <ChevronRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
        </form>

        <div className="text-center pt-4">
            <Link to="/auth/login" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all flex items-center justify-center gap-2">
                <ArrowLeft size={14} />
                Return to Authentication
            </Link>
        </div>
    </div>
});
