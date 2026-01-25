import { useAuthActions } from "@convex-dev/auth/react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ChevronRight, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth/login")({
	component: LoginPage,
});

function LoginPage() {
	const router = useRouter();
	const { signIn } = useAuthActions();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await signIn("password", { email, password, flow: "signIn" });
			await router.navigate({ to: "/dashboard" });
			// Ideally ConvexAuth handles the token and the router context updates.
		} catch (error) {
			toast.error("Authentication failed. Check your credentials.");
			setLoading(false);
		}
	};

	return (
		<div className="fade-in slide-in-from-bottom-4 animate-in space-y-8 duration-700">
			<div className="space-y-2 text-center">
				<h2 className="font-serif text-3xl text-foreground italic">
					Welcome Back
				</h2>
				<p className="text-[10px] text-muted-foreground uppercase tracking-widest">
					Resume your visual journey
				</p>
			</div>

			<form className="space-y-6" onSubmit={handleSignIn}>
				<div className="space-y-4">
					<div className="group space-y-2">
						<label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
							Studio Email
						</label>
						<div className="relative">
							<Input
								type="email"
								name="email"
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

					<div className="group space-y-2">
						<div className="flex items-center justify-between">
							<label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
								Cipher
							</label>
							<Link
								to="/auth/forgot-password"
								title="Forgot Password"
								className="font-bold text-[9px] text-muted-foreground uppercase tracking-tighter transition-colors hover:text-accent"
							>
								Forgot?
							</Link>
						</div>
						<div className="relative">
							<Input
								type="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="rounded-none border-0 border-border border-b bg-transparent px-8 py-3 text-foreground text-sm shadow-none placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-0"
								placeholder="••••••••"
								required
							/>
							<Lock
								size={14}
								className="absolute top-1/2 left-0 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
							/>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<div className="flex h-4 w-4 cursor-pointer items-center justify-center border border-border bg-muted transition-colors hover:border-primary">
						<div className="h-2 w-2 scale-0 bg-primary transition-transform" />
					</div>
					<span className="font-bold text-[10px] text-muted-foreground uppercase italic tracking-widest">
						Maintain Session Persistence
					</span>
				</div>

				<Button
					type="submit"
					disabled={loading}
					className="group h-14 w-full rounded-none bg-primary font-bold text-[11px] text-primary-foreground uppercase tracking-[0.3em] shadow-2xl transition-all hover:bg-accent hover:text-primary-foreground"
				>
					{loading ? "Authenticating..." : "Authenticate"}
					<ChevronRight
						size={16}
						className="ml-3 transition-transform group-hover:translate-x-1"
					/>
				</Button>

				<div className="relative my-4">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t border-muted/20" />
					</div>
					<div className="relative flex justify-center text-[9px] uppercase tracking-widest">
						<span className="bg-background px-2 text-muted-foreground">Or</span>
					</div>
				</div>

				<Button
					type="button"
					variant="outline"
					className="group h-12 w-full rounded-none border-muted-foreground/20 font-bold text-[10px] uppercase tracking-[0.2em] transition-all hover:border-primary hover:text-primary"
					onClick={() => signIn("google")}
				>
					Continue with Google
				</Button>
			</form>

			<div className="pt-4 text-center">
				<p className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
					First time at the studio?{" "}
					<Link
						to="/auth/signup"
						className="text-primary underline underline-offset-4 transition-colors hover:text-accent"
					>
						Create Membership
					</Link>
				</p>
			</div>
		</div>
	);
}
