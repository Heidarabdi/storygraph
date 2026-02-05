import { api } from "@storygraph/backend/convex/_generated/api";
import type { Id } from "@storygraph/backend/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
		(asset as { image?: string }).image ||
		`https://api.dicebear.com/7.x/shapes/svg?seed=${asset.name}`;

	const handleDelete = () => {
		removeAsset({ id: asset._id as Id<"assets"> });
	};

	if (viewMode === "list") {
		return (
			<>
				<div className="group grid cursor-pointer grid-cols-12 items-center gap-6 border-border/50 border-x border-b bg-card p-4 transition-all hover:bg-muted/30 md:p-6">
					<div className="col-span-2 aspect-square h-16 w-16 overflow-hidden border border-border bg-muted md:col-span-1 md:h-20 md:w-20">
						<img
							src={displayImage}
							alt={asset.name}
							className="h-full w-full object-cover saturate-50 transition-all duration-500 group-hover:scale-110 group-hover:saturate-100"
						/>
					</div>
					<div className="col-span-10 flex items-center justify-between pl-2 md:col-span-11 md:pl-4">
						<div className="space-y-1">
							<h4 className="font-bold text-primary text-xs uppercase tracking-[0.15em] md:text-sm">
								{asset.name}
							</h4>
							<p className="font-serif text-[10px] text-muted-foreground lowercase italic md:text-xs">
								{categoryName}
							</p>
						</div>

						<div className="flex items-center gap-6 md:gap-12">
							<div className="hidden md:block">
								<p className="mb-1 font-bold text-[9px] text-muted-foreground/30 uppercase tracking-[0.2em] md:text-[10px]">
									Access
								</p>
								<p className="font-bold text-primary text-xs uppercase tracking-tighter">
									Global
								</p>
							</div>

							<div className="flex items-center gap-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-primary"
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
											className="h-8 w-8 text-red-500 hover:bg-muted hover:text-red-600"
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
			<div className="group relative flex h-[420px] flex-col overflow-hidden border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
				{/* Portrait Image Area - Fills the top portion */}
				<div className="relative min-h-0 flex-1 overflow-hidden bg-neutral-200">
					<img
						src={displayImage}
						alt={asset.name}
						className="h-full w-full object-cover saturate-[0.4] transition-transform duration-700 group-hover:scale-105 group-hover:saturate-100"
					/>

					{/* Category Label Overlay */}
					<div className="absolute top-4 left-4">
						<div className="border border-border bg-background/80 px-3 py-1.5 backdrop-blur-md">
							<span className="font-bold text-primary text-xs uppercase tracking-wide">
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
									className="h-8 w-8 border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur transition-opacity hover:bg-black/70 hover:text-white group-hover:opacity-100"
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
									className="h-8 w-8 border border-white/20 bg-black/40 text-red-400 opacity-0 backdrop-blur transition-opacity hover:bg-red-600/80 hover:text-white group-hover:opacity-100"
									type="button"
								>
									<Trash2 size={16} />
								</Button>
							}
						/>
					</div>
				</div>

				{/* Asset Info Footer */}
				<div className="border-border border-t p-5">
					<h4 className="mb-1 font-bold text-primary text-sm uppercase tracking-wide">
						{asset.name}
					</h4>
					{asset.description && (
						<p className="line-clamp-2 font-serif text-muted-foreground text-xs italic">
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
