import { api } from "@storygraph/backend/convex/_generated/api";
import type { Doc, Id } from "@storygraph/backend/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import {
	Box,
	Car,
	LayoutGrid,
	Map as MapIcon,
	Mountain,
	Plus,
	Sword,
	Tag,
	Trash2,
	User,
	Users,
	Zap,
} from "lucide-react";
import { useState } from "react";
import { NewAssetModal } from "./NewAssetModal";
import { NewCategoryModal } from "./NewCategoryModal";

interface LibrarySidebarProps {
	selectedCategoryId: string | null;
	onSelectCategory: (id: string | null) => void;
	orgId: string | null;
}

const CATEGORY_ICONS = [
	{ id: "User", icon: User, label: "Character" },
	{ id: "Users", icon: Users, label: "Crowd" },
	{ id: "Mountain", icon: Mountain, label: "Environment" },
	{ id: "Map", icon: MapIcon, label: "Location" },
	{ id: "Box", icon: Box, label: "Prop" },
	{ id: "Sword", icon: Sword, label: "Weapon" },
	{ id: "Car", icon: Car, label: "Vehicle" },
	{ id: "Zap", icon: Zap, label: "Effect" },
	{ id: "Tag", icon: Tag, label: "General" },
	{ id: "LayoutGrid", icon: LayoutGrid, label: "Collection" },
];

export function LibrarySidebar({
	selectedCategoryId,
	onSelectCategory,
	orgId,
}: LibrarySidebarProps) {
	const categories = useQuery(
		api.assetCategories.listAll,
		orgId ? { orgId: orgId as Id<"organizations"> } : "skip",
	);

	const removeCategory = useMutation(api.assetCategories.remove);
	const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
	const [isNewAssetModalOpen, setIsNewAssetModalOpen] = useState(false);

	const handleDelete = (
		e: React.MouseEvent,
		categoryId: Id<"assetCategories">,
	) => {
		e.stopPropagation();
		if (window.confirm("Are you sure you want to delete this category?")) {
			removeCategory({ id: categoryId });
			if (selectedCategoryId === categoryId) {
				onSelectCategory(null);
			}
		}
	};

	return (
		<div className="flex h-full flex-col bg-card/40 backdrop-blur-md">
			<nav className="flex-1 space-y-2 overflow-y-auto p-4 md:p-8">
				<div className="space-y-1">
					<button
						onClick={() => onSelectCategory(null)}
						className={`flex w-full items-center gap-3 px-4 py-3 font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${
							selectedCategoryId === null
								? "bg-primary text-primary-foreground shadow-xl"
								: "text-muted-foreground hover:bg-muted hover:text-primary"
						}`}
						type="button"
					>
						<LayoutGrid size={18} strokeWidth={1.5} />
						<span>All Assets</span>
					</button>

					{categories?.map((cat: Doc<"assetCategories">) => {
						const Icon =
							CATEGORY_ICONS.find((icon) => icon.id === cat.icon)?.icon || Tag;
						return (
							<div key={cat._id} className="group relative">
								<button
									onClick={() => onSelectCategory(cat._id)}
									className={`flex w-full items-center gap-3 px-4 py-3 font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${
										selectedCategoryId === cat._id
											? "bg-primary text-primary-foreground shadow-xl"
											: "text-muted-foreground hover:bg-muted hover:text-primary"
									}`}
									type="button"
								>
									<Icon size={18} strokeWidth={1.5} />
									<span className="truncate">{cat.name}</span>
								</button>
								{selectedCategoryId === cat._id && (
									<button
										onClick={(e) => handleDelete(e, cat._id)}
										className="absolute top-1/2 right-2 -translate-y-1/2 p-1.5 text-primary-foreground/40 opacity-0 transition-colors hover:text-accent group-hover:opacity-100"
										type="button"
									>
										<Trash2 size={14} />
									</button>
								)}
							</div>
						);
					})}
				</div>

				<div className="mt-8 border-border/50 border-t pt-8">
					<p className="mb-4 px-4 font-bold text-[9px] text-muted-foreground/40 uppercase tracking-[0.3em]">
						Actions
					</p>
					<div className="space-y-2">
						<button
							onClick={() => setIsNewCategoryModalOpen(true)}
							className="group flex w-full items-center gap-3 px-8 py-3 text-left font-bold text-[10px] text-muted-foreground uppercase tracking-[0.2em] transition-all hover:bg-muted hover:text-primary"
							type="button"
						>
							<Plus
								size={16}
								className="text-accent/40 transition-all group-hover:scale-110 group-hover:text-accent"
							/>
							<span>New Category</span>
						</button>

						<button
							onClick={() => setIsNewAssetModalOpen(true)}
							className="group flex w-full items-center gap-3 px-8 py-3 text-left font-bold text-[10px] text-muted-foreground uppercase tracking-[0.2em] transition-all hover:bg-muted hover:text-primary"
							type="button"
						>
							<Plus
								size={16}
								className="text-accent/40 transition-all group-hover:scale-110 group-hover:text-accent"
							/>
							<span>New Asset</span>
						</button>
					</div>
				</div>
			</nav>

			{/* Storage Metrics */}
			<div className="mt-auto border-border/50 border-t px-8 pt-10 pb-10">
				<div className="space-y-4 bg-primary p-8 shadow-xl">
					<p className="font-bold text-[9px] text-primary-foreground/40 uppercase tracking-widest">
						Storage Metric
					</p>
					<div className="h-1.5 w-full overflow-hidden bg-primary-foreground/10">
						<div className="h-full w-1/3 bg-accent" />
					</div>
					<p className="font-bold text-[10px] text-primary-foreground uppercase italic tracking-widest">
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
