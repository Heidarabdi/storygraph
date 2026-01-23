import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, KeyRound } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/reset-password")({
	component: ResetPasswordPage,
});

function ResetPasswordPage() {
	const [status, setStatus] = useState<"idle" | "success">("idle");

	if (status === "success") {
		return (
			<div className="zoom-in flex animate-in flex-col items-center space-y-6 text-center duration-500">
				<div className="mb-2 flex h-16 w-16 items-center justify-center border border-accent/20 bg-accent/20 text-accent">
					<CheckCircle2 size={32} strokeWidth={1.5} />
				</div>
				<div className="space-y-2">
					<h2 className="font-serif text-3xl text-foreground">
						Password Reset Complete
					</h2>
					<p className="px-8 font-serif text-[11px] text-muted-foreground italic leading-relaxed">
						Your secure access has been restored. You may now proceed to the
						studio with your new credentials.
					</p>
				</div>
				<Link to="/auth/login" className="w-full">
					<Button className="h-14 w-full rounded-none bg-primary px-8 font-bold text-[11px] text-primary-foreground uppercase tracking-widest transition-all hover:bg-accent">
						Return to Login
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="fade-in slide-in-from-bottom-4 animate-in space-y-8 duration-500">
			<div className="space-y-2 text-center">
				<h2 className="font-serif text-3xl text-foreground italic">
					New Credentials
				</h2>
				<p className="font-serif text-[11px] text-muted-foreground italic leading-relaxed">
					Ensure your new password is secure and unique. We recommend a
					combination of characters that reflects the complexity of your work.
				</p>
			</div>

			<form
				className="space-y-6"
				onSubmit={(e) => {
					e.preventDefault();
					setStatus("success");
				}}
			>
				<div className="space-y-4">
					<div className="group space-y-2">
						<Label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
							New Cipher
						</Label>
						<div className="relative">
							<KeyRound className="absolute top-1/2 left-0 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
							<Input
								type="password"
								placeholder="••••••••"
								className="h-12 rounded-none border-0 border-border border-b bg-transparent pl-8 text-foreground transition-colors placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-0"
								required
							/>
						</div>
					</div>
					<div className="group space-y-2">
						<Label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
							Confirm Cipher
						</Label>
						<div className="relative">
							<KeyRound className="absolute top-1/2 left-0 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
							<Input
								type="password"
								placeholder="••••••••"
								className="h-12 rounded-none border-0 border-border border-b bg-transparent pl-8 text-foreground transition-colors placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-0"
								required
							/>
						</div>
					</div>
				</div>

				<Button
					type="submit"
					className="h-14 w-full rounded-none bg-primary px-8 font-bold text-[11px] text-primary-foreground uppercase tracking-widest transition-all hover:bg-accent"
				>
					Update Password
				</Button>
			</form>

			<div className="border-border/10 border-t pt-4 text-center">
				<Link
					to="/auth/login"
					className="inline-flex items-center gap-2 font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors hover:text-primary"
				>
					<ArrowLeft size={14} />
					Back to Login
				</Link>
			</div>
		</div>
	);
}
