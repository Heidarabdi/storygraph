import { api } from "@storygraph/backend/convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import {
  Search,
  History as HistoryIcon,
  Download,
  Plus,
  Grid,
  List,
} from "lucide-react";
import { useState, useMemo } from "react";
import { AssetCard } from "@/components/library/AssetCard";
import { LibrarySidebar } from "@/components/library/LibrarySidebar";
import { NewAssetModal } from "@/components/library/NewAssetModal";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/library")({
  component: AssetLibraryPage,
});

function AssetLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isNewAssetModalOpen, setIsNewAssetModalOpen] = useState(false);

  const organizations = useQuery(api.organizations.list);
  const activeOrg = organizations?.[0];

  const rawAssets =
    useQuery(api.assets.listAll, {
      categoryId: selectedCategoryId ? (selectedCategoryId as any) : undefined,
    }) || [];

  const assets = useMemo(() => {
    if (!searchQuery.trim()) return rawAssets;
    const lowerQuery = searchQuery.toLowerCase();
    return rawAssets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(lowerQuery) ||
        asset.description?.toLowerCase().includes(lowerQuery),
    );
  }, [rawAssets, searchQuery]);

  const categories = useQuery(
    api.assetCategories.listAll,
    activeOrg ? { orgId: activeOrg._id } : "skip",
  );
  const currentCategoryName = selectedCategoryId
    ? categories?.find((c) => c._id === selectedCategoryId)?.name || "Category"
    : "Personal Assets";

  const isLoading = !organizations || !rawAssets;

  const SidebarContent = (
    <LibrarySidebar
      orgId={activeOrg?._id}
      selectedCategoryId={selectedCategoryId}
      setSelectedCategoryId={setSelectedCategoryId}
      assetCount={rawAssets.length}
    />
  );

  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-72 shrink-0 flex-col border-border border-r bg-card/40 backdrop-blur-md md:flex">
        {SidebarContent}
      </aside>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header Utility Bar */}
        <div className="z-10 flex h-14 shrink-0 items-center border-border border-b bg-card/40 px-6 backdrop-blur-md">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="p-1 text-muted-foreground transition-colors hover:text-primary"
              type="button"
            >
              <HistoryIcon size={18} strokeWidth={1.5} />
            </button>
            <button
              className="p-1 text-muted-foreground transition-colors hover:text-primary"
              type="button"
            >
              <Download size={18} strokeWidth={1.5} />
            </button>
            <div className="ml-2 flex md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest hover:text-primary">
                    {"Menu //"}
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-72 p-0 border-r border-border"
                >
                  {SidebarContent}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Main Header & Controls */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="mx-auto max-w-7xl">
            {/* Page Header Selection */}
            <div className="mb-12 flex flex-col items-baseline justify-between gap-6 border-border border-b pb-10 md:flex-row">
              <div className="space-y-1">
                <h2 className="font-bold text-[10px] text-accent uppercase tracking-[0.4em]">
                  {"Asset Library //"}
                </h2>
                <h1 className="font-serif text-4xl text-primary italic">
                  {currentCategoryName}
                </h1>
              </div>

              <div className="flex w-full items-center gap-6 sm:w-auto">
                <div className="flex items-center gap-1 bg-muted/20 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-all ${viewMode === "grid" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground/40 hover:text-primary"}`}
                    title="Grid View"
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-all ${viewMode === "list" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground/40 hover:text-primary"}`}
                    title="Details View"
                  >
                    <List size={18} />
                  </button>
                </div>

                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="Search journeys..."
                    className="h-12 w-full border-border border-b bg-transparent px-4 font-bold text-[10px] uppercase tracking-widest focus:border-primary focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search
                    size={14}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/20"
                  />
                </div>
              </div>
            </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3"
                  : "space-y-px border-y border-border"
              }
            >
              {/* "New Asset" as a Card specialized for Grid/List */}
              {viewMode === "grid" ? (
                <button
                  onClick={() => setIsNewAssetModalOpen(true)}
                  className="group flex h-[420px] flex-col items-center justify-center border-2 border-border border-dashed bg-card/50 transition-all hover:border-accent hover:bg-card/80"
                  type="button"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center border border-border bg-muted transition-colors group-hover:bg-card">
                    <Plus
                      size={32}
                      className="text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="font-bold text-[11px] uppercase tracking-[0.3em]">
                    New Asset
                  </span>
                  <span className="mt-2 font-serif text-[10px] text-muted-foreground italic lowercase">
                    begin a new visual journey
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => setIsNewAssetModalOpen(true)}
                  className="flex w-full items-center gap-6 bg-card/50 p-6 hover:bg-muted/30 transition-all border-x border-border/50 group"
                  type="button"
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-border bg-muted group-hover:bg-card transition-colors">
                    <Plus size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="block font-bold text-[10px] uppercase tracking-[0.2em]">
                      New Asset Selection
                    </span>
                    <span className="font-serif text-[9px] text-muted-foreground italic lowercase opacity-60">
                      initialize new entry in manifest
                    </span>
                  </div>
                </button>
              )}

              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className={
                        viewMode === "grid"
                          ? "h-[420px] bg-card border border-border"
                          : "h-24 bg-card border border-border"
                      }
                    />
                  ))
                : assets.map((asset) => (
                    <AssetCard
                      key={asset._id}
                      asset={{
                        _id: asset._id as string,
                        name: asset.name,
                        categoryId: asset.categoryId as string,
                        image: asset.referenceImages?.[0],
                      }}
                      viewMode={viewMode}
                    />
                  ))}
            </div>
          </div>
        </main>
      </div>

      {/* Shared New Asset Modal */}
      <NewAssetModal
        isOpen={isNewAssetModalOpen}
        onClose={() => setIsNewAssetModalOpen(false)}
        orgId={activeOrg?._id || null}
        defaultCategoryId={selectedCategoryId}
      />
    </div>
  );
}
