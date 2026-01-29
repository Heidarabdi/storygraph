import { api } from "@storygraph/backend/convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { Download, Menu, Plus, Search } from "lucide-react";
import { useState } from "react";
import { AssetCard } from "@/components/library/AssetCard";
import { IdentityCard } from "@/components/library/IdentityCard";
import { LibrarySidebar } from "@/components/library/LibrarySidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/library")({
	component: AssetLibraryPage,
});

function AssetLibraryPage() {
	const [viewMode] = useState<"grid" | "list">("grid");
	const [libraryMode, setLibraryMode] = useState<"assets" | "consistency">(
		"assets",
	);
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [consistencyTab, setConsistencyTab] = useState("Characters");

	// Convex Queries - use listAll for global library view
	const assets = useQuery(api.assets.listAll) || [];
	const isLoading = !assets;

	const consistencyTabs = ["Characters", "Environments", "Objects", "Styles"];

	const Sidebar = (
		<LibrarySidebar
			libraryMode={libraryMode}
			setLibraryMode={setLibraryMode}
			selectedCategory={selectedCategory}
			setSelectedCategory={setSelectedCategory}
			assetCount={assets.length}
		/>
	);

	return (
		<div className="flex h-full overflow-hidden bg-background">
			{/* Sidebar - Desktop */}
			<aside className="hidden w-80 shrink-0 overflow-y-auto border-border border-r bg-card/40 backdrop-blur-md lg:block">
				{Sidebar}
			</aside>

			{/* Main Content */}
			<main className="flex flex-1 flex-col overflow-y-auto">
				{/* Top Bar */}
				<header className="z-10 flex h-16 shrink-0 items-center justify-between border-border border-b bg-card/60 px-3 backdrop-blur-sm md:h-20 md:px-10">
					<div className="flex max-w-2xl flex-1 items-center gap-3 overflow-hidden md:gap-8">
						<div className="shrink-0 lg:hidden">
							<Sheet>
								<SheetTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="h-9 w-9 md:h-10 md:w-10"
									>
										<Menu size={18} />
									</Button>
								</SheetTrigger>
								<SheetContent
									side="left"
									className="w-full border-border border-r p-0 sm:w-80"
								>
									{Sidebar}
								</SheetContent>
							</Sheet>
						</div>
						<div className="group relative min-w-0 flex-1">
							<Input
								className="truncate rounded-none border-border border-x-0 border-t-0 border-b-2 bg-transparent py-3 pr-2 pl-6 font-bold text-[9px] uppercase tracking-[0.15em] shadow-none placeholder:font-normal placeholder:font-serif placeholder:lowercase placeholder:italic placeholder:tracking-normal focus-visible:border-primary focus-visible:ring-0 md:py-6 md:pl-8 md:text-[11px] md:tracking-[0.2em] min-[400px]:text-[10px]"
								placeholder="search vault..."
							/>
							<Search
								size={12}
								className="absolute top-1/2 left-0 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary md:size-3.5"
							/>
						</div>
					</div>

					<div className="ml-3 flex shrink-0 items-center gap-2 md:gap-4">
						<Button className="h-9 rounded-none bg-primary px-3 font-bold text-[9px] text-primary-foreground uppercase tracking-widest shadow-2xl transition-all hover:bg-black md:h-12 md:px-8 md:text-[10px]">
							<Plus size={16} className="md:mr-3" />
							<span className="hidden min-[450px]:inline">Ingest</span>
						</Button>
					</div>
				</header>

				{/* Asset Display */}
				<ScrollArea className="scrollbar-thin flex-1 bg-background/50 p-4 md:p-10">
					<div className="mx-auto max-w-7xl">
						{libraryMode === "consistency" ? (
							<>
								<div className="mb-12 border-border border-b">
									<nav className="flex gap-10">
										{consistencyTabs.map((tab) => (
											<button
												key={tab}
												onClick={() => setConsistencyTab(tab)}
												className={`pb-4 font-bold text-[10px] uppercase tracking-widest transition-colors ${consistencyTab === tab ? "-mb-px border-primary border-b-2 text-primary" : "text-muted-foreground hover:text-primary"}`}
												type="button"
											>
												{tab}
											</button>
										))}
									</nav>
								</div>

								<div className="mb-12 flex items-end justify-between">
									<div>
										<h1 className="mb-2 font-serif text-4xl text-primary italic">
											Consistency Library
										</h1>
										<p className="text-muted-foreground text-xs tracking-wide">
											Maintain continuity across all scenes.
										</p>
									</div>
									<Button
										className="h-12 rounded-none px-8 font-bold text-[10px] uppercase tracking-widest shadow-none"
										type="button"
									>
										<Plus size={16} className="mr-2" />
										New Identity
									</Button>
								</div>

								{isLoading ? (
									<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
										{Array.from({ length: 4 }).map((_, i) => (
											// biome-ignore lint/suspicious/noArrayIndexKey: skeleton items
											<Skeleton key={i} className="aspect-3/4 bg-muted" />
										))}
									</div>
								) : (
									<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
										{/* Placeholder identities for now */}
										{assets
											.filter((a) => a.type === "character")
											.map((identity) => (
												<IdentityCard
													key={identity._id}
													identity={{
														_id: identity._id as string,
														name: identity.name,
														type: identity.type,
														traits: [],
													}}
												/>
											))}
									</div>
								)}
							</>
						) : (
							<>
								<div className="mb-12 flex flex-col items-baseline justify-between gap-4 border-border border-b pb-8 md:flex-row">
									<div className="space-y-1">
										<h2 className="font-bold text-[10px] text-accent uppercase tracking-[0.4em]">
											{"Vault View //"}
										</h2>
										<h1 className="font-serif text-4xl text-primary italic">
											{selectedCategory} Collective
										</h1>
									</div>
									<div className="flex items-center gap-6">
										<button
											className="flex items-center gap-2 font-bold text-[10px] text-muted-foreground uppercase italic tracking-[0.2em] transition-all hover:text-primary"
											type="button"
										>
											<Download size={14} /> Export Manifest
										</button>
									</div>
								</div>

								{isLoading ? (
									<div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
										{Array.from({ length: 8 }).map((_, i) => (
											// biome-ignore lint/suspicious/noArrayIndexKey: skeleton items
											<Skeleton key={i} className="aspect-square bg-muted" />
										))}
									</div>
								) : (
									<div
										className={
											viewMode === "grid"
												? "grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4"
												: "grid gap-px bg-border shadow-sm"
										}
									>
										{assets.map((asset) => (
											<AssetCard
												key={asset._id}
												asset={{
													_id: asset._id as string,
													name: asset.name,
													type: asset.type,
													image: asset.referenceImages?.[0],
												}}
												viewMode={viewMode}
											/>
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
