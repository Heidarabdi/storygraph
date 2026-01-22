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
} from "lucide-react";
import { useState } from "react";

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

function AssetLibraryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    { name: "All", count: mockAssets.length },
    { name: "Characters", count: 3 },
    { name: "Environments", count: 3 },
    { name: "Props", count: 2 },
    { name: "VFX Assets", count: 0 },
  ];

  return (
    <div className="flex h-full overflow-hidden bg-background">
      {/* Sidebar - Filter & Navigation */}
      <aside className="w-80 border-r border-border bg-white/40 backdrop-blur-md shrink-0">
        <div className="p-10 space-y-12 h-full flex flex-col">
          <div className="space-y-8">
            <h1 className="font-serif text-3xl italic text-primary">Library</h1>
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
      <main className="flex flex-1 flex-col overflow-hidden">
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

            {viewMode === "grid" ? (
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
                        <img src={asset.image} className="h-full w-full object-cover saturate-50 group-hover:saturate-100 transition-all duration-700" />
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
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
