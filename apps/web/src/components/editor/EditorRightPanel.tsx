import { Link2, PanelRightClose, Plus, Upload, User, X } from "lucide-react";
import type { EditorAsset, EditorFrame } from "@/types/editor";

interface EditorRightPanelProps {
  showRightSidebar: boolean;
  setShowRightSidebar: (val: boolean) => void;
  assets: EditorAsset[] | undefined;
  activeFrame: EditorFrame | undefined;
  frames: EditorFrame[] | undefined;
}

export function EditorRightPanel({
  showRightSidebar,
  setShowRightSidebar,
  assets,
  activeFrame,
  frames,
}: EditorRightPanelProps) {
  return (
    <div
      className={`shrink-0 transition-all duration-300 ease-in-out ${
        showRightSidebar
          ? "w-96 opacity-100"
          : "w-0 opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative h-full w-96 rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden">
        {/* Sidebar Header */}
        <div className="relative z-10 px-6 py-5 border-b border-border bg-card flex items-center justify-between">
          <span className="text-xs font-bold tracking-tight text-foreground/80">
            Properties
          </span>
          <button
            onClick={() => setShowRightSidebar(false)}
            className="text-muted-foreground/40 hover:text-primary transition-colors p-1 rounded-md hover:bg-muted"
          >
            <PanelRightClose size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
          {/* Assets Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="flex items-center gap-2.5 text-xs font-semibold tracking-tight text-muted-foreground">
                <User size={12} className="text-accent" />
                Assets
              </span>
              <button
                type="button"
                className="h-6 w-6 flex items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md transition-all hover:scale-110 active:scale-95"
              >
                <Plus size={14} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {assets && assets.length > 0 ? (
                assets.slice(0, 3).map((asset: any) => (
                  <div
                    key={asset._id}
                    className="group flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent transition-all hover:bg-accent/20"
                  >
                    {asset.name}
                    <button
                      type="button"
                      className="opacity-40 hover:opacity-100 transition-opacity"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground/30 italic py-1">
                  No assets tagged
                </p>
              )}
            </div>
          </div>

          <div className="h-px bg-border/50 mx-2" />

          {/* Continuity Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="flex items-center gap-2.5 text-xs font-semibold tracking-tight text-muted-foreground">
                <Link2 size={12} className="text-accent" />
                Continuity
              </span>
              <button
                type="button"
                className="h-6 w-6 flex items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md transition-all hover:scale-110 active:scale-95"
              >
                <Plus size={14} />
              </button>
            </div>
            <div>
              {activeFrame &&
              activeFrame.order > 1 &&
              frames &&
              frames.length > 1 ? (
                <div className="group flex items-center justify-between rounded-lg border border-accent/20 bg-accent/10 p-2.5 text-xs font-medium text-accent transition-all hover:bg-accent/20">
                  <span className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-accent/20 font-bold text-[10px]">
                      F{(activeFrame.order - 1).toString().padStart(2, "0")}
                    </span>
                    Previous Frame
                  </span>
                  <button
                    type="button"
                    className="opacity-40 hover:opacity-100 transition-opacity"
                  >
                    <X size={10} />
                  </button>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground/30 italic py-1">
                  Entry point
                </p>
              )}
            </div>
          </div>

          <div className="h-px bg-border/50 mx-2" />

          {/* Reference Images Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="flex items-center gap-2.5 text-xs font-semibold tracking-tight text-muted-foreground">
                <Upload size={12} className="text-accent" />
                References
              </span>
              <span className="text-xs font-mono text-muted-foreground/30">
                0/3
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                className="aspect-square flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-muted/20 text-muted-foreground/40 transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              >
                <Plus size={16} />
              </button>
              {/* Placeholders for uploaded refs */}
              <div className="aspect-square rounded-xl bg-muted/5 border border-border/30 border-dashed" />
              <div className="aspect-square rounded-xl bg-muted/5 border border-border/30 border-dashed" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
