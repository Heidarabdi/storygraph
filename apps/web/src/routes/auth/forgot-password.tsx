import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth/forgot-password")({
	component: () => (
		<div className="fade-in slide-in-from-bottom-4 animate-in space-y-8 duration-700">
			<div className="space-y-2 text-center">
				<h2 className="font-serif text-3xl text-foreground italic">
					Recover Access
				</h2>
				<p className="text-[10px] text-muted-foreground uppercase tracking-widest">
					Restore your visual coordinate
				</p>
			</div>

			<form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
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
							className="rounded-none border-0 border-border border-b bg-transparent px-8 py-3 text-foreground text-sm shadow-none placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-0"
							placeholder="director@studio.com"
						/>
						<Mail
							size={14}
							className="absolute top-1/2 left-0 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
						/>
					</div>
				</div>

				<Button className="group h-14 w-full rounded-none bg-primary font-bold text-[11px] text-primary-foreground uppercase tracking-[0.3em] shadow-2xl transition-all hover:bg-accent hover:text-primary-foreground">
					Send Recovery Transmission
					<ChevronRight
						size={16}
						className="ml-3 transition-transform group-hover:translate-x-1"
					/>
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
	),
});
