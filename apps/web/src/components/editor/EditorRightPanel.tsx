import type { Id } from "@storygraph/backend/convex/_generated/dataModel";
import {
    ChevronDown,
    PanelRightClose,
    Plus,
    Search,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Asset {
    _id: Id<"assets">;
    name: string;
    type: string;
    referenceImages?: string[];
}

interface EditorRightPanelProps {
    assets: Asset[] | undefined;
    usedAssetIds?: Id<"assets">[];
    isOpen: boolean;
    onClose: () => void;
    onGenerate?: () => void;
}

export function EditorRightPanel({
    assets,
    usedAssetIds,
    isOpen,
    onClose,
    onGenerate,
}: EditorRightPanelProps) {
    if (!isOpen) return null;

    const usedAssets = assets?.filter((a) => usedAssetIds?.includes(a._id)) || [];

    return (
        <aside className="fade-in slide-in-from-right relative flex w-80 shrink-0 animate-in flex-col border-border border-l bg-card/50 backdrop-blur-md duration-300">
            {/* Header */}
            <div className="flex h-14 shrink-0 items-center justify-between border-border border-b px-4">
                <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
                    Panel
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    onClick={onClose}
                >
                    <PanelRightClose size={18} strokeWidth={1.5} />
                </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="assets" className="flex flex-1 flex-col overflow-hidden">
                <TabsList className="grid h-11 w-full grid-cols-2 rounded-none border-border border-b bg-transparent p-0">
                    <TabsTrigger
                        value="assets"
                        className="rounded-none border-transparent border-b-2 font-bold text-[10px] uppercase tracking-widest data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                        Assets
                    </TabsTrigger>
                    <TabsTrigger
                        value="settings"
                        className="rounded-none border-transparent border-b-2 font-bold text-[10px] uppercase tracking-widest data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                        Settings
                    </TabsTrigger>
                </TabsList>

                {/* Assets Tab */}
                <TabsContent value="assets" className="mt-0 flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="space-y-6 p-4">
                            {/* Search */}
                            <div className="group relative">
                                <Input
                                    className="rounded-none border-border border-b bg-transparent py-2 pl-8 text-[10px] uppercase tracking-widest placeholder:normal-case placeholder:text-muted-foreground/50 focus-visible:border-primary focus-visible:ring-0"
                                    placeholder="Search assets..."
                                />
                                <Search
                                    size={14}
                                    className="absolute top-1/2 left-0 -translate-y-1/2 text-muted-foreground"
                                />
                            </div>

                            {/* Asset Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                {assets?.map((asset) => (
                                    <div
                                        key={asset._id}
                                        className="group cursor-pointer space-y-2"
                                    >
                                        <div className="aspect-square overflow-hidden border border-border bg-muted/20 transition-all group-hover:-translate-y-0.5 group-hover:border-primary group-hover:shadow-md">
                                            <img
                                                src={
                                                    asset.referenceImages?.[0] ||
                                                    `https://api.dicebear.com/7.x/shapes/svg?seed=${asset.name}`
                                                }
                                                alt={asset.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="truncate text-center font-bold text-[9px] uppercase tracking-wider">
                                            {asset.name}
                                        </div>
                                    </div>
                                ))}

                                {/* Add New Asset Button */}
                                <button
                                    className="flex aspect-square flex-col items-center justify-center gap-1 border border-border border-dashed text-muted-foreground transition-all hover:border-primary hover:text-primary"
                                    type="button"
                                >
                                    <Plus size={18} />
                                    <span className="font-bold text-[8px] uppercase tracking-widest">
                                        Add
                                    </span>
                                </button>
                            </div>

                            {/* Used Assets */}
                            {usedAssets.length > 0 && (
                                <div className="space-y-3 border-border border-t pt-4">
                                    <span className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest">
                                        Used in Frame
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {usedAssets.map((asset) => (
                                            <span
                                                key={asset._id}
                                                className="border border-border bg-muted/30 px-2 py-1 font-bold text-[8px] uppercase tracking-wider"
                                            >
                                                {asset.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="mt-0 flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="space-y-8 p-4">
                            {/* Model Select */}
                            <div className="space-y-3">
                                <label className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest">
                                    Model
                                </label>
                                <div className="group relative">
                                    <select className="w-full cursor-pointer appearance-none rounded-none border-border border-b bg-transparent py-2 font-bold text-[10px] uppercase tracking-widest outline-none focus:border-primary">
                                        <option className="bg-card">Flux.1 Ultra</option>
                                        <option className="bg-card">SDXL Cinematic</option>
                                        <option className="bg-card">Stable Diffusion 3</option>
                                    </select>
                                    <ChevronDown
                                        size={14}
                                        className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-muted-foreground"
                                    />
                                </div>
                            </div>

                            {/* Consistency Slider */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest">
                                        Consistency
                                    </label>
                                    <span className="font-mono text-[10px] text-accent">92%</span>
                                </div>
                                <Slider
                                    defaultValue={[92]}
                                    max={100}
                                    step={1}
                                    className="**:[[role=slider]]:h-3 **:[[role=slider]]:w-3 **:[[role=slider]]:border-none **:[[role=slider]]:bg-accent"
                                />
                            </div>

                            {/* Creativity Slider */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest">
                                        Creativity
                                    </label>
                                    <span className="font-mono text-[10px] text-accent">0.45</span>
                                </div>
                                <Slider
                                    defaultValue={[45]}
                                    max={100}
                                    step={1}
                                    className="**:[[role=slider]]:h-3 **:[[role=slider]]:w-3 **:[[role=slider]]:border-none **:[[role=slider]]:bg-accent"
                                />
                            </div>
                        </div>
                    </ScrollArea>
                </TabsContent>
            </Tabs>

            {/* Generate Button - Fixed at bottom */}
            <div className="shrink-0 border-border border-t bg-card p-4">
                <Button
                    onClick={onGenerate}
                    className="h-12 w-full rounded-none bg-primary font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-accent"
                >
                    <Zap size={16} className="mr-2" />
                    Generate
                </Button>
                <p className="mt-2 text-center font-bold text-[8px] text-muted-foreground/60 uppercase tracking-wider">
                    ~4 seconds
                </p>
            </div>
        </aside>
    );
}
