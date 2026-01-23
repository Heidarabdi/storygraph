import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, ChevronRight, Lock, Mail, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth/signup")({
	component: () => (
		<div className="fade-in slide-in-from-bottom-4 animate-in space-y-8 duration-700">
			<div className="space-y-2 text-center">
				<h2 className="font-serif text-3xl text-foreground italic">
					Initialize Membership
				</h2>
				<p className="text-[10px] text-muted-foreground uppercase tracking-widest">
					Join the elite visual collective
				</p>
			</div>

			<form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
				<div className="space-y-5">
					<div className="grid grid-cols-2 gap-6">
						<div className="group space-y-2">
							<label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
								First Descriptor
							</label>
							<div className="relative">
								<Input
									className="rounded-none border-0 border-border border-b bg-transparent px-8 py-3 text-foreground text-sm shadow-none placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-0"
									placeholder="Julian"
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
									className="rounded-none border-0 border-border border-b bg-transparent px-8 py-3 text-foreground text-sm shadow-none placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-0"
									placeholder="Thorne"
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
								className="rounded-none border-0 border-border border-b bg-transparent px-8 py-3 text-foreground text-sm shadow-none placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-0"
								placeholder="director@zenith.fm"
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
								className="rounded-none border-0 border-border border-b bg-transparent px-8 py-3 text-foreground text-sm shadow-none placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-0"
								placeholder="••••••••"
							/>
							<Lock
								size={14}
								className="absolute top-1/2 left-0 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
							/>
						</div>
					</div>
				</div>

				<Button className="group h-14 w-full rounded-none bg-primary font-bold text-[11px] text-primary-foreground uppercase tracking-[0.3em] shadow-2xl transition-all hover:bg-accent hover:text-primary-foreground">
					Create Membership
					<ChevronRight
						size={16}
						className="ml-3 transition-transform group-hover:translate-x-1"
					/>
				</Button>
			</form>

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
	),
});
