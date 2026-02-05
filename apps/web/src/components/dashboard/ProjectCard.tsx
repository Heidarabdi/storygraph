import { Link } from "@tanstack/react-router";
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
import { EditProjectModal } from "./EditProjectModal";

interface Project {
  _id: string;
  _creationTime: number;
  name: string;
  description?: string;
  thumbnail?: string;
}

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
  viewMode?: "grid" | "list";
}

export function ProjectCard({
  project,
  onDelete,
  viewMode = "grid",
}: ProjectCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (viewMode === "list") {
    return (
      <>
        <div className="group relative border-b border-border/50 border-x bg-card p-4 md:p-6 transition-all hover:bg-muted/30 last:border-b-0">
          <Link
            to="/editor/$projectId"
            params={{ projectId: project._id }}
            className="grid grid-cols-12 items-center gap-4 md:gap-6"
          >
            <div className="col-span-3 md:col-span-2 aspect-[2.39/1] w-full md:w-32 border border-border bg-neutral-200 overflow-hidden">
              <img
                src={
                  project.thumbnail ||
                  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800"
                }
                alt={project.name}
                className="h-full w-full object-cover saturate-50 transition-all duration-500 group-hover:saturate-100 group-hover:scale-110"
              />
            </div>
            <div className="col-span-9 md:col-span-10 flex items-center justify-between pl-2 md:pl-4">
              <div className="space-y-1">
                <h3 className="font-bold text-xs md:text-sm text-primary uppercase tracking-[0.15em] transition-colors group-hover:text-accent">
                  {project.name}
                </h3>
                <p className="font-serif text-[10px] md:text-xs text-muted-foreground italic">
                  Created {new Date(project._creationTime).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-6 md:gap-12">
                <div className="text-right hidden sm:block">
                  <p className="text-[9px] md:text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em] mb-1">
                    Status
                  </p>
                  <p className="text-xs font-bold text-accent uppercase tracking-tighter">
                    Active
                  </p>
                </div>

                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.preventDefault()}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-muted/50 text-muted-foreground hover:text-primary"
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
                        <Edit2 size={16} /> Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <ConfirmDeleteDialog
                    title={`Delete "${project.name}"?`}
                    description="This action cannot be undone."
                    onConfirm={() => onDelete(project._id)}
                    trigger={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-muted text-red-500"
                      >
                        <Trash2 size={16} />
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>

        <EditProjectModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          project={project}
        />
      </>
    );
  }

  return (
    <>
      <div className="group relative border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
        {/* Main Link for Navigating to Project */}
        <Link
          to="/editor/$projectId"
          params={{
            projectId: project._id,
          }}
          className="flex h-full flex-col"
        >
          {/* Thumbnail Area */}
          <div className="relative aspect-video overflow-hidden bg-neutral-200">
            <img
              src={
                project.thumbnail ||
                "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800"
              }
              alt={project.name}
              className="h-full w-full object-cover saturate-[0.4] transition-transform duration-700 group-hover:scale-105 group-hover:saturate-100"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex h-12 w-12 items-center justify-center border border-white/10 bg-white/10 backdrop-blur-md">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-bold text-base text-primary uppercase tracking-wide transition-colors group-hover:text-accent">
                  {project.name}
                </h3>
                <p className="font-serif text-xs text-muted-foreground italic">
                  Created on{" "}
                  {new Date(project._creationTime).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between border-border border-t pt-4">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-accent" />
                <span className="font-bold text-xs text-muted-foreground uppercase tracking-wide">
                  Scene 01 ACTIVE
                </span>
              </div>
              <div className="font-bold text-xs text-primary/40 uppercase italic tracking-wide">
                Ready to edit
              </div>
            </div>
          </div>
        </Link>

        {/* Top Actions */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 border border-white/20 bg-black/40 text-white backdrop-blur hover:bg-black/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
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
                <Edit2 size={16} /> Edit Project
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>

          <ConfirmDeleteDialog
            title={`Delete "${project.name}"?`}
            description="This will permanently delete this project and all its scenes and frames. This action cannot be undone."
            onConfirm={() => onDelete(project._id)}
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 border border-white/20 bg-black/40 text-red-400 backdrop-blur hover:bg-red-600/80 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                type="button"
              >
                <Trash2 size={16} />
              </Button>
            }
          />
        </div>
      </div>

      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        project={project}
      />
    </>
  );
}
