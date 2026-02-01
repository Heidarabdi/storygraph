import { api } from "@storygraph/backend/convex/_generated/api";
import type { Id } from "@storygraph/backend/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useState, useEffect } from "react";
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
  const [imageUrl, setImageUrl] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    defaultCategoryId || "",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createAsset = useMutation(api.assets.create);

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

  const currentCategoryName =
    categories?.find((c) => c._id === selectedCategoryId)?.name || "General";

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
        referenceImages: imageUrl.trim() ? [imageUrl.trim()] : undefined,
      });
      onClose();
      setName("");
      setDescription("");
      setImageUrl("");
    } catch (error) {
      console.error("Failed to catalog asset:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-none border-border p-0 sm:w-full">
        <form onSubmit={handleSubmit} className="p-8 md:p-10">
          <DialogHeader className="mb-8">
            <div className="space-y-1">
              <p className="font-bold text-[10px] text-accent uppercase tracking-[0.3em]">
                {defaultCategoryId
                  ? `New Manifest Entry // ${currentCategoryName}`
                  : "New Manifest Entry // Classification Required"}
              </p>
              <DialogTitle className="font-serif text-4xl text-primary italic">
                Initialize Asset
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-8 py-4">
            {/* Asset Name */}
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="font-bold text-[10px] text-muted-foreground/50 uppercase tracking-[0.3em]"
              >
                {"Asset Identity //"}
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                placeholder="e.g. ALPHA_VOID_RUNNER"
                className="h-auto rounded-none border-border border-b bg-transparent p-0 pb-4 font-serif text-2xl italic shadow-none focus-visible:border-primary focus-visible:ring-0"
                autoFocus
              />
            </div>

            {/* Category Selector (Only shown if NOT in a specific category) */}
            {!defaultCategoryId && (
              <div className="space-y-3">
                <Label className="font-bold text-[10px] text-muted-foreground/50 uppercase tracking-[0.3em]">
                  {"Assign to Category //"}
                </Label>
                <Select
                  value={selectedCategoryId}
                  onValueChange={setSelectedCategoryId}
                >
                  <SelectTrigger className="rounded-none border-border h-12 font-bold text-[10px] uppercase tracking-widest bg-muted/20">
                    <SelectValue placeholder="SELECT CATEGORY" />
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

            {/* Description */}
            <div className="space-y-3">
              <Label
                htmlFor="description"
                className="font-bold text-[10px] text-muted-foreground/50 uppercase tracking-[0.3em]"
              >
                {"Detailed Manifest //"}
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
                placeholder="Describe the physical and narrative properties..."
                className="min-h-[120px] rounded-none border-border border-b bg-transparent p-0 py-2 font-serif text-lg italic shadow-none focus-visible:border-primary focus-visible:ring-0"
              />
            </div>

            {/* Image Placeholder */}
            <div className="space-y-3">
              <Label
                htmlFor="image"
                className="font-bold text-[10px] text-muted-foreground/50 uppercase tracking-[0.3em]"
              >
                {"Visual Reference //"}
              </Label>
              <Input
                id="image"
                value={imageUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setImageUrl(e.target.value)
                }
                placeholder="CONVEX STORAGE ID OR IMAGE URL"
                className="h-10 rounded-none border-border border bg-muted/10 px-4 font-bold text-[10px] uppercase tracking-widest focus-visible:border-primary focus-visible:ring-0 shadow-none"
              />
            </div>
          </div>

          <DialogFooter className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-end">
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
                isSubmitting || !name.trim() || !orgId || !selectedCategoryId
              }
              className="h-12 rounded-none px-10 font-bold text-[10px] uppercase tracking-widest shadow-xl transition-all"
            >
              {isSubmitting ? "Cataloging..." : "Catalog Asset"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
