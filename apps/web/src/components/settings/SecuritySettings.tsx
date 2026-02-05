import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@storygraph/backend/convex/_generated/api";
import { useQuery } from "convex/react";
import { Eye, EyeOff, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SecuritySettings() {
	const { signIn } = useAuthActions();
	const user = useQuery(api.users.viewer);
	const [showPassword, setShowPassword] = useState(false);
	const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
	const [step, setStep] = useState<"initial" | "verification">("initial");
	const [isLoading, setIsLoading] = useState(false);

	const handleSendCode = async () => {
		if (!user?.email) {
			toast.error("User email not found");
			return;
		}
		setIsLoading(true);
		try {
			await signIn("password", { flow: "reset", email: user.email });
			setStep("verification");
			toast.success("Verification code sent to your email");
		} catch (error) {
			toast.error("Failed to send verification code");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user?.email) return;

		const formData = new FormData(e.currentTarget);
		const code = formData.get("code") as string;
		const newPassword = formData.get("newPassword") as string;

		setIsLoading(true);
		try {
			await signIn("password", {
				flow: "reset-verification",
				email: user.email,
				code,
				newPassword,
			});
			toast.success("Password updated successfully");
			setStep("initial");
			// Optional: Clear form or reset internal auth state if needed
		} catch (error) {
			toast.error("Failed to update password. Invalid code?");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="fade-in slide-in-from-bottom-4 animate-in duration-500">
			<header className="mb-8 md:mb-10">
				<h1 className="mb-2 font-serif text-3xl italic md:text-4xl">
					Account Security
				</h1>
				<p className="text-muted-foreground text-xs tracking-wide md:text-sm">
					Manage your authentication methods and active sessions.
				</p>
			</header>

			<div className="space-y-12">
				{/* Change Password */}
				<section className="border border-border bg-card p-6 shadow-sm md:p-8">
					<div className="mb-8">
						<h3 className="mb-1 font-bold text-[11px] text-foreground uppercase tracking-[0.2em]">
							Change Password
						</h3>
						<p className="font-serif text-muted-foreground text-xs italic">
							Secure your account by verifying your email and setting a new
							password.
						</p>
					</div>

					{step === "initial" ? (
						<div className="space-y-6">
							<p className="text-muted-foreground text-sm">
								To change your password, we'll send a verification code to your
								email address
								{user?.email ? (
									<span className="font-bold text-foreground">
										{" "}
										({user.email})
									</span>
								) : (
									""
								)}
								.
							</p>
							<div className="flex justify-end">
								<button
									onClick={handleSendCode}
									disabled={isLoading}
									className="bg-primary px-8 py-3 font-bold text-[10px] text-primary-foreground uppercase tracking-widest shadow-lg transition-all hover:bg-neutral-800 disabled:opacity-50"
									type="button"
								>
									{isLoading ? "Sending..." : "Send Verification Code"}
								</button>
							</div>
						</div>
					) : (
						<form onSubmit={handleUpdatePassword} className="space-y-6">
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<div className="space-y-2">
									<label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
										Verification Code
									</label>
									<input
										name="code"
										className="w-full rounded-none border border-border bg-background px-4 py-3 text-foreground text-sm outline-none focus:border-primary focus:ring-0"
										placeholder="Enter code from email"
										type="text"
										required
									/>
								</div>
								<div className="space-y-2">
									<label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
										New Password
									</label>
									<div className="relative">
										<input
											name="newPassword"
											className="w-full rounded-none border border-border bg-background px-4 py-3 text-foreground text-sm outline-none focus:border-primary focus:ring-0"
											placeholder="••••••••••••"
											type={showPassword ? "text" : "password"}
											required
											minLength={8}
										/>
										<button
											onClick={() => setShowPassword(!showPassword)}
											className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground outline-none transition-colors hover:text-primary"
											type="button"
										>
											{showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
										</button>
									</div>
								</div>
							</div>
							<div className="flex justify-end gap-4">
								<button
									onClick={() => setStep("initial")}
									className="px-6 py-3 font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors hover:text-foreground"
									type="button"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={isLoading}
									className="bg-primary px-8 py-3 font-bold text-[10px] text-primary-foreground uppercase tracking-widest shadow-lg transition-all hover:bg-neutral-800 disabled:opacity-50"
								>
									{isLoading ? "Updating..." : "Set New Password"}
								</button>
							</div>
						</form>
					)}
				</section>

				{/* Two-Factor Authentication */}
				<section className="border border-border bg-card p-6 shadow-sm md:p-8">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="mb-1 font-bold text-[11px] text-foreground uppercase tracking-[0.2em]">
								Two-Factor Authentication
							</h3>
							<p className="font-serif text-muted-foreground text-xs italic">
								Add an extra layer of security to your creative assets.
							</p>
						</div>
						<div className="flex items-center">
							<span className="mr-3 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
								{twoFactorEnabled ? "Enabled" : "Disabled"}
							</span>
							<ToggleSwitch
								checked={twoFactorEnabled}
								onChange={setTwoFactorEnabled}
							/>
						</div>
					</div>
				</section>

				{/* Active Sessions */}
				<section>
					<div className="mb-6">
						<h3 className="mb-1 font-bold text-[11px] text-foreground uppercase tracking-[0.2em]">
							Active Sessions
						</h3>
						<p className="font-serif text-muted-foreground text-xs italic">
							Devices currently logged into your account.
						</p>
					</div>
					<div className="divide-y divide-border border border-border bg-card shadow-sm">
						<div className="flex flex-col items-start justify-between gap-4 p-4 md:p-6 min-[350px]:flex-row min-[350px]:items-center">
							<div className="flex items-center gap-4">
								<div className="hidden h-10 w-10 items-center justify-center border border-border bg-muted min-[400px]:flex">
									<Monitor size={20} className="text-foreground" />
								</div>
								<div>
									<div className="flex items-center gap-2">
										<span className="font-bold text-foreground text-xs uppercase tracking-widest">
											macOS • Chrome
										</span>
										<span className="bg-accent/20 px-1.5 py-0.5 font-bold font-sans text-[9px] text-accent uppercase">
											Current
										</span>
									</div>
									<div className="mt-1 text-[10px] text-muted-foreground">
										London, UK • 192.168.1.1
									</div>
								</div>
							</div>
							<button
								className="py-2 font-bold text-[10px] text-red-500/60 uppercase tracking-[0.2em] transition-colors hover:text-red-500 min-[350px]:py-0"
								type="button"
							>
								Terminate
							</button>
						</div>
						<div className="flex flex-col items-start justify-between gap-4 p-4 opacity-70 md:p-6 min-[350px]:flex-row min-[350px]:items-center">
							<div className="flex items-center gap-4">
								<div className="hidden h-10 w-10 items-center justify-center border border-border bg-muted min-[400px]:flex">
									<Smartphone size={20} className="text-foreground" />
								</div>
								<div>
									<div className="flex items-center gap-2">
										<span className="font-bold text-foreground text-xs uppercase tracking-widest">
											iPhone 15 Pro • iOS App
										</span>
									</div>
									<div className="mt-1 text-[10px] text-muted-foreground">
										Paris, France • 2 days ago
									</div>
								</div>
							</div>
							<button
								className="py-2 font-bold text-[10px] text-red-500/60 uppercase tracking-[0.2em] transition-colors hover:text-red-500 min-[350px]:py-0"
								type="button"
							>
								Terminate
							</button>
						</div>
					</div>
				</section>

				{/* Danger Zone */}
				<section className="mt-12 border-border/30 border-t pt-12">
					<div className="border border-red-900/10 bg-red-900/5 p-8">
						<div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
							<div>
								<h3 className="mb-1 font-bold text-[11px] text-red-500 uppercase tracking-[0.2em]">
									Danger Zone
								</h3>
								<p className="font-serif text-[11px] text-red-400/60 italic leading-snug md:text-xs">
									Permanently delete your account and all storyboard data.
								</p>
							</div>
							<button
								className="w-full border border-red-500/20 bg-transparent px-6 py-2.5 font-bold text-[10px] text-red-500 uppercase tracking-widest transition-all hover:bg-red-500 hover:text-white md:w-auto"
								type="button"
							>
								Delete Account
							</button>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

function ToggleSwitch({
	checked,
	onChange,
}: {
	checked: boolean;
	onChange: (val: boolean) => void;
}) {
	return (
		<button
			onClick={() => onChange(!checked)}
			className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted"}`}
			type="button"
		>
			<span
				className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
			/>
		</button>
	);
}
