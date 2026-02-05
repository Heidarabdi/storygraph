import { api } from "@storygraph/backend/convex/_generated/api";
import type { Id } from "@storygraph/backend/convex/_generated/dataModel";
import { useMutation } from "convex/react";
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
import { Textarea } from "@/components/ui/textarea";
import { useFileUpload } from "@/hooks/useFileUpload";

interface Project {
	_id: string;
	name: string;
	description?: string;
	thumbnail?: string;
}

interface EditProjectModalProps {
	isOpen: boolean;
	onClose: () => void;
	project: Project;
}

export function EditProjectModal({
	isOpen,
	onClose,
	project,
}: EditProjectModalProps) {
	const [name, setName] = useState(project.name);
	const [description, setDescription] = useState(project.description || "");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [previewImage, setPreviewImage] = useState<string | null>(
		project.thumbnail || null,
	);
	const [uploadedThumbnailUrl, setUploadedThumbnailUrl] = useState<
		string | null
	>(project.thumbnail || null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const updateProject = useMutation(api.projects.update);
	const { upload, isUploading } = useFileUpload();

	// Sync form state when project changes
	useEffect(() => {
		setName(project.name);
		setDescription(project.description || "");
		setPreviewImage(project.thumbnail || null);
		setUploadedThumbnailUrl(project.thumbnail || null);
	}, [project]);

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
			setUploadedThumbnailUrl(url || storageId);
		} catch (error) {
			console.error("Failed to upload thumbnail:", error);
			setPreviewImage(project.thumbnail || null);
		}
	};

	const handleRemoveImage = () => {
		setPreviewImage(null);
		setUploadedThumbnailUrl(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim()) return;

		setIsSubmitting(true);
		try {
			await updateProject({
				projectId: project._id as Id<"projects">,
				name: name.trim(),
				description: description.trim() || undefined,
				thumbnail: uploadedThumbnailUrl || undefined,
			});
			onClose();
		} catch (error) {
			console.error("Failed to update project:", error);
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
							Edit Project
						</DialogTitle>
						<DialogDescription className="mt-2 font-serif text-[11px] text-muted-foreground uppercase italic tracking-widest">
							Update your project details.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-6 py-8">
						{/* Project Name */}
						<div className="space-y-4">
							<Label
								htmlFor="name"
								className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-[0.4em]"
							>
								{"Project Name //"}
							</Label>
							<Input
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Project name"
								className="h-10 rounded-none border-border border-x-0 border-t-0 border-b-2 bg-transparent px-0 pt-5 pb-1 font-serif text-xl italic shadow-none focus-visible:border-primary focus-visible:ring-0"
								autoFocus
							/>
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
								placeholder="Project description..."
								rows={3}
								className="resize-none rounded-none border-border border-x-0 border-t-0 border-b bg-transparent px-0 py-0 pb-0 text-sm leading-normal shadow-none focus-visible:border-primary focus-visible:ring-0"
							/>
						</div>

						{/* Thumbnail Upload */}
						<div className="space-y-3">
							<Label className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-[0.4em]">
								{"Thumbnail //"}
								<span className="ml-2 text-muted-foreground/40 normal-case tracking-normal">
									optional
								</span>
							</Label>

							{previewImage ? (
								<div className="relative aspect-[2.39/1] w-full overflow-hidden border border-border bg-muted/20">
									<img
										src={previewImage}
										alt="Preview"
										className="h-full w-full object-cover"
									/>
									{isUploading && (
										<div className="absolute inset-0 flex items-center justify-center bg-black/50">
											<Loader2 className="h-6 w-6 animate-spin text-white" />
										</div>
									)}
									<button
										type="button"
										onClick={handleRemoveImage}
										className="absolute top-2 right-2 border border-border bg-background/80 p-1.5 text-foreground transition-colors hover:bg-background"
									>
										<X className="h-4 w-4" />
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
										Upload Thumbnail
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
							disabled={isSubmitting || isUploading || !name.trim()}
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
