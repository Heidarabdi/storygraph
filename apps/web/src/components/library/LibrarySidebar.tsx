import { Grid, Layers } from "lucide-react";

interface SidebarProps {
	libraryMode: "assets" | "consistency";
	setLibraryMode: (mode: "assets" | "consistency") => void;
	selectedCategory: string;
	setSelectedCategory: (cat: string) => void;
	assetCount: number;
}

export function LibrarySidebar({
	libraryMode,
	setLibraryMode,
	selectedCategory,
	setSelectedCategory,
	assetCount,
}: SidebarProps) {
	const categories = [
		{ name: "All", count: assetCount },
		{ name: "Characters", count: 0 },
		{ name: "Environments", count: 0 },
		{ name: "Props", count: 0 },
	];

	return (
		<div className="flex h-full flex-col space-y-12 bg-card/40 p-8 backdrop-blur-md lg:p-10">
			{/* Mode Toggle */}
			<div className="space-y-4">
				<div className="flex w-full items-center gap-2 border border-border bg-card/50 p-1">
					<button
						onClick={() => setLibraryMode("assets")}
						className={`flex flex-1 items-center justify-center gap-2 px-3 py-2 font-bold text-[9px] uppercase tracking-widest transition-all ${libraryMode === "assets" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-primary"}`}
					>
						<Grid size={14} />
						<span>Assets</span>
					</button>
					<button
						onClick={() => setLibraryMode("consistency")}
						className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 font-bold text-[10px] uppercase tracking-widest transition-all ${libraryMode === "consistency" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-primary"}`}
					>
						<Layers size={14} />
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
						</button>
					))}
				</nav>
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
}
