import { api } from "@storygraph/backend/convex/_generated/api";
import type { Id } from "@storygraph/backend/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useState, useEffect, useRef } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { useFileUpload } from "@/hooks/useFileUpload";

interface NewAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgId: string | null;
  defaultCategoryId: string | null;
}

export function NewAssetModal({
  isOpen,
  onClose,
  orgId,
  defaultCategoryId,
}: NewAssetModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    defaultCategoryId || "",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createAsset = useMutation(api.assets.create);
  const { upload, isUploading } = useFileUpload();

  const categories = useQuery(
    api.assetCategories.listAll,
    orgId ? { orgId: orgId as Id<"organizations"> } : "skip",
  );

  // Sync selected category if defaultCategoryId changes
  useEffect(() => {
    if (defaultCategoryId) {
      setSelectedCategoryId(defaultCategoryId);
    }
  }, [defaultCategoryId]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setDescription("");
      setPreviewImage(null);
      setUploadedImageUrl(null);
      if (!defaultCategoryId) setSelectedCategoryId("");
    }
  }, [isOpen, defaultCategoryId]);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload the file
    try {
      const { storageId, url } = await upload(file);
      setUploadedImageUrl(url || storageId);
    } catch (error) {
      console.error("Failed to upload image:", error);
      setPreviewImage(null);
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
    if (!name.trim() || !orgId || !selectedCategoryId) return;

    setIsSubmitting(true);
    try {
      await createAsset({
        orgId: orgId as Id<"organizations">,
        categoryId: selectedCategoryId as Id<"assetCategories">,
        name: name.trim(),
        description: description.trim() || undefined,
        referenceImages: uploadedImageUrl ? [uploadedImageUrl] : undefined,
      });
      onClose();
    } catch (error) {
      console.error("Failed to create asset:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentCategoryName =
    categories?.find((c) => c._id === selectedCategoryId)?.name || "";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-none border-border p-0 sm:w-full">
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <DialogHeader>
            <DialogTitle className="font-serif text-3xl text-primary italic tracking-tight">
              New Asset
            </DialogTitle>
            <DialogDescription className="mt-2 font-serif text-[11px] text-muted-foreground uppercase italic tracking-widest">
              {defaultCategoryId && currentCategoryName
                ? `Cataloging into ${currentCategoryName}`
                : "Add a new element to your creative arsenal."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-8">
            {/* Asset Name */}
            <div className="space-y-4">
              <Label
                htmlFor="name"
                className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-[0.4em]"
              >
                {"Asset Identity //"}
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Luna // Protagonist"
                className="h-auto rounded-none border-border border-x-0 border-t-0 border-b-2 bg-transparent p-0 pb-4 font-serif text-2xl italic shadow-none focus-visible:border-primary focus-visible:ring-0"
                autoFocus
              />
            </div>

            {/* Category Selector (Only shown if NOT in a specific category) */}
            {!defaultCategoryId && (
              <div className="space-y-4">
                <Label className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-[0.4em]">
                  {"Category //"}
                </Label>
                <Select
                  value={selectedCategoryId}
                  onValueChange={setSelectedCategoryId}
                >
                  <SelectTrigger className="h-12 rounded-none border-border font-bold text-[10px] uppercase tracking-widest bg-muted/20 focus:ring-0 focus:ring-offset-0">
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
            )}

            {/* Description - Compact */}
            <div className="space-y-3">
              <Label
                htmlFor="description"
                className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-[0.4em]"
              >
                {"Manifest //"}
                <span className="ml-2 text-muted-foreground/40 normal-case tracking-normal">
                  optional
                </span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Key visual and narrative characteristics..."
                rows={3}
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
                className="rounded-none border-border border-x-0 border-t-0 border-b bg-transparent p-0 pb-4 text-sm shadow-none resize-none focus-visible:border-primary focus-visible:ring-0 [field-sizing:initial]"
              />
            </div>

            {/* Reference Image Upload - Compact inline */}
            <div className="space-y-3">
              <Label className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-[0.4em]">
                {"Visual Reference //"}
                <span className="ml-2 text-muted-foreground/40 normal-case tracking-normal">
                  optional
                </span>
              </Label>

              {previewImage ? (
                <div className="relative w-32 h-32 overflow-hidden border border-border bg-muted/20">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Loader2 className="h-5 w-5 animate-spin text-white" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 p-1 bg-background/80 hover:bg-background border border-border text-foreground transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-3 w-full h-12 px-4 border border-dashed border-border hover:border-primary/50 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer disabled:opacity-50"
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
            {!orgId && (
              <p className="w-full text-center font-bold text-[9px] text-red-500 uppercase tracking-widest sm:text-left">
                ⚠️ No Active Organization Selected
              </p>
            )}
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
                !orgId ||
                !selectedCategoryId
              }
              className="h-12 rounded-none px-10 font-bold text-[10px] uppercase tracking-widest shadow-xl transition-all"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-ping rounded-full bg-accent" />
                  Cataloging...
                </span>
              ) : (
                "Catalog Asset"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
