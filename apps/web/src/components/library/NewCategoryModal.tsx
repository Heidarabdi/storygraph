import { api } from "@storygraph/backend/convex/_generated/api";
import type { Id } from "@storygraph/backend/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Users,
  Mountain,
  Map,
  Box,
  Sword,
  Car,
  Zap,
  Tag,
  LayoutGrid,
} from "lucide-react";

interface NewCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgId: string | null;
}

const CATEGORY_ICONS = [
  { id: "User", icon: User, label: "Character" },
  { id: "Users", icon: Users, label: "Crowd" },
  { id: "Mountain", icon: Mountain, label: "Environment" },
  { id: "Map", icon: Map, label: "Location" },
  { id: "Box", icon: Box, label: "Prop" },
  { id: "Sword", icon: Sword, label: "Weapon" },
  { id: "Car", icon: Car, label: "Vehicle" },
  { id: "Zap", icon: Zap, label: "Effect" },
  { id: "Tag", icon: Tag, label: "General" },
  { id: "LayoutGrid", icon: LayoutGrid, label: "Collection" },
];

export function NewCategoryModal({
  isOpen,
  onClose,
  orgId,
}: NewCategoryModalProps) {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("Tag");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createCategory = useMutation(api.assetCategories.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !orgId) return;

    setIsSubmitting(true);
    try {
      await createCategory({
        name: name.trim(),
        orgId: orgId as Id<"organizations">,
        icon: selectedIcon,
      });
      onClose();
      setName("");
      setSelectedIcon("Tag");
    } catch (error) {
      console.error("Failed to create category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-none border-border p-0 sm:w-full">
        <form onSubmit={handleSubmit} className="p-8 md:p-10">
          <DialogHeader className="mb-8">
            <div className="space-y-1">
              <p className="font-bold text-[10px] text-accent uppercase tracking-[0.3em]">
                {"New Sector Archive //"}
              </p>
              <DialogTitle className="font-serif text-4xl text-primary italic">
                Initialize Sector
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-8 py-4">
            {/* Category Name */}
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="font-bold text-[10px] text-muted-foreground/50 uppercase tracking-[0.3em]"
              >
                {"Sector Identity //"}
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                placeholder="e.g. CORE PROTOTYPES"
                className="h-auto rounded-none border-border border-b bg-transparent p-0 pb-4 font-serif text-2xl italic shadow-none focus-visible:border-primary focus-visible:ring-0"
                autoFocus
              />
            </div>

            {/* Icon Selection */}
            <div className="space-y-3">
              <Label className="font-bold text-[10px] text-muted-foreground/50 uppercase tracking-[0.3em]">
                {"Visual Marker //"}
              </Label>
              <div className="grid grid-cols-5 gap-2">
                {CATEGORY_ICONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedIcon(item.id)}
                    className={`flex h-12 items-center justify-center transition-all border ${
                      selectedIcon === item.id
                        ? "bg-primary text-primary-foreground border-primary shadow-lg"
                        : "bg-muted/10 text-muted-foreground border-border/50 hover:bg-muted/30 hover:text-primary"
                    }`}
                    title={item.label}
                  >
                    <item.icon size={18} />
                  </button>
                ))}
              </div>
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
              disabled={isSubmitting || !name.trim() || !orgId}
              className="h-12 rounded-none px-10 font-bold text-[10px] uppercase tracking-widest shadow-xl transition-all"
            >
              {isSubmitting ? "Establishing..." : "Initialize Sector"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
