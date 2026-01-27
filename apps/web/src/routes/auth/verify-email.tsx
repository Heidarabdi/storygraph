import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Mail, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/verify-email")({
	component: VerifyEmailPage,
});

function VerifyEmailPage() {
	const [isVerified, setIsVerified] = useState(false);
	const [isResending, setIsResending] = useState(false);
	const [resendCooldown, setResendCooldown] = useState(0);

	const handleResendEmail = async () => {
		if (resendCooldown > 0 || isResending) return;

		setIsResending(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));
		setIsResending(false);

		toast.success("Verification email dispatched", {
			description: "Please check your inbox and spam folder.",
		});

		// Start 60-second cooldown
		setResendCooldown(60);
		const interval = setInterval(() => {
			setResendCooldown((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	};

	return (
		<div className="flex flex-col items-center space-y-8 text-center">
			{isVerified ? (
				<>
					<div className="zoom-in mb-2 flex h-16 w-16 animate-in items-center justify-center border border-accent/20 bg-accent/20 text-accent duration-500">
						<CheckCircle2 size={32} strokeWidth={1.5} />
					</div>
					<div className="space-y-2">
						<h2 className="font-serif text-3xl text-foreground">
							Identity Verified
						</h2>
						<p className="px-8 font-serif text-[11px] text-muted-foreground italic leading-relaxed">
							Your digital signature has been confirmed. You are now a verified
							creator within the Storygraph collective.
						</p>
					</div>
					<Link to="/dashboard" className="w-full">
						<Button className="group h-14 w-full rounded-none bg-primary font-bold text-[11px] text-primary-foreground uppercase tracking-widest shadow-none transition-all hover:bg-accent">
							Enter Workspace
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Button>
					</Link>
				</>
			) : (
				<>
					<div className="mb-2 flex h-16 w-16 items-center justify-center border border-primary/20 bg-primary/10 text-primary">
						<Mail size={32} strokeWidth={1.5} className="animate-pulse" />
					</div>
					<div className="space-y-2">
						<h2 className="font-serif text-3xl text-foreground">
							Awaiting Confirmation
						</h2>
						<p className="px-8 font-serif text-[11px] text-muted-foreground italic leading-relaxed">
							We have dispatched a verification link to your inbox. Please
							follow the instructions to formalize your studio invitation.
						</p>
					</div>

					<div className="w-full space-y-4">
						<Button
							variant="outline"
							className="h-14 w-full rounded-none border-border bg-transparent font-bold text-[11px] text-foreground uppercase tracking-widest transition-colors hover:bg-muted"
							onClick={() => setIsVerified(true)}
						>
							Manually Verify (Mock)
						</Button>

						<div className="flex items-center justify-center gap-2 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
							<span className="opacity-50">Didn't receive the email?</span>
							<button
								onClick={handleResendEmail}
								disabled={isResending || resendCooldown > 0}
								className="inline-flex items-center gap-1.5 text-primary transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
								type="button"
							>
								{isResending ? (
									<>
										<RefreshCw size={12} className="animate-spin" />
										Sending...
									</>
								) : resendCooldown > 0 ? (
									<>Resend in {resendCooldown}s</>
								) : (
									<>Resend Email</>
								)}
							</button>
						</div>
					</div>

					<Link
						to="/auth/login"
						className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors hover:text-primary"
					>
						Cancel & Return
					</Link>
				</>
			)}
		</div>
	);
}
