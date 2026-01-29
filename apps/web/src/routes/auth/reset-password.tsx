import { useAuthActions } from "@convex-dev/auth/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, KeyRound, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/reset-password")({
	validateSearch: (
		search: Record<string, unknown>,
	): { email?: string; code?: string } => {
		return {
			email: typeof search.email === "string" ? search.email : undefined,
			code: typeof search.code === "string" ? search.code : undefined,
		};
	},
	component: ResetPasswordPage,
});

function ResetPasswordPage() {
	const { email: initialEmail, code: initialCode } = Route.useSearch();
	const { signIn } = useAuthActions();

	const [email, setEmail] = useState(initialEmail || "");
	const [code, setCode] = useState(initialCode || "");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		setStatus("loading");
		try {
			await signIn("password", {
				email,
				code,
				newPassword,
				flow: "reset-verification",
			});
			setStatus("success");
		} catch (err) {
			console.error("Reset password failed:", err);
			const message =
				err instanceof Error
					? err.message
					: "Invalid verification code or email";
			toast.error(message);
			setStatus("idle");
		}
	};

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
					Verify Identity
				</h2>
				<p className="font-serif text-[11px] text-muted-foreground italic leading-relaxed">
					Enter the code sent to your email and define your new secure cipher.
				</p>
			</div>

			<form className="space-y-6" onSubmit={handleSubmit}>
				<div className="space-y-4">
					<div className="group space-y-2">
						<Label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
							Studio Email
						</Label>
						<div className="relative">
							<Mail className="absolute top-1/2 left-0 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
							<Input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="director@studio.com"
								className="h-12 rounded-none border-0 border-border border-b bg-transparent pl-8 text-foreground transition-colors placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-0"
								required
							/>
						</div>
					</div>

					<div className="group space-y-2">
						<Label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
							Verification Code
						</Label>
						<div className="relative">
							<KeyRound className="absolute top-1/2 left-0 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
							<Input
								type="text"
								value={code}
								onChange={(e) => setCode(e.target.value)}
								placeholder="Enter Code"
								className="h-12 rounded-none border-0 border-border border-b bg-transparent pl-8 text-foreground tracking-widest transition-colors placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-0"
								required
							/>
						</div>
					</div>

					<div className="group space-y-2">
						<Label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
							New Cipher
						</Label>
						<div className="relative">
							<KeyRound className="absolute top-1/2 left-0 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
							<Input
								type="password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								placeholder="••••••••"
								className="h-12 rounded-none border-0 border-border border-b bg-transparent pl-8 text-foreground transition-colors placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-0"
								required
								minLength={8}
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
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder="••••••••"
								className="h-12 rounded-none border-0 border-border border-b bg-transparent pl-8 text-foreground transition-colors placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-0"
								required
								minLength={8}
							/>
						</div>
					</div>
				</div>

				<Button
					type="submit"
					disabled={status === "loading" || !newPassword || !code || !email}
					className="h-14 w-full rounded-none bg-primary px-8 font-bold text-[11px] text-primary-foreground uppercase tracking-widest transition-all hover:bg-accent"
				>
					{status === "loading" ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : (
						"Update Password"
					)}
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
