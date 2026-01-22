import { createFileRoute } from "@tanstack/react-router";
import {
    User,
    Cpu,
    Sliders,
    ShieldCheck,
    Save,
    ExternalLink,
    Camera,
    Eye,
    Globe,
    Type,
    Palette,
    Moon,
    Laptop,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/settings")({
    component: SettingsPage,
});

function SettingsPage() {
    const [activeSection, setActiveSection] = useState("profile");

    const navItems = [
        { id: "profile", label: "Identity", icon: User },
        { id: "ai", label: "AI Engines", icon: Cpu },
        { id: "workspace", label: "Workspace", icon: Sliders },
        { id: "security", label: "Security", icon: ShieldCheck },
    ];

    return (
        <div className="flex h-full overflow-hidden bg-background">
            {/* Navigation Sidebar */}
            <aside className="w-72 border-r border-border bg-white/40 backdrop-blur-md shrink-0">
                <div className="p-10 space-y-12">
                    <div className="space-y-6">
                        <h1 className="font-serif text-3xl italic text-primary">Settings</h1>
                        <nav className="space-y-4">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`flex w-full items-center gap-4 py-1 transition-all group ${activeSection === item.id ? "text-primary" : "text-muted-foreground hover:text-primary"
                                            }`}
                                    >
                                        <div className={`h-1.5 w-1.5 rounded-full transition-all ${activeSection === item.id ? "bg-accent scale-100" : "bg-transparent scale-0"}`} />
                                        <Icon size={14} className={activeSection === item.id ? "text-accent" : "text-muted-foreground/40 group-hover:text-primary"} />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="pt-12 border-t border-border/50">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground leading-relaxed">
                            Storygraph v1.4.2<br />
                            Enterprise License // Thorne Studios
                        </p>
                    </div>
                </div>
            </aside>

            {/* Settings Content */}
            <ScrollArea className="flex-1 bg-background/50">
                <div className="mx-auto max-w-3xl px-12 py-10 pb-40">
                    {/* Identity Section */}
                    {activeSection === "profile" && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <section className="space-y-10">
                                <div className="flex items-center gap-10">
                                    <div className="relative group cursor-pointer">
                                        <div className="h-28 w-28 overflow-hidden bg-primary ring-1 ring-border">
                                            <img
                                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julian"
                                                alt="Profile"
                                                className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-75"
                                            />
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                            <Camera size={20} className="text-white" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="font-serif text-3xl">Julian Thorne</h2>
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground italic">Lead Creative Director • London, UK</p>
                                    </div>
                                </div>

                                <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
                                    <div className="space-y-3 group">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Legal Name</Label>
                                        <Input className="rounded-none border-0 border-b border-border bg-transparent px-0 py-3 focus-visible:ring-0 focus-visible:border-primary text-sm shadow-none" defaultValue="Julian Thorne" />
                                    </div>
                                    <div className="space-y-3 group">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Professional Email</Label>
                                        <Input className="rounded-none border-0 border-b border-border bg-transparent px-0 py-3 focus-visible:ring-0 focus-visible:border-primary text-sm shadow-none" defaultValue="julian.thorne@canvas.studio" />
                                    </div>
                                    <div className="space-y-3 group col-span-2">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Studio Handle</Label>
                                        <div className="flex items-center gap-3 border-b border-border group-focus-within:border-primary">
                                            <span className="text-[11px] font-bold text-muted-foreground italic">storygraph.app/</span>
                                            <Input className="rounded-none border-0 bg-transparent px-0 py-3 focus-visible:ring-0 text-sm shadow-none" defaultValue="jthorne" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <Separator className="bg-border/50" />

                            <section className="space-y-10">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Creative Biography</h3>
                                <textarea
                                    className="w-full min-h-[160px] resize-none border-0 border-b border-border bg-transparent py-2 font-serif text-xl italic leading-relaxed text-primary outline-none focus:border-primary placeholder:text-muted-foreground/30 transition-all"
                                    placeholder="Tell your story..."
                                    defaultValue="Visual storyteller and storyboard artist focused on the intersection of mythology and high-tech futurism. Directing the collective at zenith labs."
                                />
                            </section>
                        </div>
                    )}

                    {/* AI Engines Section */}
                    {activeSection === "ai" && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <section className="space-y-10">
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Synthesis Protocol</h3>
                                    <h2 className="font-serif text-3xl">Intelligence Layer</h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed italic max-w-xl">Configure the generative models that power your vision. These keys are used exclusively for your rendering sessions.</p>
                                </div>

                                <div className="space-y-8">
                                    <div className="group space-y-6 border border-border p-10 transition-all hover:shadow-2xl hover:bg-white bg-white/50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-6">
                                                <div className="flex h-14 w-14 items-center justify-center border border-border bg-white shadow-sm">
                                                    <Cpu size={24} className="text-primary" strokeWidth={1.5} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Fal.ai Infrastructure</h4>
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest italic font-serif opacity-60">Stable Diffusion XL / Flux.1 Dev</p>
                                                </div>
                                            </div>
                                            <Badge className="rounded-none bg-accent/10 border-accent/20 text-accent font-bold text-[8px] uppercase px-3 py-1 italic tracking-widest animate-pulse">Connected</Badge>
                                        </div>
                                        <div className="space-y-4 pt-6 border-t border-border/50">
                                            <Label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">API Credential</Label>
                                            <div className="relative group/input">
                                                <Input type="password" className="rounded-none border-0 border-b border-border bg-transparent px-0 py-3 focus-visible:ring-0 focus-visible:border-primary text-xs font-mono tracking-widest shadow-none" defaultValue="sk-fal-••••••••••••••••••••••••" />
                                                <Eye size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group space-y-6 border border-border p-10 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100 bg-white/30">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-6">
                                                <div className="flex h-14 w-14 items-center justify-center border border-border bg-gray-50">
                                                    <Globe size={24} className="text-muted-foreground" strokeWidth={1.5} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Anthropic Integration</h4>
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest italic font-serif">Claude 3.5 Opus / Sonnet</p>
                                                </div>
                                            </div>
                                            <Badge className="rounded-none bg-gray-100 border-border text-muted-foreground font-bold text-[8px] uppercase px-3 py-1">Disabled</Badge>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* Workspace Section */}
                    {activeSection === "workspace" && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <section className="space-y-12">
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Environment</h3>
                                    <h2 className="font-serif text-3xl">Studio Interface</h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed italic max-w-xl">Customize your visual workspace aesthetics and default rendering behaviors.</p>
                                </div>

                                <div className="grid gap-12">
                                    <div className="space-y-6">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-3">
                                            <Palette size={14} className="text-accent" />
                                            Interface Motif
                                        </Label>
                                        <div className="grid grid-cols-3 gap-6">
                                            <button className="flex flex-col items-center gap-4 group">
                                                <div className="aspect-[1.6] w-full border-2 border-primary bg-white ring-4 ring-primary/5 transition-all p-2">
                                                    <div className="h-full w-full bg-gray-50 flex items-center justify-center">
                                                        <Laptop size={20} className="text-primary/20" />
                                                    </div>
                                                </div>
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-primary">Ivory Light</span>
                                            </button>
                                            <button className="flex flex-col items-center gap-4 group opacity-40 hover:opacity-100 transition-opacity">
                                                <div className="aspect-[1.6] w-full border border-border bg-neutral-900 p-2">
                                                    <div className="h-full w-full bg-neutral-800 flex items-center justify-center">
                                                        <Moon size={20} className="text-white/20" />
                                                    </div>
                                                </div>
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Obsidian Dark</span>
                                            </button>
                                            <button className="flex flex-col items-center gap-4 group opacity-40 hover:opacity-100 transition-opacity">
                                                <div className="aspect-[1.6] w-full border border-border bg-neutral-800 p-2">
                                                    <div className="h-full w-full bg-neutral-700 flex items-center justify-center">
                                                        <Globe size={20} className="text-white/20" />
                                                    </div>
                                                </div>
                                                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Studio Graphite</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-3">
                                            <Type size={14} className="text-accent" />
                                            Typography System
                                        </Label>
                                        <div className="border border-border p-8 bg-white/50 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] font-bold uppercase tracking-widest">Editor Font</span>
                                                <select className="bg-transparent text-[11px] font-bold uppercase tracking-widest outline-none cursor-pointer">
                                                    <option>Petrona (Serif)</option>
                                                    <option>Inter (Sans)</option>
                                                    <option>JetBrains Mono</option>
                                                </select>
                                            </div>
                                            <Separator className="bg-border/30" />
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] font-bold uppercase tracking-widest">Base Size</span>
                                                <span className="text-[11px] font-mono font-bold italic">14PX</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* Security Section */}
                    {activeSection === "security" && (
                        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <section className="space-y-12">
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Vault</h3>
                                    <h2 className="font-serif text-3xl">Access Security</h2>
                                    <p className="text-sm text-muted-foreground leading-relaxed italic max-w-xl">Enforce studio-grade protection for your visual narratives and proprietary assets.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="group border border-border p-10 bg-white hover:shadow-xl transition-all space-y-10">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Multi-Factor Authentication</h4>
                                                <p className="text-[10px] text-muted-foreground italic font-serif opacity-60">Authorize logins via Authenticator or Passkey</p>
                                            </div>
                                            <button className="text-[9px] font-bold uppercase tracking-[0.3em] bg-primary text-white px-6 py-2 shadow-sm hover:bg-black transition-colors">Enable MFA</button>
                                        </div>

                                        <Separator className="bg-border/50" />

                                        <div className="space-y-6">
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-60">Active Studio Sessions</h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                                        <div className="text-[11px]">
                                                            <span className="font-bold uppercase tracking-widest">MacBook Pro M3</span>
                                                            <span className="mx-2 text-muted-foreground italic">• London, UK</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-primary/30 italic">Current Session</span>
                                                </div>
                                                <div className="flex items-center justify-between opacity-50">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-2 w-2 rounded-full bg-gray-300" />
                                                        <div className="text-[11px]">
                                                            <span className="font-bold uppercase tracking-widest">iPad Pro (Studio)</span>
                                                            <span className="mx-2 text-muted-foreground italic">• Paris, FR</span>
                                                        </div>
                                                    </div>
                                                    <button className="text-[9px] font-bold uppercase underline tracking-widest hover:text-red-600 transition-colors">Terminate</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center pt-8">
                                        <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-600 hover:underline underline-offset-8 transition-all italic">
                                            Deactivate Collective Account
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* Bottom Action Bar */}
                    <div className="fixed bottom-0 right-0 w-[calc(100%-18rem)] border-t border-border bg-white/95 backdrop-blur-md px-12 py-6 flex items-center justify-between z-10">
                        <div className="flex items-center gap-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground italic">Syncing with Storygraph Cloud...</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <button className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
                                <ExternalLink size={14} className="opacity-50" />
                                View Public Profile
                            </button>
                            <Button className="h-12 rounded-none bg-primary text-white text-[10px] font-bold uppercase tracking-[0.4em] px-12 shadow-2xl hover:bg-black transition-all">
                                <Save size={16} className="mr-3" />
                                Save Workspace
                            </Button>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span className={`inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
            {children}
        </span>
    );
}
