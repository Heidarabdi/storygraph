import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteDialogProps {
	title?: string;
	description?: string;
	trigger?: React.ReactNode;
	onConfirm: () => void | Promise<void>;
	destructive?: boolean;
}

export function ConfirmDeleteDialog({
	title = "Delete Item",
	description = "Are you sure you want to delete this item? This action cannot be undone.",
	trigger,
	onConfirm,
	destructive = true,
}: ConfirmDeleteDialogProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleConfirm = async () => {
		setLoading(true);
		try {
			await onConfirm();
			setOpen(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				{trigger || (
					<Button
						variant="ghost"
						size="icon"
						className="text-destructive hover:bg-destructive/10"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				)}
			</AlertDialogTrigger>
			<AlertDialogContent className="rounded-none border-border">
				<AlertDialogHeader>
					<AlertDialogTitle className="font-serif italic">
						{title}
					</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="rounded-none" disabled={loading}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleConfirm}
						className="rounded-none"
						variant={destructive ? "destructive" : "default"}
						disabled={loading}
					>
						{loading ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
