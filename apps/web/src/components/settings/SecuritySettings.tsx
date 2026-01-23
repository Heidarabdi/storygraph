import { Eye, EyeOff, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";

export default function SecuritySettings() {
	const [showPassword, setShowPassword] = useState(false);
	const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

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
							Regularly updating your password ensures studio integrity.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div className="space-y-2">
							<label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
								Current Password
							</label>
							<div className="relative">
								<input
									className="w-full rounded-none border border-border bg-background px-4 py-3 text-foreground text-sm outline-none focus:border-primary focus:ring-0"
									placeholder="••••••••••••"
									type={showPassword ? "text" : "password"}
								/>
								<button
									onClick={() => setShowPassword(!showPassword)}
									className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground outline-none transition-colors hover:text-primary"
								>
									{showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
								</button>
							</div>
						</div>
						<div className="space-y-2">
							<label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
								New Password
							</label>
							<input
								className="w-full rounded-none border border-border bg-background px-4 py-3 text-foreground text-sm outline-none focus:border-primary focus:ring-0"
								placeholder="••••••••••••"
								type="password"
							/>
						</div>
					</div>
					<div className="mt-8 flex justify-end">
						<button className="bg-primary px-8 py-3 font-bold text-[10px] text-primary-foreground uppercase tracking-widest shadow-lg transition-all hover:bg-neutral-800">
							Update Password
						</button>
					</div>
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
							<button className="py-2 font-bold text-[10px] text-red-500/60 uppercase tracking-[0.2em] transition-colors hover:text-red-500 min-[350px]:py-0">
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
							<button className="py-2 font-bold text-[10px] text-red-500/60 uppercase tracking-[0.2em] transition-colors hover:text-red-500 min-[350px]:py-0">
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
							<button className="w-full border border-red-500/20 bg-transparent px-6 py-2.5 font-bold text-[10px] text-red-500 uppercase tracking-widest transition-all hover:bg-red-500 hover:text-white md:w-auto">
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
		>
			<span
				className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
			/>
		</button>
	);
}
