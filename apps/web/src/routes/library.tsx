import { createFileRoute } from "@tanstack/react-router";
import {
	CheckCircle2,
	Download,
	Grid,
	Layers,
	Lock,
	Menu,
	MoreVertical,
	Plus,
	Search,
	Share2,
	Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/library")({
	component: AssetLibraryPage,
});

function Badge({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<span
			className={`inline-flex items-center border px-2.5 py-0.5 font-bold text-[8px] uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
		>
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
				<Skeleton className="ml-auto h-3 w-20 bg-muted" />
				<Skeleton className="ml-auto h-4 w-16 bg-muted" />
			</div>
		</div>
	);
}

// Mock data
const mockAssets = [
	{
		id: "1",
		name: "Aether Protagonist",
		type: "Character",
		tags: ["Lead", "High-Poly"],
		lastUsed: "2h ago",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aether",
	},
	{
		id: "2",
		name: "Neo-Tokyo Skyline",
		type: "Environment",
		tags: ["Exterior", "Matte"],
		lastUsed: "5d ago",
		image:
			"https://images.unsplash.com/photo-1514565131-bce0801e5787?auto=format&fit=crop&q=80&w=400",
	},
	{
		id: "3",
		name: "Gravity Blade",
		type: "Prop",
		tags: ["Energy", "Equip"],
		lastUsed: "1w ago",
		image:
			"https://images.unsplash.com/photo-1590483734724-33299c85536e?auto=format&fit=crop&q=80&w=400",
	},
	{
		id: "4",
		name: "Vesper Unit-9",
		type: "Character",
		tags: ["Droid", "Cinematic"],
		lastUsed: "3d ago",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vesper",
	},
	{
		id: "5",
		name: "Zenith Monolith",
		type: "Environment",
		tags: ["Ancient", "Iconic"],
		lastUsed: "2w ago",
		image:
			"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400",
	},
	{
		id: "6",
		name: "Solar Sailer",
		type: "Prop",
		tags: ["Vehicle", "Space"],
		lastUsed: "1d ago",
		image:
			"https://images.unsplash.com/photo-1558981403-c5f97dbbe480?auto=format&fit=crop&q=80&w=400",
	},
	{
		id: "7",
		name: "Obsidian Shaman",
		type: "Character",
		tags: ["Support", "Magic"],
		lastUsed: "4h ago",
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shaman",
	},
	{
		id: "8",
		name: "Crystal Spire",
		type: "Environment",
		tags: ["Interior", "Light"],
		lastUsed: "10d ago",
		image:
			"https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=400",
	},
];

// Mock consistency identities data
const mockIdentities = [
	{
		id: "1",
		name: "Commander Vance",
		type: "Character",
		traits: [
			{ name: "Face Locked", locked: true },
			{ name: "Scars" },
			{ name: "Uniform" },
		],
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vance",
	},
	{
		id: "2",
		name: "Elena Rossi",
		type: "Character",
		traits: [{ name: "Physique", locked: true }, { name: "Casual" }],
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
	},
	{
		id: "3",
		name: "Dr. Aris",
		type: "Character",
		traits: [{ name: "Ethnicity", locked: true }, { name: "Lab Gear" }],
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DrAris",
	},
	{
		id: "4",
		name: "Sento-01",
		type: "Character",
		traits: [{ name: "Cybernetics", locked: true }],
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sento",
	},
];

const mockEnvironments = [
	{
		id: "1",
		name: "The Void Deep",
		subtitle: "Mariana Trench • Underwater",
		variations: 12,
		image:
			"https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800",
	},
	{
		id: "2",
		name: "Sector 7 Market",
		subtitle: "Neo-Tokyo • Cyberpunk",
		variations: 42,
		image:
			"https://images.unsplash.com/photo-1514565131-bce0801e5787?auto=format&fit=crop&q=80&w=800",
	},
];

function AssetLibraryPage() {
	const [viewMode] = useState<"grid" | "list">("grid");
	const [libraryMode, setLibraryMode] = useState<"assets" | "consistency">(
		"assets",
	);
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

	const SidebarContent = () => (
		<div className="flex h-full flex-col space-y-12 bg-card/40 p-8 backdrop-blur-md lg:p-10">
			{/* Library Mode Toggle */}
			<div className="space-y-4">
				<div className="flex w-full items-center gap-2 border border-border bg-card/50 p-1 sm:w-auto">
					<button
						onClick={() => {
							setLibraryMode("assets");
							setIsLoading(true);
						}}
						className={`flex flex-1 items-center justify-center gap-2 px-3 py-2 font-bold text-[9px] uppercase tracking-widest transition-all min-[400px]:px-4 min-[400px]:py-3 min-[400px]:text-[10px] ${libraryMode === "assets" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-primary"}`}
					>
						<Grid size={14} className="shrink-0" />
						<span>Assets</span>
					</button>
					<button
						onClick={() => {
							setLibraryMode("consistency");
							setIsLoading(true);
						}}
						className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 font-bold text-[10px] uppercase tracking-widest transition-all ${libraryMode === "consistency" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-primary"}`}
					>
						<Layers size={14} className="shrink-0" />
						<span>Consistency</span>
					</button>
				</div>
			</div>

			<div className="space-y-8">
				<h1 className="font-serif text-3xl text-primary italic">
					{libraryMode === "assets" ? "Library" : "Consistency"}
				</h1>
				<nav className="space-y-1">
					{categories.map((cat) => (
						<button
							key={cat.name}
							onClick={() => setSelectedCategory(cat.name)}
							className={`group flex w-full items-center justify-between px-4 py-3 font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${
								selectedCategory === cat.name
									? "bg-primary text-primary-foreground shadow-xl"
									: "text-muted-foreground hover:bg-muted hover:text-primary"
							}`}
						>
							<span className="flex items-center gap-3">
								<div
									className={`h-1 w-1 rounded-full transition-all ${selectedCategory === cat.name ? "scale-100 bg-accent" : "scale-0 bg-transparent"}`}
								/>
								{cat.name}
							</span>
							<span
								className={`font-mono text-[8px] italic opacity-40 group-hover:opacity-100 ${selectedCategory === cat.name ? "text-white/60" : ""}`}
							>
								({cat.count})
							</span>
						</button>
					))}
				</nav>
			</div>

			<div className="space-y-8">
				<h3 className="font-bold text-[10px] text-accent uppercase tracking-[0.3em]">
					Visual DNA Tags
				</h3>
				<div className="flex flex-wrap gap-2">
					{["High-Poly", "Matte", "Lead", "Atmospheric", "Noir", "Vibrant"].map(
						(tag) => (
							<Badge
								key={tag}
								className="cursor-pointer border-border bg-card px-3 py-1 text-muted-foreground italic hover:border-accent hover:text-accent"
							>
								{tag}
							</Badge>
						),
					)}
				</div>
			</div>

			<div className="mt-auto border-border/50 border-t pt-10">
				<div className="space-y-4 bg-primary p-6">
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
		</div>
	);

	return (
		<div className="flex h-full overflow-hidden bg-background">
			{/* Sidebar - Desktop */}
			<aside className="hidden w-80 shrink-0 overflow-y-auto border-border border-r bg-card/40 backdrop-blur-md lg:block">
				<SidebarContent />
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
									<SidebarContent />
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
							/* ===== CONSISTENCY LIBRARY VIEW ===== */
							<>
								{/* Consistency Tabs */}
								<div className="mb-12 border-border border-b">
									<nav className="flex gap-10">
										{consistencyTabs.map((tab) => (
											<button
												key={tab}
												onClick={() => {
													setConsistencyTab(tab);
													setIsLoading(true);
												}}
												className={`pb-4 font-bold text-[10px] uppercase tracking-widest transition-colors ${consistencyTab === tab ? "-mb-px border-primary border-b-2 text-primary" : "text-muted-foreground hover:text-primary"}`}
											>
												{tab}
											</button>
										))}
									</nav>
								</div>

								{/* Header */}
								<div className="mb-12 flex items-end justify-between">
									<div>
										<h1 className="mb-2 font-serif text-4xl text-primary italic">
											Consistency Library
										</h1>
										<p className="text-muted-foreground text-xs tracking-wide">
											Maintain character, environment, and style continuity
											across all scenes.
										</p>
									</div>
									<Button className="h-12 rounded-none px-8 font-bold text-[10px] uppercase tracking-widest shadow-none">
										<Plus size={16} className="mr-2" />
										New Identity
									</Button>
								</div>

								{isLoading ? (
									<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
										{Array.from({ length: 4 }).map((_, i) => (
											<div key={i} className="border border-border bg-card">
												<Skeleton className="aspect-3/4 w-full bg-muted" />
												<div className="space-y-4 p-5">
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
										<div className="mb-20 grid grid-cols-2 gap-8 md:grid-cols-4">
											{mockIdentities.map((identity) => (
												<div
													key={identity.id}
													className="group cursor-pointer border border-border bg-card transition-all duration-500 hover:shadow-xl"
												>
													<div className="aspect-3/4 overflow-hidden bg-neutral-200">
														<img
															src={identity.image}
															alt={identity.name}
															className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
														/>
													</div>
													<div className="p-5">
														<div className="mb-4 flex items-start justify-between">
															<h3 className="font-serif text-xl">
																{identity.name}
															</h3>
															<Lock
																size={14}
																className="text-muted-foreground/40"
															/>
														</div>
														<div className="flex flex-wrap gap-2">
															{identity.traits.map((trait) => (
																<span
																	key={trait.name}
																	className="inline-flex items-center gap-1.5 border border-border bg-background px-2 py-1 font-bold text-[9px] uppercase tracking-widest"
																>
																	{trait.locked && (
																		<CheckCircle2
																			size={10}
																			className="text-accent"
																		/>
																	)}
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
											<div className="mb-8 flex items-end justify-between">
												<h2 className="font-serif text-3xl text-primary italic">
													Environments
												</h2>
												<button className="border-primary border-b pb-1 font-bold text-[10px] text-primary uppercase tracking-widest transition-colors hover:border-accent hover:text-accent">
													View All
												</button>
											</div>
											<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
												{mockEnvironments.map((env) => (
													<div
														key={env.id}
														className="group cursor-pointer border border-border bg-card transition-all duration-500 hover:shadow-xl"
													>
														<div className="aspect-21/9 overflow-hidden bg-neutral-200">
															<img
																src={env.image}
																alt={env.name}
																className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
															/>
														</div>
														<div className="flex items-center justify-between p-6">
															<div>
																<h3 className="font-serif text-2xl">
																	{env.name}
																</h3>
																<p className="mt-1 text-[10px] text-muted-foreground uppercase tracking-widest">
																	{env.subtitle}
																</p>
															</div>
															<div className="text-right">
																<div className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest">
																	Variations
																</div>
																<div className="font-medium text-[10px]">
																	{env.variations} Frames
																</div>
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
								<div className="mb-12 flex flex-col items-baseline justify-between gap-4 border-border border-b pb-8 md:flex-row">
									<div className="space-y-1">
										<h2 className="font-bold text-[10px] text-accent uppercase tracking-[0.4em]">
											Vault View //
										</h2>
										<h1 className="font-serif text-4xl text-primary italic">
											{selectedCategory} Collective
										</h1>
									</div>
									<div className="flex items-center gap-6">
										<button className="flex items-center gap-2 font-bold text-[10px] text-muted-foreground uppercase italic tracking-[0.2em] transition-all hover:text-primary">
											<Download size={14} />
											Export Manifest
										</button>
										<div className="h-4 w-px bg-border" />
										<span className="font-bold text-[10px] text-primary/40 uppercase italic tracking-[0.3em]">
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
										<div className="grid gap-px border border-border bg-border">
											{Array.from({ length: 6 }).map((_, i) => (
												<ListRowSkeleton key={i} />
											))}
										</div>
									)
								) : viewMode === "grid" ? (
									<div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
										{mockAssets.map((asset) => (
											<div
												key={asset.id}
												className="group flex cursor-pointer flex-col space-y-4"
											>
												<div className="relative aspect-square w-full overflow-hidden border border-border bg-white p-2 transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)]">
													<div className="relative h-full w-full overflow-hidden bg-linear-to-tr bg-muted from-muted to-card">
														<img
															src={asset.image}
															alt={asset.name}
															className="h-full w-full object-cover saturate-50 transition-transform duration-1000 group-hover:scale-110 group-hover:saturate-100"
														/>
														{/* Overlay Controls */}
														<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100">
															<Button className="h-10 rounded-none bg-primary-foreground px-6 font-bold text-[9px] text-primary uppercase tracking-widest transition-colors hover:bg-accent hover:text-primary-foreground">
																Add to Scene
															</Button>
														</div>
													</div>

													{/* Asset Options Icon */}
													<div className="absolute top-4 right-4 z-20">
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<button
																	className="flex h-8 w-8 items-center justify-center border border-border bg-card/90 shadow-sm backdrop-blur transition-colors hover:bg-card"
																	onClick={(e) => e.stopPropagation()}
																>
																	<MoreVertical size={14} strokeWidth={1.5} />
																</button>
															</DropdownMenuTrigger>
															<DropdownMenuContent
																align="end"
																className="rounded-none border-border"
															>
																<DropdownMenuItem className="flex items-center gap-3 px-4 py-2 font-bold text-[10px] uppercase tracking-widest">
																	<Share2 size={12} /> Share DNA
																</DropdownMenuItem>
																<DropdownMenuItem className="flex items-center gap-3 px-4 py-2 font-bold text-[10px] uppercase tracking-widest">
																	<Download size={12} /> Download
																</DropdownMenuItem>
																<DropdownMenuSeparator />
																<DropdownMenuItem className="flex items-center gap-3 px-4 py-2 font-bold text-[10px] text-red-600 uppercase tracking-widest">
																	<Trash2 size={12} /> Purge Asset
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</div>
												</div>

												<div className="space-y-1">
													<h3 className="font-bold text-[11px] text-primary uppercase tracking-[0.2em] transition-colors group-hover:text-accent">
														{asset.name}
													</h3>
													<div className="flex items-center justify-between font-serif text-[9px] text-muted-foreground italic">
														<span>{asset.type}</span>
														<span className="font-bold font-sans uppercase not-italic tracking-tighter opacity-40">
															{asset.lastUsed}
														</span>
													</div>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="-mx-4 overflow-x-auto px-4">
										<div className="grid min-w-[700px] gap-px border border-border bg-border">
											{mockAssets.map((asset) => (
												<div
													key={asset.id}
													className="group grid cursor-pointer grid-cols-12 items-center gap-6 bg-card p-6 transition-all hover:bg-muted/50"
												>
													<div className="col-span-1 aspect-square w-14 border border-border bg-card p-1">
														<div className="h-full w-full overflow-hidden bg-gray-50">
															<img
																src={asset.image}
																alt={asset.name}
																className="h-full w-full object-cover saturate-50 transition-all duration-700 group-hover:saturate-100"
															/>
														</div>
													</div>
													<div className="col-span-4 pl-4">
														<h4 className="mb-1 font-bold text-[11px] text-primary uppercase tracking-[0.2em]">
															{asset.name}
														</h4>
														<p className="font-serif text-[9px] text-muted-foreground italic">
															Visual Model ID: SG-{asset.id}992
														</p>
													</div>
													<div className="col-span-2">
														<span className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-[0.2em]">
															{asset.type}
														</span>
													</div>
													<div className="col-span-3 flex flex-wrap gap-2">
														{asset.tags.map((tag) => (
															<span
																key={tag}
																className="font-bold text-[8px] text-accent/50 uppercase tracking-[0.2em] transition-colors group-hover:text-accent"
															>
																#{tag.toLowerCase()}
															</span>
														))}
													</div>
													<div className="col-span-2 text-right">
														<div className="font-bold font-sans text-[9px] text-primary/30 uppercase tracking-widest transition-colors group-hover:text-primary">
															Last Integrated
														</div>
														<div className="font-medium text-[11px] text-muted-foreground">
															{asset.lastUsed}
														</div>
													</div>
												</div>
											))}
										</div>
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
