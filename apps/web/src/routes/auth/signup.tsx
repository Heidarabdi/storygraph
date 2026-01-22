import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Mail, Lock, User, Briefcase } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth/signup")({
    component: () => <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-2 text-center">
            <h2 className="font-serif text-2xl italic">Initialize Membership</h2>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Join the elite visual collective</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-5">
                <div className="grid grid-cols-2 gap-6">
                    <div className="group space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">First Descriptor</label>
                        <div className="relative">
                            <Input
                                className="rounded-none border-0 border-b border-border bg-transparent px-8 py-3 focus-visible:ring-0 focus-visible:border-primary text-sm shadow-none"
                                placeholder="Julian"
                            />
                            <User size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        </div>
                    </div>
                    <div className="group space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Surname</label>
                        <Input
                            className="rounded-none border-0 border-b border-border bg-transparent px-0 py-3 focus-visible:ring-0 focus-visible:border-primary text-sm shadow-none"
                            placeholder="Thorne"
                        />
                    </div>
                </div>

                <div className="group space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Studio Email</label>
                    <div className="relative">
                        <Input
                            type="email"
                            className="rounded-none border-0 border-b border-border bg-transparent px-8 py-3 focus-visible:ring-0 focus-visible:border-primary text-sm shadow-none"
                            placeholder="director@zenith.fm"
                        />
                        <Mail size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    </div>
                </div>

                <div className="group space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Select Persona</label>
                    <div className="relative">
                        <select className="w-full appearance-none rounded-none border-0 border-b border-border bg-transparent px-8 py-3 text-[11px] font-bold uppercase tracking-widest text-primary focus:border-primary outline-none transition-colors">
                            <option>Visual Director</option>
                            <option>Storyboard Artist</option>
                            <option>Creative Executive</option>
                            <option>Independent Creator</option>
                        </select>
                        <Briefcase size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    </div>
                </div>

                <div className="group space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Secure Cipher</label>
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

            <Button className="w-full h-14 rounded-none bg-primary text-white text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl hover:bg-black group transition-all">
                Create Membership
                <ChevronRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
        </form>

        <div className="text-center pt-4 border-t border-border/50">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground italic">
                Already part of the collective? <Link to="/auth/login" className="text-primary hover:underline underline-offset-4">Authenticate</Link>
            </p>
        </div>
    </div>
});
