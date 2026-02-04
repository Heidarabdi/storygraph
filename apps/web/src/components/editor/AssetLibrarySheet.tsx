import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { GroupedAssets, Id } from "@/types/editor";

interface AssetLibrarySheetProps {
  groupedAssets: GroupedAssets;
  onAssetClick?: (assetId: Id<"assets">) => void;
}

export function AssetLibrarySheet({
  groupedAssets,
  onAssetClick,
}: AssetLibrarySheetProps) {
  return (
    <SheetContent
      side="left"
      className="w-[450px] border-border p-0 flex flex-col"
    >
      <SheetHeader className="border-border border-b p-8 bg-card shrink-0">
        <div>
          <SheetTitle className="text-2xl font-serif italic mb-1">
            Assets Library
          </SheetTitle>
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] opacity-60">
            Resource DNA Manifest
          </p>
        </div>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto custom-scrollbar bg-card/10">
        {Object.entries(groupedAssets).map(([catId, group]) => {
          const catAssets = group?.assets || [];
          return (
            <div key={catId} className="mb-10 last:mb-0">
              {/* Category Header */}
              <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-md px-8 py-4 border-b border-border/50">
                <h4 className="font-bold text-[9px] text-accent uppercase tracking-[0.4em] flex items-center justify-between">
                  {group?.name || "Category"}
                  <span className="font-serif italic text-muted-foreground/40 text-[11px] tracking-normal">
                    {catAssets.length} Registered
                  </span>
                </h4>
              </div>

              {/* Assets Grid */}
              <div className="grid grid-cols-3 gap-5 p-8">
                {catAssets.map((asset) => (
                  <button
                    type="button"
                    key={asset._id}
                    onClick={() => onAssetClick?.(asset._id)}
                    className="group cursor-pointer space-y-3 text-left"
                  >
                    <div className="relative aspect-3/4 w-full overflow-hidden border border-border bg-card transition-all group-hover:border-accent group-hover:shadow-2xl group-hover:-translate-y-1">
                      <img
                        src={
                          asset.referenceImages?.[0] ||
                          `https://api.dicebear.com/7.x/shapes/svg?seed=${asset.name}`
                        }
                        alt={asset.name}
                        className="h-full w-full object-cover saturate-[0.1] transition-all duration-700 group-hover:scale-110 group-hover:saturate-100"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform p-1.5 backdrop-blur-sm">
                        <p className="text-[7px] text-white font-bold uppercase tracking-widest text-center">
                          Add to Frame
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1 text-center">
                      <p className="truncate text-[9px] font-bold uppercase tracking-widest text-primary transition-colors group-hover:text-accent">
                        {asset.name}
                      </p>
                    </div>
                  </button>
                ))}
                {catAssets.length === 0 && (
                  <div className="col-span-3 py-10 text-center border border-dashed border-border/50 rounded-none bg-muted/5 flex flex-col items-center justify-center gap-3">
                    <p className="text-[10px] text-muted-foreground italic uppercase tracking-widest opacity-40">
                      No assets in this category
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SheetContent>
  );
}
