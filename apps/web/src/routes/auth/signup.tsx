import { useAuthActions } from "@convex-dev/auth/react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Briefcase, ChevronRight, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth/signup")({
	component: SignupPage,
});

function SignupPage() {
	const router = useRouter();
	const { signIn } = useAuthActions();
	const [firstName, setFirstName] = useState("");
	const [surname, setSurname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			// We pass name as metadata if needed, but standard auth might just take name if configured
			// Or we can update the profile later. For now, we'll just start the session.
			// Ideally, we'd pass { name: `${firstName} ${surname}` } if the provider supports it or update it immediately.
			await signIn("password", { email, password, flow: "signUp", name: `${firstName} ${surname}` });
			await router.navigate({ to: "/dashboard" });
		} catch (error) {
			toast.error("Could not create membership. Please try again.");
			setLoading(false);
		}
	};

	return (
		<div className="fade-in slide-in-from-bottom-4 animate-in space-y-8 duration-700">
			<div className="space-y-2 text-center">
				<h2 className="font-serif text-3xl text-foreground italic">
					Initialize Membership
				</h2>
				<p className="text-[10px] text-muted-foreground uppercase tracking-widest">
					Join the elite visual collective
				</p>
			</div>

			<form className="space-y-6" onSubmit={handleSignUp}>
				<div className="space-y-5">
					<div className="grid grid-cols-2 gap-6">
						<div className="group space-y-2">
							<label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
								First Descriptor
							</label>
							<div className="relative">
								<Input
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className="rounded-none border-0 border-border border-b bg-transparent px-8 py-3 text-foreground text-sm shadow-none placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-0"
									placeholder="Julian"
									required
								/>
								<User
									size={14}
									className="absolute top-1/2 left-0 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
								/>
							</div>
						</div>
						<div className="group space-y-2">
							<label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
								Surname
							</label>
							<div className="relative">
								<Input
									value={surname}
									onChange={(e) => setSurname(e.target.value)}
									className="rounded-none border-0 border-border border-b bg-transparent px-8 py-3 text-foreground text-sm shadow-none placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-0"
									placeholder="Thorne"
									required
								/>
								<User
									size={14}
									className="absolute top-1/2 left-0 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
								/>
							</div>
						</div>
					</div>

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
								placeholder="director@zenith.fm"
								required
							/>
							<Mail
								size={14}
								className="absolute top-1/2 left-0 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
							/>
						</div>
					</div>

					<div className="group space-y-2">
						<label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
							Select Persona
						</label>
						<div className="relative">
							<select className="w-full appearance-none rounded-none border-0 border-border border-b bg-transparent px-8 py-3 font-bold text-[11px] text-primary uppercase tracking-widest outline-none transition-colors focus:border-primary">
								<option className="bg-card">Visual Director</option>
								<option className="bg-card">Storyboard Artist</option>
								<option className="bg-card">Creative Executive</option>
								<option className="bg-card">Independent Creator</option>
							</select>
							<Briefcase
								size={14}
								className="absolute top-1/2 left-0 -translate-y-1/2 text-muted-foreground"
							/>
						</div>
					</div>

					<div className="group space-y-2">
						<label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
							Secure Cipher
						</label>
						<div className="relative">
							<Input
								type="password"
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

				<Button
					type="submit"
					disabled={loading}
					className="group h-14 w-full rounded-none bg-primary font-bold text-[11px] text-primary-foreground uppercase tracking-[0.3em] shadow-2xl transition-all hover:bg-accent hover:text-primary-foreground"
				>
					{loading ? "Initializing..." : "Create Membership"}
					<ChevronRight
						size={16}
						className="ml-3 transition-transform group-hover:translate-x-1"
					/>
				</Button>
			</form>

			<div className="relative my-6">
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

			<div className="border-border/50 border-t pt-4 text-center">
				<p className="font-bold text-[10px] text-muted-foreground uppercase italic tracking-widest">
					Already part of the collective?{" "}
					<Link
						to="/auth/login"
						className="text-primary underline underline-offset-4 transition-colors hover:text-accent"
					>
						Authenticate
					</Link>
				</p>
			</div>
		</div>
	);
}
