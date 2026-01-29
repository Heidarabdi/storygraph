import { useAuthActions } from "@convex-dev/auth/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, ChevronRight, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth/forgot-password")({
	component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSent, setIsSent] = useState(false);
	const { signIn } = useAuthActions();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) return;

		setIsLoading(true);
		try {
			// Official Convex Auth password reset flow
			await signIn("password", { email, flow: "reset" });

			// Always show success to prevent email enumeration
			setIsSent(true);
		} catch (err) {
			console.error("Failed to send reset email:", err);
			toast.error("Failed to send reset transmission. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	if (isSent) {
		return (
			<div className="fade-in slide-in-from-bottom-4 animate-in space-y-8 duration-700">
				<div className="space-y-2 text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
						<Check className="h-8 w-8 text-green-500" />
					</div>
					<h2 className="font-serif text-3xl text-foreground italic">
						Check Your Inbox
					</h2>
					<p className="text-[10px] text-muted-foreground uppercase tracking-widest">
						Recovery transmission dispatched
					</p>
				</div>

				<p className="px-6 text-center text-[11px] text-muted-foreground italic leading-relaxed">
					If an account exists for{" "}
					<span className="font-semibold text-primary">{email}</span>, you will
					receive a password reset code shortly. Follow the instructions in the
					email to restore your access.
				</p>

				<div className="border-border/10 border-t pt-4 text-center">
					<Link
						to="/auth/reset-password"
						search={{ email }}
						className="mb-4 flex items-center justify-center gap-2 font-bold text-[10px] text-primary uppercase tracking-[0.2em] transition-all hover:text-accent"
					>
						Have a code? Proceed to reset
						<ChevronRight size={14} />
					</Link>

					<Link
						to="/auth/login"
						className="flex items-center justify-center gap-2 font-bold text-[10px] text-muted-foreground uppercase tracking-[0.2em] transition-all hover:text-primary"
					>
						<ArrowLeft size={14} />
						Return to Authentication
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="fade-in slide-in-from-bottom-4 animate-in space-y-8 duration-700">
			<div className="space-y-2 text-center">
				<h2 className="font-serif text-3xl text-foreground italic">
					Recover Access
				</h2>
				<p className="text-[10px] text-muted-foreground uppercase tracking-widest">
					Restore your visual coordinate
				</p>
			</div>

			<form className="space-y-8" onSubmit={handleSubmit}>
				<p className="px-6 text-center text-[11px] text-muted-foreground italic leading-relaxed">
					Enter your registered studio email. We will dispatch a secure recovery
					transmission to reset your cipher.
				</p>

				<div className="group space-y-2">
					<label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
						Studio Email
					</label>
					<div className="relative">
						<Input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="rounded-none border-0 border-border border-b bg-transparent px-8 py-3 text-foreground text-sm shadow-none placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-0"
							placeholder="director@studio.com"
							required
						/>
						<Mail
							size={14}
							className="absolute top-1/2 left-0 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
						/>
					</div>
				</div>

				<Button
					type="submit"
					disabled={isLoading || !email}
					className="group h-14 w-full rounded-none bg-primary font-bold text-[11px] text-primary-foreground uppercase tracking-[0.3em] shadow-2xl transition-all hover:bg-accent hover:text-primary-foreground disabled:opacity-50"
				>
					{isLoading ? (
						<>
							<Loader2 size={16} className="mr-3 animate-spin" />
							Sending...
						</>
					) : (
						<>
							Send Recovery Transmission
							<ChevronRight
								size={16}
								className="ml-3 transition-transform group-hover:translate-x-1"
							/>
						</>
					)}
				</Button>
			</form>

			<div className="border-border/10 border-t pt-4 text-center">
				<Link
					to="/auth/login"
					className="flex items-center justify-center gap-2 font-bold text-[10px] text-muted-foreground uppercase tracking-[0.2em] transition-all hover:text-primary"
				>
					<ArrowLeft size={14} />
					Return to Authentication
				</Link>
			</div>
		</div>
	);
}
