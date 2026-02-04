import {
  MoreHorizontal,
  Trash2,
  Copy,
  Edit2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery } from "convex/react";
import { api } from "@storygraph/backend/convex/_generated/api";
import type { Id } from "@storygraph/backend/convex/_generated/dataModel";

interface Asset {
  _id: string;
  name: string;
  categoryId: string;
  image?: string;
  description?: string;
}

interface AssetCardProps {
  asset: Asset;
  viewMode: "grid" | "list";
  orgId?: string | null;
}

export function AssetCard({ asset, viewMode, orgId }: AssetCardProps) {
  const removeAsset = useMutation(api.assets.remove);

  // Fetch category name - only if orgId is provided
  const categories = useQuery(
    api.assetCategories.listAll,
    orgId ? { orgId: orgId as Id<"organizations"> } : "skip",
  );
  const category = categories?.find((c) => c._id === asset.categoryId);
  const categoryName = category?.name || "Asset";

  if (viewMode === "list") {
    return (
      <div className="group grid cursor-pointer grid-cols-12 items-center gap-6 bg-card p-6 transition-all hover:bg-muted/30 border-b border-border/50 border-x">
        <div className="col-span-1 aspect-square w-16 border border-border bg-muted overflow-hidden">
          <img
            src={
              asset.image ||
              "https://api.dicebear.com/7.x/shapes/svg?seed=" + asset.name
            }
            alt={asset.name}
            className="h-full w-full object-cover saturate-50 transition-all duration-500 group-hover:saturate-100 group-hover:scale-110"
          />
        </div>
        <div className="col-span-11 flex items-center justify-between pl-4">
          <div className="space-y-0.5">
            <h4 className="font-bold text-[10px] text-primary uppercase tracking-[0.2em]">
              {asset.name}
            </h4>
            <p className="font-serif text-[9px] text-muted-foreground italic lowercase">
              {categoryName} // sg-manifest-entry-{asset._id.slice(-8)}
            </p>
          </div>

          <div className="flex items-center gap-12">
            <div className="hidden md:block">
              <p className="text-[8px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em] mb-1">
                Access
              </p>
              <p className="text-[9px] font-bold text-primary uppercase tracking-tighter">
                Global
              </p>
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-muted hover:text-primary transition-colors"
                  >
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-none border-border"
                >
                  <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 font-bold text-[10px] uppercase tracking-widest">
                    <ExternalLink size={16} /> View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-3 px-4 py-2 font-bold text-[10px] uppercase tracking-widest text-red-500 hover:text-red-600"
                    onClick={() =>
                      removeAsset({ id: asset._id as Id<"assets"> })
                    }
                  >
                    <Trash2 size={16} /> Purge
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view - Exactly 420px height, vertical layout
  return (
    <div className="group h-[420px] relative border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl flex flex-col overflow-hidden">
      {/* Portrait Image Area - Fills the top portion */}
      <div className="relative flex-1 min-h-0 overflow-hidden bg-neutral-200">
        <img
          src={
            asset.image ||
            "https://api.dicebear.com/7.x/shapes/svg?seed=" + asset.name
          }
          alt={asset.name}
          className="h-full w-full object-cover saturate-[0.4] transition-transform duration-700 group-hover:scale-105 group-hover:saturate-100"
        />

        {/* Category Label Overlay */}
        <div className="absolute top-4 left-4">
          <div className="bg-background/80 backdrop-blur-md border border-border px-2 py-1">
            <span className="font-bold text-[8px] text-primary uppercase tracking-[0.2em]">
              {categoryName}
            </span>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/10 backdrop-blur-md">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          </div>
        </div>
      </div>

      {/* Asset Info - Manifesto Style */}
      <div className="flex flex-col p-6 shrink-0 bg-card border-t border-border">
        <div className="space-y-4 mb-2">
          {/* Identity Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[13px] text-primary uppercase tracking-[0.3em] transition-colors group-hover:text-accent">
              {asset.name}
            </h3>
            <span className="font-serif text-[10px] text-muted-foreground/40 italic">
              #{(asset._id.match(/\d/g) || []).slice(0, 4).join("") || "7721"}
            </span>
          </div>

          <div className="h-px w-full bg-border/40" />
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-[8px] text-muted-foreground uppercase tracking-widest opacity-60">
              MANIFEST STATUS
            </span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-bold text-[9px] text-primary uppercase tracking-tighter">
                ACTIVE DNA
              </span>
            </div>
          </div>
          <div className="text-right flex flex-col gap-1">
            <span className="font-bold text-[8px] text-muted-foreground uppercase tracking-widest opacity-60">
              ACCESS
            </span>
            <span className="font-bold text-[9px] text-primary/40 uppercase tracking-[0.2em]">
              {categoryName}
            </span>
          </div>
        </div>
      </div>

      {/* Top Actions */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border border-white/20 bg-black/40 text-white backdrop-blur hover:bg-black/60 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
              type="button"
            >
              <MoreHorizontal size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-none border-border"
          >
            <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 font-bold text-[10px] uppercase tracking-widest">
              <Copy size={16} /> Clone DNA
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 font-bold text-[10px] uppercase tracking-widest">
              <Edit2 size={16} /> Modify Manifest
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-3 px-4 py-2 font-bold text-[10px] uppercase tracking-widest text-red-500"
              onClick={() => {
                if (confirm("Purge this asset from the manifest?")) {
                  removeAsset({ id: asset._id as Id<"assets"> });
                }
              }}
            >
              <Trash2 size={16} /> Purge
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
