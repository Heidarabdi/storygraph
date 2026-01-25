import { api } from "@storygraph/backend/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
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

interface NewProjectModalProps {
	isOpen: boolean;
	onClose: () => void;
	orgId: string | null;
}

export function NewProjectModal({
	isOpen,
	onClose,
	orgId,
}: NewProjectModalProps) {
	const [name, setName] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const createProject = useMutation(api.projects.create);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || !orgId) return;

		setIsSubmitting(true);
		try {
			await createProject({
				name,
				orgId: orgId as any,
			});
			onClose();
			setName("");
		} catch (error) {
			console.error("Failed to create project:", error);
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
							New Journey
						</DialogTitle>
						<DialogDescription className="mt-2 font-serif text-[11px] text-muted-foreground uppercase italic tracking-widest">
							Direct the foundation of your next cinematic beat.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-6 py-10">
						<div className="space-y-4">
							<Label
								htmlFor="name"
								className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-[0.4em]"
							>
								Project Identifier //
							</Label>
							<Input
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="e.g. Neon Protocol // SC_01"
								className="h-auto rounded-none border-border border-x-0 border-t-0 border-b-2 bg-transparent p-0 pb-4 font-serif text-2xl italic shadow-none focus-visible:border-primary focus-visible:ring-0"
								autoFocus
							/>
						</div>
					</div>
					<DialogFooter className="mt-6 flex-col gap-3 sm:flex-row sm:justify-end">
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
							disabled={isSubmitting || !name.trim() || !orgId}
							className="h-12 rounded-none px-10 font-bold text-[10px] uppercase tracking-widest shadow-xl transition-all"
						>
							{isSubmitting ? (
								<span className="flex items-center gap-2">
									<div className="h-2 w-2 animate-ping rounded-full bg-accent" />
									Synthesizing...
								</span>
							) : (
								"Initialize Project"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
