import { MoreHorizontal, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { useMutation, useQuery } from "convex/react";
import { api } from "@storygraph/backend/convex/_generated/api";
import type { Id } from "@storygraph/backend/convex/_generated/dataModel";
import { EditAssetModal } from "./EditAssetModal";

interface Asset {
  _id: string;
  name: string;
  categoryId: string;
  orgId: string;
  referenceImages?: string[];
  description?: string;
}

interface AssetCardProps {
  asset: Asset;
  viewMode: "grid" | "list";
  orgId?: string | null;
}

export function AssetCard({ asset, viewMode, orgId }: AssetCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const removeAsset = useMutation(api.assets.remove);

  // Fetch category name - only if orgId is provided
  const categories = useQuery(
    api.assetCategories.listAll,
    orgId ? { orgId: orgId as Id<"organizations"> } : "skip",
  );
  const category = categories?.find((c) => c._id === asset.categoryId);
  const categoryName = category?.name || "Asset";

  // Get first reference image or fallback to generated avatar
  // Note: Some assets may have 'image' field from legacy data, check both
  const displayImage =
    asset.referenceImages?.[0] ||
    (asset as any).image ||
    `https://api.dicebear.com/7.x/shapes/svg?seed=${asset.name}`;

  const handleDelete = () => {
    removeAsset({ id: asset._id as Id<"assets"> });
  };

  if (viewMode === "list") {
    return (
      <>
        <div className="group grid cursor-pointer grid-cols-12 items-center gap-6 bg-card p-4 md:p-6 transition-all hover:bg-muted/30 border-b border-border/50 border-x">
          <div className="col-span-2 md:col-span-1 aspect-square h-16 w-16 md:h-20 md:w-20 border border-border bg-muted overflow-hidden">
            <img
              src={displayImage}
              alt={asset.name}
              className="h-full w-full object-cover saturate-50 transition-all duration-500 group-hover:saturate-100 group-hover:scale-110"
            />
          </div>
          <div className="col-span-10 md:col-span-11 flex items-center justify-between pl-2 md:pl-4">
            <div className="space-y-1">
              <h4 className="font-bold text-xs md:text-sm text-primary uppercase tracking-[0.15em]">
                {asset.name}
              </h4>
              <p className="font-serif text-[10px] md:text-xs text-muted-foreground italic lowercase">
                {categoryName}
              </p>
            </div>

            <div className="flex items-center gap-6 md:gap-12">
              <div className="hidden md:block">
                <p className="text-[9px] md:text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em] mb-1">
                  Access
                </p>
                <p className="text-xs font-bold text-primary uppercase tracking-tighter">
                  Global
                </p>
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-muted/50 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-none border-border"
                  >
                    <DropdownMenuItem
                      className="flex items-center gap-3 px-4 py-2 font-bold text-[10px] uppercase tracking-widest"
                      onClick={() => setIsEditModalOpen(true)}
                    >
                      <Edit2 size={16} /> Edit Asset
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu>

                <ConfirmDeleteDialog
                  title={`Delete "${asset.name}"?`}
                  description="This will permanently remove this asset from your library. This action cannot be undone."
                  onConfirm={handleDelete}
                  trigger={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-muted text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <EditAssetModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          asset={asset}
        />
      </>
    );
  }

  // Grid view - Exactly 420px height, vertical layout
  return (
    <>
      <div className="group h-[420px] relative border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl flex flex-col overflow-hidden">
        {/* Portrait Image Area - Fills the top portion */}
        <div className="relative flex-1 min-h-0 overflow-hidden bg-neutral-200">
          <img
            src={displayImage}
            alt={asset.name}
            className="h-full w-full object-cover saturate-[0.4] transition-transform duration-700 group-hover:scale-105 group-hover:saturate-100"
          />

          {/* Category Label Overlay */}
          <div className="absolute top-4 left-4">
            <div className="bg-background/80 backdrop-blur-md border border-border px-3 py-1.5">
              <span className="font-bold text-xs text-primary uppercase tracking-wide">
                {categoryName}
              </span>
            </div>
          </div>

          {/* Top Actions */}
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 border border-white/20 bg-black/40 text-white backdrop-blur hover:bg-black/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  type="button"
                >
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-none border-border"
              >
                <DropdownMenuItem
                  className="flex items-center gap-3 px-4 py-2 font-bold text-[10px] uppercase tracking-widest"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Edit2 size={16} /> Edit Asset
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmDeleteDialog
              title={`Delete "${asset.name}"?`}
              description="This will permanently remove this asset from your library. This action cannot be undone."
              onConfirm={handleDelete}
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 border border-white/20 bg-black/40 text-red-400 backdrop-blur hover:bg-red-600/80 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  type="button"
                >
                  <Trash2 size={16} />
                </Button>
              }
            />
          </div>
        </div>

        {/* Asset Info Footer */}
        <div className="p-5 border-t border-border">
          <h4 className="font-bold text-sm text-primary uppercase tracking-wide mb-1">
            {asset.name}
          </h4>
          {asset.description && (
            <p className="font-serif text-xs text-muted-foreground italic line-clamp-2">
              {asset.description}
            </p>
          )}
        </div>
      </div>

      <EditAssetModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        asset={asset}
      />
    </>
  );
}
