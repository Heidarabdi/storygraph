import { api } from "@storygraph/backend/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Camera, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFileUpload } from "@/hooks/useFileUpload";

export default function ProfileSettings() {
  const user = useQuery(api.users.viewer);
  const updateUser = useMutation(api.users.update);
  const { upload, isUploading } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local form state
  const [name, setName] = useState("");
  const [role, setRole] = useState("Creative Director");
  const [bio, setBio] = useState("");
  const [showDirectory, setShowDirectory] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync form state with user data when it loads
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setRole(user.role || "Creative Director");
      setBio(user.bio || "");
      setShowDirectory(user.showInDirectory ?? true);
    }
  }, [user]);

  // Track changes
  useEffect(() => {
    if (!user) return;
    const changed =
      name !== (user.name || "") ||
      role !== (user.role || "Creative Director") ||
      bio !== (user.bio || "") ||
      showDirectory !== (user.showInDirectory ?? true);
    setHasChanges(changed);
  }, [name, role, bio, showDirectory, user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { url, storageId } = await upload(file);
      await updateUser({ image: url || storageId });
    } catch (error) {
      console.error("Failed to upload avatar:", error);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      await updateUser({ image: undefined });
    } catch (error) {
      console.error("Failed to remove avatar:", error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUser({
        name: name.trim() || undefined,
        role: role || undefined,
        bio: bio.trim() || undefined,
        showInDirectory: showDirectory,
      });
      setHasChanges(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscard = () => {
    if (user) {
      setName(user.name || "");
      setRole(user.role || "Creative Director");
      setBio(user.bio || "");
      setShowDirectory(user.showInDirectory ?? true);
    }
  };

  // User.image is already a resolved URL from the viewer query
  const avatarUrl =
    user?.image ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`;

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="fade-in slide-in-from-bottom-4 animate-in duration-500">
      <header className="mb-8 md:mb-10">
        <h1 className="mb-2 font-serif text-3xl italic md:text-4xl">
          Profile Settings
        </h1>
        <p className="text-muted-foreground text-xs tracking-wide md:text-sm">
          Manage your professional presence within the studio.
        </p>
      </header>

      <section className="space-y-12">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-6 border-border border-b pb-10 md:flex-row md:items-start md:gap-8">
          <div className="group relative shrink-0">
            <div className="h-24 w-24 overflow-hidden bg-primary md:h-32 md:w-32">
              <img
                alt={name || "Profile"}
                className="h-full w-full object-cover opacity-90"
                src={avatarUrl}
              />
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                </div>
              )}
            </div>
            <button
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera size={20} className="text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>
          <div className="w-full flex-1 text-center md:text-left">
            <h3 className="mb-4 font-bold text-[10px] uppercase tracking-[0.2em] md:text-xs">
              Avatar Image
            </h3>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="w-full bg-primary px-6 py-2.5 font-bold text-[10px] text-primary-foreground uppercase tracking-widest transition-all hover:bg-neutral-800 sm:w-auto disabled:opacity-50"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload New"}
              </button>
              <button
                className="w-full border border-border px-6 py-2.5 font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-all hover:bg-muted sm:w-auto"
                type="button"
                onClick={handleRemoveAvatar}
              >
                Remove
              </button>
            </div>
            <p className="mt-4 text-[9px] text-muted-foreground italic md:text-[10px]">
              Recommended: 400x400px, JPG or PNG. Max 2MB.
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
              Full Name
            </label>
            <input
              className="w-full rounded-none border border-border bg-card/50 px-4 py-3 text-foreground text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="e.g. Julian Thorne"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
              Professional Role
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-none border border-border bg-card/50 px-4 py-3 text-foreground text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option className="bg-card">Creative Director</option>
                <option className="bg-card">Director of Photography</option>
                <option className="bg-card">Production Designer</option>
                <option className="bg-card">Concept Artist</option>
                <option className="bg-card">Executive Producer</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <title>Toggle Role Dropdown</title>
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
              Professional Bio
            </label>
            <textarea
              className="w-full resize-none rounded-none border border-border bg-card/50 px-4 py-3 text-foreground text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Briefly describe your cinematic focus..."
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>

        {/* Public Visibility */}
        <div className="space-y-6 border-border border-t pt-6">
          <h3 className="font-bold text-xs uppercase tracking-[0.2em]">
            Public Visibility
          </h3>
          <div className="flex items-center justify-between border border-border bg-muted p-4">
            <div>
              <div className="font-bold text-[11px] text-foreground uppercase tracking-wider">
                Show in Studio Directory
              </div>
              <div className="text-[10px] text-muted-foreground italic">
                Allow other studio members to find your profile.
              </div>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={showDirectory}
                onChange={(e) => setShowDirectory(e.target.checked)}
              />
              <div className="peer h-6 w-11 rounded-full bg-border after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none" />
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-10">
          <button
            className="px-8 py-3 font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors hover:text-primary disabled:opacity-50"
            type="button"
            onClick={handleDiscard}
            disabled={!hasChanges || isSaving}
          >
            Discard Changes
          </button>
          <button
            className="bg-primary px-10 py-3 font-bold text-[10px] text-primary-foreground uppercase tracking-widest transition-all hover:shadow-xl disabled:opacity-50"
            type="button"
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                Saving...
              </span>
            ) : (
              "Save Profile"
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
