import { createFileRoute } from "@tanstack/react-router";
import {
    ChevronDown,
    PanelLeftClose,
    PanelLeftOpen,
    PanelRightClose,
    PanelRightOpen,
    Play,
    Plus,
    RotateCcw,
    Search,
    Sparkles,
    X,
    Zap,
    Download,
    Eye,
    History,
    Settings2,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export const Route = createFileRoute("/editor")({
    component: EditorPage,
});

// Mock data
const mockCharacters = [
    { id: "1", name: "Kaelen", emotions: ["Neutral", "Intensity", "Despair", "Triumph"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kaelen" },
    { id: "2", name: "Lyra-RX", emotions: ["Standard", "Protocol", "Error"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lyra" },
    { id: "3", name: "The Shaman", emotions: ["Mystic", "Awakened"], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shaman" },
];

const mockFrames = [
    { id: "1", index: "01", type: "Establishing", thumb: "https://images.unsplash.com/photo-1514565131-bce0801e5787" },
    { id: "2", index: "02", type: "Medium Shot", thumb: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4" },
    { id: "3", index: "03", type: "Extreme Close-up", thumb: "https://images.unsplash.com/photo-1478720568477-152d9b164e26" },
];

function EditorPage() {
    const [leftPanelOpen, setLeftPanelOpen] = useState(true);
    const [rightPanelOpen, setRightPanelOpen] = useState(true);
    const [activeFrame, setActiveFrame] = useState("1");

    return (
        <TooltipProvider>
            <div className="flex h-full flex-col overflow-hidden bg-background">
                {/* Master Toolbar */}
                <div className="flex h-12 items-center justify-between border-b border-border bg-white px-6 shrink-0 z-50">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 pr-6 border-r border-border">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">SC_01 // Neon Protocol</span>
                            <Badge className="bg-accent/10 border-accent/20 text-accent italic">Scene 01 ACTIVE</Badge>
                        </div>
                        <div className="flex items-center gap-1">
                            {['Draft', 'Refine', 'Finalize'].map((step) => (
                                <button key={step} className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-colors ${step === 'Refine' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                                    {step}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground italic">Auto-Syncing DNA...</span>
                        <div className="h-6 w-px bg-border mx-2" />
                        <button className="text-muted-foreground hover:text-primary transition-colors">
                            <History size={16} strokeWidth={1.5} />
                        </button>
                        <button className="text-muted-foreground hover:text-primary transition-colors">
                            <Download size={16} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

                <main className="relative flex flex-1 overflow-hidden">
                    {/* Left Sidebar - Library */}
                    {leftPanelOpen && (
                        <aside className="relative flex w-80 flex-col border-r border-border bg-white/40 backdrop-blur-md shrink-0 animate-in fade-in slide-in-from-left duration-500">
                            <div className="flex h-14 items-center justify-between border-b border-border px-6">
                                <h3 className="font-serif text-lg italic text-primary">Director's Library</h3>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => setLeftPanelOpen(false)}>
                                    <PanelLeftClose size={18} strokeWidth={1.5} />
                                </Button>
                            </div>

                            <Tabs defaultValue="characters" className="flex flex-1 flex-col overflow-hidden">
                                <div className="border-b border-border">
                                    <TabsList className="flex h-12 w-full justify-start rounded-none bg-transparent p-0">
                                        {['Characters', 'Environment', 'Props'].map((tab) => (
                                            <TabsTrigger
                                                key={tab}
                                                value={tab.toLowerCase()}
                                                className="relative flex-1 rounded-none border-b-2 border-transparent px-2 text-[10px] font-bold uppercase tracking-[0.2em] data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary text-muted-foreground transition-all shadow-none"
                                            >
                                                {tab}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                </div>

                                <ScrollArea className="flex-1 p-6">
                                    <TabsContent value="characters" className="m-0 space-y-8">
                                        <div className="relative group">
                                            <Input
                                                className="rounded-none border-b border-border bg-transparent pl-8 py-3 text-[10px] uppercase tracking-widest focus-visible:ring-0 focus-visible:border-primary placeholder:italic placeholder:font-serif shadow-none"
                                                placeholder="search cast..."
                                            />
                                            <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            {mockCharacters.map((char) => (
                                                <div key={char.id} className="group cursor-pointer space-y-3">
                                                    <div className="aspect-square overflow-hidden border border-border bg-white p-1 transition-all group-hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.1)] group-hover:-translate-y-1">
                                                        <div className="h-full w-full bg-gray-50 flex items-center justify-center overflow-hidden">
                                                            <img
                                                                src={char.image}
                                                                alt={char.name}
                                                                className="h-full w-full object-cover saturate-50 group-hover:saturate-100 transition-all duration-700"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{char.name}</p>
                                                        <p className="text-[8px] font-serif italic text-muted-foreground tracking-tighter uppercase">{char.emotions[0]} state</p>
                                                    </div>
                                                </div>
                                            ))}
                                            <button className="aspect-square border border-dashed border-border flex flex-col items-center justify-center gap-2 hover:bg-white transition-all text-muted-foreground hover:text-primary">
                                                <Plus size={20} />
                                                <span className="text-[9px] font-bold uppercase tracking-widest">New Actor</span>
                                            </button>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="environment" className="m-0">
                                        <p className="text-[10px] italic text-muted-foreground font-serif p-4 text-center">Select active visual domain...</p>
                                    </TabsContent>
                                </ScrollArea>
                            </Tabs>
                        </aside>
                    )}

                    {/* Center Content - Canvas Area */}
                    <div className="flex flex-1 flex-col items-center overflow-y-auto px-10 py-16 scrollbar-none bg-background/30">
                        <div className="w-full max-w-5xl space-y-12">
                            {/* Active Frame Display */}
                            <div className="relative group">
                                {!leftPanelOpen && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                className="absolute -left-16 top-0 p-2 text-muted-foreground hover:text-primary transition-colors bg-white border border-border"
                                                onClick={() => setLeftPanelOpen(true)}
                                            >
                                                <PanelLeftOpen size={18} strokeWidth={1.5} />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">Open Library</TooltipContent>
                                    </Tooltip>
                                )}

                                <div className="absolute -top-8 left-0 flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                                        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">Frame // 0X12-04</span>
                                    </div>
                                    <div className="h-px w-12 bg-border" />
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground italic">2.39:1 Anamorphic</span>
                                </div>

                                <div className="border border-border p-1.5 bg-white shadow-sm transition-all duration-700 hover:shadow-2xl hover:-translate-y-1">
                                    <div className="aspect-[2.39/1] relative overflow-hidden bg-gray-50 border border-border/50 group/img">
                                        <img
                                            src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1200"
                                            alt="Current frame"
                                            className="h-full w-full object-cover saturate-[0.85] transition-transform duration-2000 group-hover/img:scale-105"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px]">
                                            <div className="flex gap-4 scale-95 group-hover:scale-100 transition-transform">
                                                <Button className="h-12 rounded-none bg-white text-primary font-bold uppercase tracking-widest text-[10px] px-8 shadow-2xl hover:bg-accent hover:text-white">
                                                    <Eye size={14} className="mr-2" /> Inspect DNA
                                                </Button>
                                                <Button variant="outline" className="h-12 rounded-none border-white/20 bg-white/10 text-white backdrop-blur-md px-8 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-primary border">
                                                    Source Image
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -right-16 top-0 flex flex-col gap-3">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button className="flex h-12 w-12 items-center justify-center border border-border bg-white text-primary transition-all hover:text-accent hover:shadow-lg shadow-sm">
                                                <RotateCcw size={18} strokeWidth={1.5} />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="left">Regenerate Seed</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button className="flex h-12 w-12 items-center justify-center border border-border bg-white text-primary transition-all hover:text-accent hover:shadow-lg shadow-sm">
                                                <Sparkles size={18} strokeWidth={1.5} />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="left">Enhance Quality</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button className="flex h-12 w-12 items-center justify-center border border-border bg-white text-primary transition-all hover:text-red-600 hover:shadow-lg shadow-sm">
                                                <X size={18} strokeWidth={1.5} />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="left">Purge Frame</TooltipContent>
                                    </Tooltip>
                                </div>
                            </div>

                            {/* Narrative Controls */}
                            <div className="mx-auto w-full max-w-4xl grid grid-cols-12 gap-12 pt-6">
                                <div className="col-span-8 flex flex-col gap-10">
                                    <div className="group space-y-4">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground group-focus-within:text-primary transition-colors flex items-center gap-3">
                                            <Zap size={14} className="text-accent" />
                                            Frame Intent // Synthesis instructions
                                        </label>
                                        <textarea
                                            className="h-32 w-full resize-none border-b-2 border-border bg-transparent py-4 text-2xl italic leading-relaxed text-primary outline-none focus:border-primary placeholder:text-muted-foreground/20 transition-all font-serif"
                                            placeholder="Direct the scene's emotional weight, lighting hierarchy, and cinematic beats..."
                                            defaultValue="Kaelen stands amidst the neon sprawl, the rain reflecting high-contrast magenta and cobalt across his obsidian collar. High-angle cinematic wide shot."
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-10">
                                        <div className="group space-y-3">
                                            <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Vocal Beat // Dialogue</label>
                                            <Input className="rounded-none border-0 border-b border-border bg-transparent px-0 py-4 text-lg font-serif italic focus-visible:ring-0 focus-visible:border-primary text-primary/80 shadow-none" defaultValue='"The protocol was never meant for survival."' />
                                        </div>
                                        <div className="group space-y-3">
                                            <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Technical Spec // Camera</label>
                                            <Input className="rounded-none border-0 border-b border-border bg-transparent px-0 py-4 text-[10px] font-bold uppercase tracking-[0.2em] focus-visible:ring-0 focus-visible:border-primary text-accent shadow-none" defaultValue="35MM ANAMORPHIC // F2.8 // RAIN FX" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-4 border-l border-border pl-12 space-y-10">
                                    <div className="space-y-6">
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary/40 italic">Active DNA Manifest</h4>
                                        <div className="space-y-4">
                                            {['Kaelen (Major)', 'Neo Tokyo (Major)', 'Obsidian Gear (Minor)'].map((asset) => (
                                                <div key={asset} className="flex items-center justify-between group cursor-help">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70 group-hover:text-accent transition-colors">{asset}</span>
                                                    <Badge className="bg-gray-50 border-border text-[8px] opacity-40">PINNED</Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-border/50">
                                        <p className="text-[9px] leading-tight text-muted-foreground italic font-serif">
                                            Assets are automatically referenced by the visual engine for consistent continuity across frames.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Properties */}
                    {rightPanelOpen && (
                        <aside className="relative flex w-80 flex-col border-l border-border bg-white/50 backdrop-blur-md shrink-0 animate-in fade-in slide-in-from-right duration-500">
                            <div className="flex h-14 items-center justify-between border-b border-border px-6">
                                <h3 className="font-serif text-lg italic text-primary">Synthesis Specs</h3>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => setRightPanelOpen(false)}>
                                    <PanelRightClose size={18} strokeWidth={1.5} />
                                </Button>
                            </div>

                            <ScrollArea className="flex-1 px-8 py-10">
                                <div className="space-y-12">
                                    <div className="space-y-6">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground flex items-center justify-between w-full">
                                            Visual Engine
                                            <Settings2 size={12} className="opacity-20" />
                                        </label>
                                        <div className="relative group">
                                            <select className="w-full appearance-none rounded-none border-b-2 border-border bg-transparent py-3 px-1 text-[11px] font-bold uppercase tracking-widest text-primary focus:border-primary outline-none cursor-pointer transition-colors shadow-none">
                                                <option>Flux.1 Ultra Render</option>
                                                <option>SDXL Cinematic v4</option>
                                                <option>Aether Fine-Tune v2</option>
                                            </select>
                                            <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground group-focus-within:text-primary" />
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Style Profile</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { name: 'Noir 35', color: 'bg-neutral-900' },
                                                { name: 'Velvia 50', color: 'bg-blue-900' },
                                                { name: 'Matte Paint', color: 'bg-amber-100' },
                                                { name: 'Digital', color: 'bg-emerald-500' }
                                            ].map((style) => (
                                                <button key={style.name} className="flex flex-col items-center gap-3 group">
                                                    <div className={`aspect-video w-full border border-border group-hover:border-accent p-1 transition-all group-hover:shadow-lg bg-white`}>
                                                        <div className={`h-full w-full ${style.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                                                    </div>
                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary">{style.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-10 pt-6 border-t border-border/50">
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">DNA Consistency</label>
                                                <span className="text-[10px] font-mono font-bold text-accent">92%</span>
                                            </div>
                                            <Slider defaultValue={[92]} max={100} step={1} className="**:[[role=slider]]:h-3 **:[[role=slider]]:w-3 **:[[role=slider]]:bg-accent **:[[role=slider]]:border-none" />
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Creative Variance</label>
                                                <span className="text-[10px] font-mono font-bold text-accent">0.45</span>
                                            </div>
                                            <Slider defaultValue={[45]} max={100} step={1} className="**:[[role=slider]]:h-3 **:[[role=slider]]:w-3 **:[[role=slider]]:bg-accent **:[[role=slider]]:border-none" />
                                        </div>
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Render Iteration</label>
                                                <span className="text-[10px] font-mono font-bold text-accent">50</span>
                                            </div>
                                            <Slider defaultValue={[50]} max={100} step={1} className="**:[[role=slider]]:h-3 **:[[role=slider]]:w-3 **:[[role=slider]]:bg-accent **:[[role=slider]]:border-none" />
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>

                            <div className="p-8 border-t border-border bg-white shadow-2xl space-y-4">
                                <Button className="w-full h-14 rounded-none bg-primary text-white text-[11px] font-bold uppercase tracking-[0.3em] shadow-2xl hover:bg-black group transition-all">
                                    <Zap size={18} className="mr-3 group-hover:scale-125 transition-transform" />
                                    Synthesize Frame
                                </Button>
                                <div className="flex justify-center flex-col items-center gap-2">
                                    <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Estimated Synthesis: 4.2s</span>
                                    <button className="text-[9px] font-bold tracking-widest text-primary/40 hover:text-primary transition-colors underline underline-offset-4 decoration-accent/30 lowercase italic">
                                        Save Configuration Profile
                                    </button>
                                </div>
                            </div>
                        </aside>
                    )}
                </main>

                {/* Timeline Master Bar */}
                <footer className="h-44 border-t border-border bg-white backdrop-blur-md flex items-center px-10 gap-10 shrink-0 z-50 shadow-[0_-16px_48px_rgba(0,0,0,0.03)]">
                    <div className="flex flex-1 items-center gap-8 overflow-x-auto no-scrollbar py-6 min-w-0">
                        <div className="h-full border-r border-border pr-8 flex flex-col justify-center gap-1 shrink-0">
                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-primary italic">Scene 01</h5>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">Neon Protocol</p>
                        </div>

                        {mockFrames.map((frame) => (
                            <div
                                key={frame.id}
                                onClick={() => setActiveFrame(frame.id)}
                                className={`relative h-full aspect-[2.39/1] border shrink-0 cursor-pointer transition-all duration-500 overflow-hidden group/f ${activeFrame === frame.id ? 'border-accent p-0.5 ring-4 ring-accent/5' : 'border-border grayscale opacity-50 hover:grayscale-0 hover:opacity-100'
                                    }`}
                            >
                                <div className="h-full w-full bg-gray-50 overflow-hidden relative">
                                    <img src={frame.thumb + "?auto=format&fit=crop&q=80&w=400"} className="h-full w-full object-cover" />
                                    <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm p-1.5 translate-y-full group-hover/f:translate-y-0 transition-transform">
                                        <p className="text-[7px] font-bold uppercase tracking-widest text-white text-center">{frame.type}</p>
                                    </div>
                                </div>
                                <div className={`absolute top-0 left-0 text-[8px] px-2 py-0.5 font-bold italic ${activeFrame === frame.id ? 'bg-accent text-white' : 'bg-primary/20 text-primary'}`}>
                                    {frame.index}
                                </div>
                            </div>
                        ))}

                        <button className="h-full aspect-[2.39/1] border border-dashed border-border flex flex-col items-center justify-center text-muted-foreground hover:bg-gray-50 hover:text-primary transition-all shrink-0 gap-2">
                            <Plus size={20} />
                            <span className="text-[9px] font-bold uppercase tracking-widest italic leading-none">Append Frame</span>
                        </button>
                    </div>

                    <div className="h-16 w-px bg-border opacity-50" />

                    <div className="flex items-center gap-10 shrink-0">
                        <div className="text-right flex flex-col items-end gap-1">
                            <span className="text-[9px] font-bold uppercase text-muted-foreground/40 tracking-[0.3em] flex items-center gap-2">
                                <Play size={10} className="fill-muted-foreground" />
                                Runtime Duration
                            </span>
                            <span className="text-2xl font-serif font-bold text-primary italic leading-none">00:12:<span className="text-accent">04</span></span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button className="h-14 px-12 rounded-none bg-primary text-white text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl hover:bg-black transition-all">
                                Compile Storyboard
                            </Button>
                            {!rightPanelOpen && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            className="h-14 w-14 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors border border-border bg-white"
                                            onClick={() => setRightPanelOpen(true)}
                                        >
                                            <PanelRightOpen size={20} strokeWidth={1.5} />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="left">Synthesizer Props</TooltipContent>
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </footer>
            </div>
        </TooltipProvider>
    );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span className={`inline-flex items-center border px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
            {children}
        </span>
    );
}
