import { Download, MoreVertical, Share2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Asset {
	_id: string;
	name: string;
	type: string;
	image?: string;
	lastUsed?: string;
}

interface AssetCardProps {
	asset: Asset;
	viewMode: "grid" | "list";
}

export function AssetCard({ asset, viewMode }: AssetCardProps) {
	if (viewMode === "list") {
		return (
			<div className="group grid cursor-pointer grid-cols-12 items-center gap-6 bg-card p-6 transition-all hover:bg-muted/50">
				<div className="col-span-1 aspect-square w-14 border border-border bg-card p-1">
					<div className="h-full w-full overflow-hidden bg-gray-50">
						<img
							src={
								asset.image ||
								"https://api.dicebear.com/7.x/avataaars/svg?seed=Asset"
							}
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
						Visual Model ID: SG-{asset._id.slice(-6)}
					</p>
				</div>
				<div className="col-span-2">
					<span className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-[0.2em]">
						{asset.type}
					</span>
				</div>
				<div className="col-span-3" />
				<div className="col-span-2 text-right">
					<div className="font-bold font-sans text-[9px] text-primary/30 uppercase tracking-widest">
						Last Integrated
					</div>
					<div className="font-medium text-[11px] text-muted-foreground">
						{asset.lastUsed || "Just now"}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="group flex cursor-pointer flex-col space-y-4">
			<div className="relative aspect-square w-full overflow-hidden border border-border bg-white p-2 transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-2xl">
				<div className="relative h-full w-full overflow-hidden bg-linear-to-tr bg-muted from-muted to-card">
					<img
						src={
							asset.image ||
							"https://api.dicebear.com/7.x/avataaars/svg?seed=Asset"
						}
						alt={asset.name}
						className="h-full w-full object-cover saturate-50 transition-transform duration-1000 group-hover:scale-110 group-hover:saturate-100"
					/>
					<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100">
						<Button className="h-10 rounded-none bg-primary-foreground px-6 font-bold text-[9px] text-primary uppercase tracking-widest transition-colors hover:bg-accent hover:text-primary-foreground">
							Add to Scene
						</Button>
					</div>
				</div>

				<div className="absolute top-4 right-4 z-20">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								className="flex h-8 w-8 items-center justify-center border border-border bg-card/90 shadow-sm backdrop-blur transition-colors hover:bg-card"
								type="button"
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
						{asset.lastUsed || "NEW"}
					</span>
				</div>
			</div>
		</div>
	);
}
