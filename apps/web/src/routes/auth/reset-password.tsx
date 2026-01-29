import { useAuthActions } from "@convex-dev/auth/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	CheckCircle2,
	ChevronRight,
	KeyRound,
	Loader2,
	Mail,
	ShieldCheck,
} from "lucide-react";
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

type Step = "verify" | "password" | "success";

function ResetPasswordPage() {
	const { email: initialEmail, code: initialCode } = Route.useSearch();
	const { signIn } = useAuthActions();

	const [email, setEmail] = useState(initialEmail || "");
	const [code, setCode] = useState(initialCode || "");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [step, setStep] = useState<Step>(initialCode ? "password" : "verify");
	const [isLoading, setIsLoading] = useState(false);

	const handleVerifyCode = (e: React.FormEvent) => {
		e.preventDefault();
		if (!email || !code) {
			toast.error("Please enter your email and verification code");
			return;
		}
		// Move to password step - we'll verify the code when submitting the final form
		setStep("password");
	};

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault();

		if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		if (newPassword.length < 8) {
			toast.error("Password must be at least 8 characters");
			return;
		}

		setIsLoading(true);
		try {
			await signIn("password", {
				email,
				code,
				newPassword,
				flow: "reset-verification",
			});
			setStep("success");
		} catch (err) {
			console.error("Reset password failed:", err);
			const message =
				err instanceof Error
					? err.message
					: "Invalid verification code or email";
			toast.error(message);
			// Go back to code step on error
			setStep("verify");
		} finally {
			setIsLoading(false);
		}
	};

	// Step indicator
	const StepIndicator = () => (
		<div className="mb-8 flex items-center justify-center gap-3">
			<div
				className={`flex h-8 w-8 items-center justify-center border font-bold text-[10px] transition-colors ${
					step === "verify"
						? "border-primary bg-primary text-primary-foreground"
						: step === "password" || step === "success"
							? "border-accent bg-accent/20 text-accent"
							: "border-border text-muted-foreground"
				}`}
			>
				{step === "password" || step === "success" ? (
					<CheckCircle2 size={14} />
				) : (
					"1"
				)}
			</div>
			<div
				className={`h-px w-8 transition-colors ${
					step === "password" || step === "success" ? "bg-accent" : "bg-border"
				}`}
			/>
			<div
				className={`flex h-8 w-8 items-center justify-center border font-bold text-[10px] transition-colors ${
					step === "password"
						? "border-primary bg-primary text-primary-foreground"
						: step === "success"
							? "border-accent bg-accent/20 text-accent"
							: "border-border text-muted-foreground"
				}`}
			>
				{step === "success" ? <CheckCircle2 size={14} /> : "2"}
			</div>
		</div>
	);

	// Success state
	if (step === "success") {
		return (
			<div className="fade-in slide-in-from-bottom-4 animate-in space-y-8 duration-500">
				<StepIndicator />
				<div className="zoom-in flex animate-in flex-col items-center space-y-6 text-center duration-500">
					<div className="mb-2 flex h-20 w-20 items-center justify-center border border-accent/20 bg-accent/10">
						<CheckCircle2 size={40} className="text-accent" strokeWidth={1.5} />
					</div>
					<div className="space-y-2">
						<h2 className="font-serif text-3xl text-foreground italic">
							Access Restored
						</h2>
						<p className="px-8 font-serif text-[11px] text-muted-foreground italic leading-relaxed">
							Your secure cipher has been updated successfully. You may now
							proceed to the studio with your new credentials.
						</p>
					</div>
					<Link to="/auth/login" className="w-full pt-4">
						<Button className="group h-14 w-full rounded-none bg-primary px-8 font-bold text-[11px] text-primary-foreground uppercase tracking-widest transition-all hover:bg-accent">
							Enter the Studio
							<ChevronRight
								size={16}
								className="ml-2 transition-transform group-hover:translate-x-1"
							/>
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	// Step 1: Verify code
	if (step === "verify") {
		return (
			<div className="fade-in slide-in-from-bottom-4 animate-in space-y-6 duration-500">
				<StepIndicator />

				<div className="space-y-2 text-center">
					<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border border-border bg-muted/50">
						<ShieldCheck size={24} className="text-primary" strokeWidth={1.5} />
					</div>
					<h2 className="font-serif text-3xl text-foreground italic">
						Verify Identity
					</h2>
					<p className="font-serif text-[11px] text-muted-foreground italic leading-relaxed">
						Enter the verification code sent to your email
					</p>
				</div>

				<form className="space-y-6" onSubmit={handleVerifyCode}>
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
									placeholder="Enter 8-digit code"
									className="h-12 rounded-none border-0 border-border border-b bg-transparent pl-8 font-mono text-foreground text-lg tracking-[0.5em] transition-colors placeholder:text-muted-foreground/30 placeholder:text-sm placeholder:tracking-normal focus-visible:border-primary focus-visible:ring-0"
									required
									maxLength={8}
								/>
							</div>
							<p className="text-[9px] text-muted-foreground/60 italic">
								Check your inbox for the code we sent you
							</p>
						</div>
					</div>

					<Button
						type="submit"
						disabled={!email || !code}
						className="group h-14 w-full rounded-none bg-primary px-8 font-bold text-[11px] text-primary-foreground uppercase tracking-widest transition-all hover:bg-accent disabled:opacity-50"
					>
						Continue
						<ChevronRight
							size={16}
							className="ml-2 transition-transform group-hover:translate-x-1"
						/>
					</Button>
				</form>

				<div className="border-border/10 border-t pt-4 text-center">
					<Link
						to="/auth/forgot-password"
						className="inline-flex items-center gap-2 font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors hover:text-primary"
					>
						<ArrowLeft size={14} />
						Resend Code
					</Link>
				</div>
			</div>
		);
	}

	// Step 2: Set new password
	return (
		<div className="fade-in slide-in-from-bottom-4 animate-in space-y-6 duration-500">
			<StepIndicator />

			<div className="space-y-2 text-center">
				<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border border-border bg-muted/50">
					<KeyRound size={24} className="text-primary" strokeWidth={1.5} />
				</div>
				<h2 className="font-serif text-3xl text-foreground italic">
					Define New Cipher
				</h2>
				<p className="font-serif text-[11px] text-muted-foreground italic leading-relaxed">
					Create a strong password for your account
				</p>
			</div>

			<form className="space-y-6" onSubmit={handleResetPassword}>
				<div className="space-y-4">
					<div className="group space-y-2">
						<Label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
							New Password
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
							Confirm Password
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
						{confirmPassword && newPassword !== confirmPassword && (
							<p className="text-[9px] text-destructive">
								Passwords do not match
							</p>
						)}
					</div>
				</div>

				{/* Password requirements */}
				<div className="space-y-2 border border-border/50 bg-muted/20 p-4">
					<p className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest">
						Requirements
					</p>
					<ul className="space-y-1 text-[10px] text-muted-foreground">
						<li
							className={
								newPassword.length >= 8
									? "text-accent"
									: "text-muted-foreground"
							}
						>
							{newPassword.length >= 8 ? "✓" : "○"} At least 8 characters
						</li>
					</ul>
				</div>

				<Button
					type="submit"
					disabled={
						isLoading ||
						!newPassword ||
						!confirmPassword ||
						newPassword !== confirmPassword
					}
					className="group h-14 w-full rounded-none bg-primary px-8 font-bold text-[11px] text-primary-foreground uppercase tracking-widest transition-all hover:bg-accent disabled:opacity-50"
				>
					{isLoading ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : (
						<>
							Update Password
							<ChevronRight
								size={16}
								className="ml-2 transition-transform group-hover:translate-x-1"
							/>
						</>
					)}
				</Button>
			</form>

			<div className="border-border/10 border-t pt-4 text-center">
				<button
					onClick={() => setStep("verify")}
					className="inline-flex items-center gap-2 font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors hover:text-primary"
					type="button"
				>
					<ArrowLeft size={14} />
					Change Code
				</button>
			</div>
		</div>
	);
}
