import { createFileRoute } from "@tanstack/react-router";
import {
  Grid,
  List,
  Plus,
  Search,
  MoreVertical,
  Filter,
  Download,
  Share2,
  Trash2,
  Lock,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/library")({
  component: AssetLibraryPage,
});

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center border px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  );
}

// Skeleton Components
function AssetCardSkeleton() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="border border-border bg-white p-2">
        <Skeleton className="aspect-square w-full bg-muted" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4 bg-muted" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-16 bg-muted" />
          <Skeleton className="h-3 w-12 bg-muted" />
        </div>
      </div>
    </div>
  );
}

function ListRowSkeleton() {
  return (
    <div className="grid grid-cols-12 items-center gap-6 bg-white p-6">
      <div className="col-span-1">
        <Skeleton className="aspect-square w-14 bg-muted" />
      </div>
      <div className="col-span-4 space-y-2">
        <Skeleton className="h-4 w-3/4 bg-muted" />
        <Skeleton className="h-3 w-1/2 bg-muted" />
      </div>
      <div className="col-span-2">
        <Skeleton className="h-4 w-16 bg-muted" />
      </div>
      <div className="col-span-3 flex gap-2">
        <Skeleton className="h-3 w-12 bg-muted" />
        <Skeleton className="h-3 w-10 bg-muted" />
      </div>
      <div className="col-span-2 space-y-1 text-right">
        <Skeleton className="h-3 w-20 bg-muted ml-auto" />
        <Skeleton className="h-4 w-16 bg-muted ml-auto" />
      </div>
    </div>
  );
}

// Mock data
const mockAssets = [
  { id: "1", name: "Aether Protagonist", type: "Character", tags: ["Lead", "High-Poly"], lastUsed: "2h ago", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aether" },
  { id: "2", name: "Neo-Tokyo Skyline", type: "Environment", tags: ["Exterior", "Matte"], lastUsed: "5d ago", image: "https://images.unsplash.com/photo-1514565131-bce0801e5787?auto=format&fit=crop&q=80&w=400" },
  { id: "3", name: "Gravity Blade", type: "Prop", tags: ["Energy", "Equip"], lastUsed: "1w ago", image: "https://images.unsplash.com/photo-1590483734724-33299c85536e?auto=format&fit=crop&q=80&w=400" },
  { id: "4", name: "Vesper Unit-9", type: "Character", tags: ["Droid", "Cinematic"], lastUsed: "3d ago", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vesper" },
  { id: "5", name: "Zenith Monolith", type: "Environment", tags: ["Ancient", "Iconic"], lastUsed: "2w ago", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400" },
  { id: "6", name: "Solar Sailer", type: "Prop", tags: ["Vehicle", "Space"], lastUsed: "1d ago", image: "https://images.unsplash.com/photo-1558981403-c5f97dbbe480?auto=format&fit=crop&q=80&w=400" },
  { id: "7", name: "Obsidian Shaman", type: "Character", tags: ["Support", "Magic"], lastUsed: "4h ago", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shaman" },
  { id: "8", name: "Crystal Spire", type: "Environment", tags: ["Interior", "Light"], lastUsed: "10d ago", image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=400" },
];

// Mock consistency identities data
const mockIdentities = [
  { id: "1", name: "Commander Vance", type: "Character", traits: [{ name: "Face Locked", locked: true }, { name: "Scars" }, { name: "Uniform" }], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vance" },
  { id: "2", name: "Elena Rossi", type: "Character", traits: [{ name: "Physique", locked: true }, { name: "Casual" }], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" },
  { id: "3", name: "Dr. Aris", type: "Character", traits: [{ name: "Ethnicity", locked: true }, { name: "Lab Gear" }], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrAris" },
  { id: "4", name: "Sento-01", type: "Character", traits: [{ name: "Cybernetics", locked: true }], image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sento" },
];

const mockEnvironments = [
  { id: "1", name: "The Void Deep", subtitle: "Mariana Trench • Underwater", variations: 12, image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800" },
  { id: "2", name: "Sector 7 Market", subtitle: "Neo-Tokyo • Cyberpunk", variations: 42, image: "https://images.unsplash.com/photo-1514565131-bce0801e5787?auto=format&fit=crop&q=80&w=800" },
];

function AssetLibraryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [libraryMode, setLibraryMode] = useState<"assets" | "consistency">("assets");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [consistencyTab, setConsistencyTab] = useState("Characters");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedCategory, libraryMode, consistencyTab]);

  const categories = [
    { name: "All", count: mockAssets.length },
    { name: "Characters", count: 3 },
    { name: "Environments", count: 3 },
    { name: "Props", count: 2 },
    { name: "VFX Assets", count: 0 },
  ];

  const consistencyTabs = ["Characters", "Environments", "Objects", "Styles"];

  return (
    <div className="flex h-full overflow-hidden bg-background">
      {/* Sidebar - Filter & Navigation */}
      <aside className="w-80 border-r border-border bg-white/40 backdrop-blur-md shrink-0 overflow-y-auto">
        <div className="p-10 space-y-12 h-full flex flex-col">
          {/* Library Mode Toggle */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-1 border border-border bg-white/50">
              <button
                onClick={() => { setLibraryMode("assets"); setIsLoading(true); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-[10px] font-bold uppercase tracking-widest transition-all ${libraryMode === "assets" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-primary"}`}
              >
                <Grid size={14} className="shrink-0" />
                <span>Assets</span>
              </button>
              <button
                onClick={() => { setLibraryMode("consistency"); setIsLoading(true); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-[10px] font-bold uppercase tracking-widest transition-all ${libraryMode === "consistency" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-primary"}`}
              >
                <Layers size={14} className="shrink-0" />
                <span>Consistency</span>
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <h1 className="font-serif text-3xl italic text-primary">
              {libraryMode === "assets" ? "Library" : "Consistency"}
            </h1>
            <nav className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all group ${selectedCategory === cat.name ? "bg-primary text-white shadow-xl" : "text-muted-foreground hover:bg-gray-100 hover:text-primary"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <div className={`h-1 w-1 rounded-full transition-all ${selectedCategory === cat.name ? "bg-accent scale-100" : "bg-transparent scale-0"}`} />
                    {cat.name}
                  </span>
                  <span className={`text-[8px] font-mono italic opacity-40 group-hover:opacity-100 ${selectedCategory === cat.name ? "text-white/60" : ""}`}>({cat.count})</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Visual DNA Tags</h3>
            <div className="flex flex-wrap gap-2">
              {["High-Poly", "Matte", "Lead", "Atmospheric", "Noir", "Vibrant"].map((tag) => (
                <Badge key={tag} className="border-border text-muted-foreground hover:border-accent hover:text-accent cursor-pointer italic px-3 py-1 bg-white">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-10 border-t border-border/50">
            <div className="bg-primary p-6 space-y-4">
              <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">Storage Metric</p>
              <div className="h-1.5 w-full bg-white/10 overflow-hidden">
                <div className="h-full w-1/3 bg-accent" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white italic">4.2 GB / 20 GB USED</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        {/* Top Bar */}
        <header className="flex h-20 items-center justify-between border-b border-border bg-white/60 px-10 backdrop-blur-sm z-10">
          <div className="flex items-center gap-8 flex-1 max-w-2xl">
            <div className="relative flex-1 group">
              <Input
                className="rounded-none border-b-2 border-x-0 border-t-0 border-border bg-transparent px-8 py-6 text-[11px] uppercase tracking-[0.2em] font-bold focus-visible:ring-0 focus-visible:border-primary placeholder:italic placeholder:font-serif placeholder:font-normal placeholder:tracking-normal placeholder:lowercase shadow-none"
                placeholder="search within the visual vault..."
              />
              <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>

            <div className="flex items-center gap-2 border border-border p-1 bg-white/50">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex h-10 w-10 items-center justify-center transition-all ${viewMode === "grid" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-primary"}`}
              >
                <Grid size={16} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex h-10 w-10 items-center justify-center transition-all ${viewMode === "list" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-primary"}`}
              >
                <List size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="h-12 rounded-none border-border px-8 text-[10px] font-bold uppercase tracking-widest hover:bg-white flex items-center gap-2">
              <Filter size={14} />
              Filters
            </Button>
            <Button className="h-12 rounded-none bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] px-8 shadow-2xl hover:bg-black transition-all">
              <Plus size={18} className="mr-3" />
              Ingest Asset
            </Button>
          </div>
        </header>

        {/* Asset Display */}
        <ScrollArea className="flex-1 p-10 bg-background/50 scrollbar-thin">
          <div className="mx-auto max-w-7xl">
            {libraryMode === "consistency" ? (
              /* ===== CONSISTENCY LIBRARY VIEW ===== */
              <>
                {/* Consistency Tabs */}
                <div className="border-b border-border mb-12">
                  <nav className="flex gap-10">
                    {consistencyTabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => { setConsistencyTab(tab); setIsLoading(true); }}
                        className={`pb-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${consistencyTab === tab ? "text-primary border-b-2 border-primary -mb-px" : "text-muted-foreground hover:text-primary"}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Header */}
                <div className="mb-12 flex items-end justify-between">
                  <div>
                    <h1 className="font-serif text-4xl italic text-primary mb-2">Consistency Library</h1>
                    <p className="text-xs text-muted-foreground tracking-wide">Maintain character, environment, and style continuity across all scenes.</p>
                  </div>
                  <Button className="h-12 rounded-none px-8 text-[10px] font-bold uppercase tracking-widest shadow-none">
                    <Plus size={16} className="mr-2" />
                    New Identity
                  </Button>
                </div>

                {isLoading ? (
                  <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="border border-border bg-white">
                        <Skeleton className="aspect-3/4 w-full bg-muted" />
                        <div className="p-5 space-y-4">
                          <Skeleton className="h-6 w-3/4 bg-muted" />
                          <div className="flex gap-2">
                            <Skeleton className="h-5 w-16 bg-muted" />
                            <Skeleton className="h-5 w-12 bg-muted" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {/* Character Identities Grid */}
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-20">
                      {mockIdentities.map((identity) => (
                        <div key={identity.id} className="border border-border bg-white transition-all duration-500 hover:shadow-xl cursor-pointer group">
                          <div className="aspect-3/4 overflow-hidden bg-neutral-200">
                            <img
                              src={identity.image}
                              alt={identity.name}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-5">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="font-serif text-xl">{identity.name}</h3>
                              <Lock size={14} className="text-muted-foreground/40" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {identity.traits.map((trait) => (
                                <span
                                  key={trait.name}
                                  className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-background border border-border"
                                >
                                  {trait.locked && <CheckCircle2 size={10} className="text-accent" />}
                                  {trait.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Environments Section */}
                    <div className="mt-20">
                      <div className="flex justify-between items-end mb-8">
                        <h2 className="font-serif text-3xl italic text-primary">Environments</h2>
                        <button className="text-[10px] font-bold uppercase tracking-widest text-primary border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors">
                          View All
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {mockEnvironments.map((env) => (
                          <div key={env.id} className="border border-border bg-white transition-all duration-500 hover:shadow-xl cursor-pointer group">
                            <div className="aspect-21/9 overflow-hidden bg-neutral-200">
                              <img
                                src={env.image}
                                alt={env.name}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            </div>
                            <div className="p-6 flex justify-between items-center">
                              <div>
                                <h3 className="font-serif text-2xl">{env.name}</h3>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{env.subtitle}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Variations</div>
                                <div className="text-[10px] font-medium">{env.variations} Frames</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              /* ===== ASSETS LIBRARY VIEW ===== */
              <>
                <div className="mb-12 flex flex-col md:flex-row items-baseline justify-between gap-4 border-b border-border pb-8">
                  <div className="space-y-1">
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Vault View //</h2>
                    <h1 className="font-serif text-4xl italic text-primary">{selectedCategory} Collective</h1>
                  </div>
                  <div className="flex items-center gap-6">
                    <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all flex items-center gap-2 italic">
                      <Download size={14} />
                      Export Manifest
                    </button>
                    <div className="h-4 w-px bg-border" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 italic">
                      Verified Repository Status: Stable
                    </span>
                  </div>
                </div>

                {isLoading ? (
                  viewMode === "grid" ? (
                    <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <AssetCardSkeleton key={i} />
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-px bg-border border border-border">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <ListRowSkeleton key={i} />
                      ))}
                    </div>
                  )
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                    {mockAssets.map((asset) => (
                      <div key={asset.id} className="group flex flex-col space-y-4 cursor-pointer">
                        <div className="relative aspect-square w-full overflow-hidden border border-border bg-white p-2 transition-all duration-700 group-hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] group-hover:-translate-y-2">
                          <div className="h-full w-full overflow-hidden bg-gray-50 bg-linear-to-tr from-gray-100 to-white relative">
                            <img
                              src={asset.image}
                              alt={asset.name}
                              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 saturate-50 group-hover:saturate-100"
                            />
                            {/* Overlay Controls */}
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                              <Button className="h-10 rounded-none bg-white font-bold uppercase tracking-widest text-primary text-[9px] px-6 hover:bg-accent hover:text-white transition-colors">
                                Add to Scene
                              </Button>
                            </div>
                          </div>

                          {/* Asset Options Icon */}
                          <div className="absolute top-4 right-4 z-20">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="flex h-8 w-8 items-center justify-center bg-white/90 backdrop-blur shadow-sm border border-border hover:bg-white transition-colors" onClick={(e) => e.stopPropagation()}>
                                  <MoreVertical size={14} />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-none border-border">
                                <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 flex items-center gap-3">
                                  <Share2 size={12} /> Share DNA
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 flex items-center gap-3">
                                  <Download size={12} /> Download
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 text-red-600 flex items-center gap-3">
                                  <Trash2 size={12} /> Purge Asset
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary group-hover:text-accent transition-colors">{asset.name}</h3>
                          <div className="flex items-center justify-between text-[9px] italic text-muted-foreground font-serif">
                            <span>{asset.type}</span>
                            <span className="opacity-40 uppercase font-sans font-bold not-italic tracking-tighter">{asset.lastUsed}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-px bg-border border border-border">
                    {mockAssets.map((asset) => (
                      <div key={asset.id} className="grid grid-cols-12 items-center gap-6 bg-white p-6 transition-all hover:bg-gray-50/50 cursor-pointer group">
                        <div className="col-span-1 aspect-square w-14 border border-border p-1 bg-white">
                          <div className="h-full w-full overflow-hidden bg-gray-50">
                            <img src={asset.image} alt={asset.name} className="h-full w-full object-cover saturate-50 group-hover:saturate-100 transition-all duration-700" />
                          </div>
                        </div>
                        <div className="col-span-4 pl-4">
                          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-1">{asset.name}</h4>
                          <p className="text-[9px] italic text-muted-foreground font-serif">Visual Model ID: SG-{asset.id}992</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{asset.type}</span>
                        </div>
                        <div className="col-span-3 flex flex-wrap gap-2">
                          {asset.tags.map(tag => (
                            <span key={tag} className="text-[8px] font-bold uppercase tracking-[0.2em] text-accent/50 group-hover:text-accent transition-colors">
                              #{tag.toLowerCase()}
                            </span>
                          ))}
                        </div>
                        <div className="col-span-2 text-right">
                          <div className="text-[9px] font-sans font-bold uppercase tracking-widest text-primary/30 group-hover:text-primary transition-colors">Last Integrated</div>
                          <div className="text-[11px] font-medium text-muted-foreground">{asset.lastUsed}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

