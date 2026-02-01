import {
  MoreHorizontal,
  Trash2,
  Copy,
  Edit2,
  ExternalLink,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { api } from "@storygraph/backend/convex/_generated/api";
import type { Id } from "@storygraph/backend/convex/_generated/dataModel";

interface Asset {
  _id: string;
  name: string;
  categoryId: string;
  image?: string;
}

interface AssetCardProps {
  asset: Asset;
  viewMode: "grid" | "list";
}

export function AssetCard({ asset, viewMode }: AssetCardProps) {
  const removeAsset = useMutation(api.assets.remove);

  if (viewMode === "list") {
    return (
      <div className="group grid cursor-pointer grid-cols-12 items-center gap-6 bg-card p-6 transition-all hover:bg-muted/30 border-b border-border/50 border-x">
        <div className="col-span-1 aspect-[2.39/1] w-24 border border-border bg-muted overflow-hidden">
          <img
            src={
              asset.image ||
              "https://api.dicebear.com/7.x/avataaars/svg?seed=" + asset.name
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
              sg-manifest-entry-{asset._id.slice(-8)}
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

            <div className="text-right">
              <p className="text-[8px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em] mb-1">
                Status
              </p>
              <p className="text-[9px] font-bold text-accent uppercase tracking-tighter">
                Ready
              </p>
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-muted"
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
                  <DropdownMenuItem className="flex items-center gap-3 px-4 py-2 font-bold text-[10px] uppercase tracking-widest">
                    <Share2 size={16} /> Share DNA
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
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

  return (
    <div className="group relative border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex h-full flex-col">
        <div className="relative aspect-[2.39/1] overflow-hidden bg-neutral-200">
          <img
            src={
              asset.image ||
              "https://api.dicebear.com/7.x/avataaars/svg?seed=" + asset.name
            }
            alt={asset.name}
            className="h-full w-full object-cover saturate-[0.4] transition-transform duration-700 group-hover:scale-105 group-hover:saturate-100"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/10 backdrop-blur-md">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 space-y-1">
            <h3 className="font-bold text-[11px] text-primary uppercase tracking-[0.2em] transition-colors group-hover:text-accent">
              {asset.name}
            </h3>
            <p className="font-serif text-[9px] text-muted-foreground italic lowercase">
              sg-manifest-source-v2-{asset._id.slice(-6)}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between border-border border-t pt-4">
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 bg-accent" />
              <span className="font-bold text-[8px] text-muted-foreground uppercase tracking-widest">
                GLOBAL RESOURCE
              </span>
            </div>
            <div className="font-bold text-[9px] text-primary/40 uppercase italic tracking-[0.2em]">
              Active Asset
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 border border-white/20 bg-black/40 text-white backdrop-blur hover:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
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

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 border border-white/20 bg-black/40 text-red-400 backdrop-blur hover:bg-red-600/80 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
          type="button"
          onClick={() => {
            if (confirm("Purge this asset from the manifest?")) {
              removeAsset({ id: asset._id as Id<"assets"> });
            }
          }}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
}
