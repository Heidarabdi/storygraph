import {
  Tag,
  Trash2,
  LayoutGrid,
  Plus,
  User,
  Users,
  Mountain,
  Map,
  Box,
  Sword,
  Car,
  Zap,
} from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@storygraph/backend/convex/_generated/api";
import type { Id } from "@storygraph/backend/convex/_generated/dataModel";
import { useState } from "react";
import { NewAssetModal } from "./NewAssetModal";
import { NewCategoryModal } from "./NewCategoryModal";

interface SidebarProps {
  orgId?: Id<"organizations">;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
  assetCount: number;
}

const ICON_MAP: Record<string, any> = {
  User,
  Users,
  Mountain,
  Map,
  Box,
  Sword,
  Car,
  Zap,
  Tag,
  LayoutGrid,
};

export function LibrarySidebar({
  orgId,
  selectedCategoryId,
  setSelectedCategoryId,
  assetCount,
}: SidebarProps) {
  const categories = useQuery(
    api.assetCategories.listAll,
    orgId ? { orgId } : "skip",
  );
  const deleteCategory = useMutation(api.assetCategories.remove);

  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [isNewAssetModalOpen, setIsNewAssetModalOpen] = useState(false);

  return (
    <div className="flex h-full flex-col bg-card/40 backdrop-blur-md">
      {/* Primary Navigation */}
      <nav className="flex-1 space-y-2 p-8 overflow-y-auto">
        <button
          onClick={() => setSelectedCategoryId(null)}
          className={`flex w-full items-center gap-3 px-4 py-3 font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${
            selectedCategoryId === null
              ? "bg-primary text-primary-foreground shadow-xl"
              : "text-muted-foreground hover:bg-muted hover:text-primary"
          }`}
          type="button"
        >
          <LayoutGrid size={18} strokeWidth={1.5} />
          <span>All Assets</span>
          <span className="ml-auto text-[9px] opacity-40">{assetCount}</span>
        </button>

        {categories?.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon || "Tag"] || Tag;
          return (
            <div key={cat._id} className="relative group">
              <button
                onClick={() => setSelectedCategoryId(cat._id)}
                className={`flex w-full items-center gap-3 px-4 py-3 font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${
                  selectedCategoryId === cat._id
                    ? "bg-primary text-primary-foreground shadow-xl"
                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                }`}
                type="button"
              >
                <IconComponent size={18} strokeWidth={1.5} />
                <span className="truncate">{cat.name}</span>
              </button>
              {selectedCategoryId === cat._id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Delete this category?")) {
                      deleteCategory({ id: cat._id });
                      setSelectedCategoryId(null);
                    }
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary-foreground/40 hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          );
        })}

        {/* Action Links */}
        <div className="border-border/50 border-t mt-4 pt-4">
          <div className="mb-4 font-bold text-[9px] text-muted-foreground/60 uppercase tracking-[0.3em] px-4">
            Actions
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setIsNewCategoryModalOpen(true)}
              className="group flex w-full items-center gap-3 px-8 py-3 font-bold text-[10px] text-muted-foreground uppercase tracking-[0.2em] transition-all hover:bg-muted hover:text-primary text-left"
              type="button"
            >
              <Plus
                size={16}
                className="text-accent/40 group-hover:text-accent transition-all group-hover:scale-110"
              />
              <span>New Category</span>
            </button>

            <button
              onClick={() => setIsNewAssetModalOpen(true)}
              className="group flex w-full items-center gap-3 px-8 py-3 font-bold text-[10px] text-muted-foreground uppercase tracking-[0.2em] transition-all hover:bg-muted hover:text-primary text-left"
              type="button"
            >
              <Plus
                size={16}
                className="text-accent/40 group-hover:text-accent transition-all group-hover:scale-110"
              />
              <span>Catalog Asset</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Storage Metrics */}
      <div className="mt-auto border-border/50 border-t pt-10 pb-10 px-8">
        <div className="space-y-4 bg-primary p-8">
          <p className="font-bold text-[9px] text-white/40 uppercase tracking-widest">
            Storage Metric
          </p>
          <div className="h-1.5 w-full overflow-hidden bg-white/10">
            <div className="h-full w-1/3 bg-accent" />
          </div>
          <p className="font-bold text-[10px] text-white uppercase italic tracking-widest">
            4.2 GB / 20 GB USED
          </p>
        </div>
      </div>

      {/* New Asset Modal */}
      <NewAssetModal
        isOpen={isNewAssetModalOpen}
        onClose={() => setIsNewAssetModalOpen(false)}
        orgId={orgId?.toString() || null}
        defaultCategoryId={selectedCategoryId}
      />

      {/* New Category Modal */}
      <NewCategoryModal
        isOpen={isNewCategoryModalOpen}
        onClose={() => setIsNewCategoryModalOpen(false)}
        orgId={orgId?.toString() || null}
      />
    </div>
  );
}
