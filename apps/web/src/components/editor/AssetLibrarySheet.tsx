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
			className="flex w-[450px] flex-col border-border p-0"
		>
			<SheetHeader className="shrink-0 border-border border-b bg-card p-8">
				<div>
					<SheetTitle className="mb-1 font-serif text-2xl italic">
						Assets Library
					</SheetTitle>
					<p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] opacity-60">
						Resource DNA Manifest
					</p>
				</div>
			</SheetHeader>

			<div className="custom-scrollbar flex-1 overflow-y-auto bg-card/10">
				{Object.entries(groupedAssets).map(([catId, group]) => {
					const catAssets = group?.assets || [];
					return (
						<div key={catId} className="mb-10 last:mb-0">
							{/* Category Header */}
							<div className="sticky top-0 z-10 border-border/50 border-b bg-background/90 px-8 py-4 backdrop-blur-md">
								<h4 className="flex items-center justify-between font-bold text-[9px] text-accent uppercase tracking-[0.4em]">
									{group?.name || "Category"}
									<span className="font-serif text-[11px] text-muted-foreground/40 italic tracking-normal">
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
										<div className="relative aspect-3/4 w-full overflow-hidden border border-border bg-card transition-all group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-2xl">
											<img
												src={
													asset.referenceImages?.[0] ||
													`https://api.dicebear.com/7.x/shapes/svg?seed=${asset.name}`
												}
												alt={asset.name}
												className="h-full w-full object-cover saturate-[0.1] transition-all duration-700 group-hover:scale-110 group-hover:saturate-100"
											/>
											<div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 p-1.5 backdrop-blur-sm transition-transform group-hover:translate-y-0">
												<p className="text-center font-bold text-[7px] text-white uppercase tracking-widest">
													Add to Frame
												</p>
											</div>
										</div>
										<div className="space-y-1 text-center">
											<p className="truncate font-bold text-[9px] text-primary uppercase tracking-widest transition-colors group-hover:text-accent">
												{asset.name}
											</p>
										</div>
									</button>
								))}
								{catAssets.length === 0 && (
									<div className="col-span-3 flex flex-col items-center justify-center gap-3 rounded-none border border-border/50 border-dashed bg-muted/5 py-10 text-center">
										<p className="text-[10px] text-muted-foreground uppercase italic tracking-widest opacity-40">
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
