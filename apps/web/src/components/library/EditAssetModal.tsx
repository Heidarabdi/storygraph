import { api } from "@storygraph/backend/convex/_generated/api";
import type { Id } from "@storygraph/backend/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFileUpload } from "@/hooks/useFileUpload";

interface Asset {
	_id: string;
	name: string;
	description?: string;
	categoryId: string;
	orgId: string;
	referenceImages?: string[];
}

interface EditAssetModalProps {
	isOpen: boolean;
	onClose: () => void;
	asset: Asset;
}

export function EditAssetModal({
	isOpen,
	onClose,
	asset,
}: EditAssetModalProps) {
	const [name, setName] = useState(asset.name);
	const [description, setDescription] = useState(asset.description || "");
	const [selectedCategoryId, setSelectedCategoryId] = useState(
		asset.categoryId,
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [previewImage, setPreviewImage] = useState<string | null>(
		asset.referenceImages?.[0] || null,
	);
	const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(
		asset.referenceImages?.[0] || null,
	);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const updateAsset = useMutation(api.assets.update);
	const { upload, isUploading } = useFileUpload();

	const categories = useQuery(
		api.assetCategories.listAll,
		asset.orgId ? { orgId: asset.orgId as Id<"organizations"> } : "skip",
	);

	// Sync form state when asset changes
	useEffect(() => {
		setName(asset.name);
		setDescription(asset.description || "");
		setSelectedCategoryId(asset.categoryId);
		setPreviewImage(asset.referenceImages?.[0] || null);
		setUploadedImageUrl(asset.referenceImages?.[0] || null);
	}, [asset]);

	const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = () => {
			setPreviewImage(reader.result as string);
		};
		reader.readAsDataURL(file);

		try {
			const { storageId, url } = await upload(file);
			setUploadedImageUrl(url || storageId);
		} catch (error) {
			console.error("Failed to upload image:", error);
			setPreviewImage(asset.referenceImages?.[0] || null);
		}
	};

	const handleRemoveImage = () => {
		setPreviewImage(null);
		setUploadedImageUrl(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || !selectedCategoryId) return;

		setIsSubmitting(true);
		try {
			await updateAsset({
				id: asset._id as Id<"assets">,
				name: name.trim(),
				description: description.trim() || undefined,
				categoryId: selectedCategoryId as Id<"assetCategories">,
				referenceImages: uploadedImageUrl ? [uploadedImageUrl] : undefined,
			});
			onClose();
		} catch (error) {
			console.error("Failed to update asset:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-none border-border p-0 sm:w-full">
				<form onSubmit={handleSubmit} className="p-6 md:p-8">
					<DialogHeader>
						<DialogTitle className="font-serif text-3xl text-primary italic tracking-tight">
							Edit Asset
						</DialogTitle>
						<DialogDescription className="mt-2 font-serif text-[11px] text-muted-foreground uppercase italic tracking-widest">
							Update your asset details.
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-6 py-8">
						{/* Asset Name */}
						<div className="space-y-4">
							<Label
								htmlFor="name"
								className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-[0.4em]"
							>
								{"Asset Name //"}
							</Label>
							<Input
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Asset name"
								className="h-auto! rounded-none border-border border-x-0 border-t-0 border-b-2 bg-transparent px-0 py-0 pb-0 font-serif text-2xl! italic leading-none shadow-none focus-visible:border-primary focus-visible:ring-0"
								autoFocus
							/>
						</div>

						{/* Category Selector */}
						<div className="space-y-4">
							<Label className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-[0.4em]">
								{"Category //"}
							</Label>
							<Select
								value={selectedCategoryId}
								onValueChange={setSelectedCategoryId}
							>
								<SelectTrigger className="h-12 rounded-none border-border bg-muted/20 font-bold text-[10px] uppercase tracking-widest focus:ring-0 focus:ring-offset-0">
									<SelectValue placeholder="Select Category" />
								</SelectTrigger>
								<SelectContent className="rounded-none border-border">
									{categories?.map((cat) => (
										<SelectItem
											key={cat._id}
											value={cat._id}
											className="font-bold text-[10px] uppercase tracking-widest"
										>
											{cat.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Description */}
						<div className="space-y-3">
							<Label
								htmlFor="description"
								className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-[0.4em]"
							>
								{"Description //"}
								<span className="ml-2 text-muted-foreground/40 normal-case tracking-normal">
									optional
								</span>
							</Label>
							<Textarea
								id="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Asset description..."
								rows={3}
								className="resize-none rounded-none border-border border-x-0 border-t-0 border-b bg-transparent px-0 py-0 pb-1 text-sm shadow-none focus-visible:border-primary focus-visible:ring-0"
							/>
						</div>

						{/* Reference Image Upload */}
						<div className="space-y-3">
							<Label className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-[0.4em]">
								{"Visual Reference //"}
								<span className="ml-2 text-muted-foreground/40 normal-case tracking-normal">
									optional
								</span>
							</Label>

							{previewImage ? (
								<div className="relative h-32 w-32 overflow-hidden border border-border bg-muted/20">
									<img
										src={previewImage}
										alt="Preview"
										className="h-full w-full object-cover"
									/>
									{isUploading && (
										<div className="absolute inset-0 flex items-center justify-center bg-black/50">
											<Loader2 className="h-5 w-5 animate-spin text-white" />
										</div>
									)}
									<button
										type="button"
										onClick={handleRemoveImage}
										className="absolute top-1 right-1 border border-border bg-background/80 p-1 text-foreground transition-colors hover:bg-background"
									>
										<X className="h-3 w-3" />
									</button>
								</div>
							) : (
								<button
									type="button"
									onClick={() => fileInputRef.current?.click()}
									disabled={isUploading}
									className="flex h-12 w-full cursor-pointer items-center gap-3 border border-border border-dashed bg-muted/10 px-4 transition-colors hover:border-primary/50 hover:bg-muted/20 disabled:opacity-50"
								>
									<ImagePlus className="h-5 w-5 text-muted-foreground/40" />
									<span className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-widest">
										Upload Reference
									</span>
								</button>
							)}

							<input
								ref={fileInputRef}
								type="file"
								accept="image/*"
								onChange={handleImageSelect}
								className="hidden"
							/>
						</div>
					</div>

					<DialogFooter className="flex-col gap-3 sm:flex-row sm:justify-end">
						<Button
							type="button"
							variant="ghost"
							onClick={onClose}
							className="h-12 rounded-none px-8 font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-muted"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={
								isSubmitting ||
								isUploading ||
								!name.trim() ||
								!selectedCategoryId
							}
							className="h-12 rounded-none px-10 font-bold text-[10px] uppercase tracking-widest shadow-xl transition-all"
						>
							{isSubmitting ? (
								<span className="flex items-center gap-2">
									<div className="h-2 w-2 animate-ping rounded-full bg-accent" />
									Saving...
								</span>
							) : (
								"Save Changes"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
