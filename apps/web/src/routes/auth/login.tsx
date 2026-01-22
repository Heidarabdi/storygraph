import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth/login")({
    component: () => <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-2 text-center">
            <h2 className="font-serif text-2xl italic">Welcome Back</h2>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Resume your visual journey</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
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

                <div className="group space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Cipher</label>
                        <Link to="/auth/forgot-password" title="Forgot Password" className="text-[9px] font-bold uppercase tracking-tighter text-muted-foreground hover:text-accent transition-colors">Forgot?</Link>
                    </div>
                    <div className="relative">
                        <Input
                            type="password"
                            className="rounded-none border-0 border-b border-border bg-transparent px-8 py-3 focus-visible:ring-0 focus-visible:border-primary text-sm shadow-none"
                            placeholder="••••••••"
                        />
                        <Lock size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="h-4 w-4 border border-border bg-white cursor-pointer hover:border-primary transition-colors flex items-center justify-center">
                    <div className="h-2 w-2 bg-primary scale-0 transition-transform" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground italic">Maintain Session Persistence</span>
            </div>

            <Button className="w-full h-14 rounded-none bg-primary text-white text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl hover:bg-black group transition-all">
                Authenticate
                <ChevronRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
        </form>

        <div className="text-center pt-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                First time at the studio? <Link to="/auth/signup" className="text-primary hover:underline underline-offset-4">Create Membership</Link>
            </p>
        </div>
    </div>
});
