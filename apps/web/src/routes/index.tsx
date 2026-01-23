import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Brush,
	ChevronRight,
	Cpu,
	Frame,
	Globe,
	Layers,
	Network,
	Play,
	Shield,
	Sparkles,
	Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
	component: LandingPage,
});

function LandingPage() {
	return (
		<div className="flex flex-col bg-background selection:bg-primary selection:text-white">
			{/* Hero Section */}
			<section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-20">
				<div className="absolute inset-0 z-0">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-accent/5 via-background to-background" />
					{/* Subtle grid pattern */}
					<div className="mask-[radial-gradient(ellipse_at_center,black,transparent)] absolute inset-0 bg-[grid-white_1px] opacity-[0.03]" />
				</div>

				<div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
					<div className="fade-in slide-in-from-bottom-4 mb-8 flex animate-in items-center gap-2 border border-border bg-card/50 px-4 py-1.5 backdrop-blur-sm duration-1000">
						<Sparkles size={14} className="text-accent" />
						<span className="font-bold text-[8px] text-muted-foreground uppercase tracking-wider sm:text-[10px] sm:tracking-[0.2em]">
							The New Era of Visual Storytelling
						</span>
					</div>

					<h1 className="fade-in slide-in-from-bottom-6 mb-8 animate-in font-serif text-3xl text-primary italic leading-[1.1] tracking-tight duration-1000 sm:text-5xl md:text-8xl lg:text-9xl">
						Frame Your Stories with{" "}
						<span className="text-accent">Precision</span>
					</h1>

					<p className="fade-in slide-in-from-bottom-8 mb-12 max-w-2xl animate-in font-serif text-muted-foreground text-xl italic leading-relaxed duration-1000">
						From concept to storyboard in seconds. Storygraph combines cinematic
						intelligence with an elegant workspace for creators.
					</p>

					<div className="fade-in slide-in-from-bottom-10 flex animate-in flex-col items-center gap-4 duration-1000 sm:flex-row sm:gap-6">
						<Link to="/auth/signup" className="w-full sm:w-auto">
							<Button className="h-16 w-full justify-center rounded-none bg-primary px-12 font-bold text-[11px] text-primary-foreground uppercase tracking-[0.2em] shadow-2xl transition-all hover:translate-y-[-2px] hover:bg-black sm:w-auto">
								<span>Start Creating</span>
								<ChevronRight size={16} className="ml-2" />
							</Button>
						</Link>
						<Button
							variant="outline"
							className="flex h-16 w-full items-center gap-3 rounded-none border-border px-12 font-bold text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-muted sm:w-auto"
						>
							<div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
								<Play size={10} className="ml-0.5 fill-primary text-primary" />
							</div>
							Watch Reel
						</Button>
					</div>
				</div>

				<div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
					<div className="h-px w-20 bg-primary" />
				</div>

				{/* Floating Elements (Cinematic) */}
				<div className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
				<div className="absolute top-[10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
			</section>

			{/* Trusted By Section (Minimalist) */}
			<section className="border-border border-y bg-card/30 py-12 backdrop-blur-sm">
				<div className="mx-auto max-w-7xl px-6">
					<p className="mb-8 text-center font-bold text-[9px] text-muted-foreground/60 uppercase tracking-[0.4em]">
						Empowering Visionaries At
					</p>
					<div className="flex flex-wrap items-center justify-center gap-6 opacity-40 grayscale sm:gap-12">
						{[
							"Aether Studios",
							"Zenith Films",
							"Neon Collective",
							"Ivory Creative",
							"Thorne Arts",
						].map((studio) => (
							<span
								key={studio}
								className="font-semibold font-serif text-foreground text-xl italic"
							>
								{studio}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* Features Workspace Preview */}
			<section className="relative overflow-hidden bg-background/50 py-32">
				<div className="absolute top-0 left-0 h-full w-px bg-linear-to-b from-transparent via-border to-transparent" />

				<div className="mx-auto max-w-7xl px-6">
					<div className="mb-24 space-y-4">
						<h3 className="font-bold text-[10px] text-accent uppercase tracking-[0.4em]">
							Architecture
						</h3>
						<h2 className="font-serif text-3xl text-primary italic sm:text-5xl">
							A Workspace for Masters
						</h2>
						<p className="max-w-xl font-serif text-muted-foreground text-sm italic leading-relaxed">
							Storygraph is more than a prompt box—it's a narrative system that
							remembers your choices across every frame.
						</p>
					</div>

					<div className="grid gap-px overflow-hidden border border-border bg-border shadow-2xl sm:grid-cols-2 lg:grid-cols-3">
						<div className="group space-y-8 bg-card p-8 transition-all hover:bg-muted/50 md:p-12">
							<div className="flex h-16 w-16 items-center justify-center border border-border bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
								<Layers size={28} strokeWidth={1.2} />
							</div>
							<div className="space-y-4">
								<h3 className="font-serif text-2xl text-foreground">
									Visual Memory
								</h3>
								<p className="font-serif text-muted-foreground text-sm italic leading-relaxed opacity-80">
									Define characters once. Our graph-based memory ensures they
									look identical in every scene, regardless of lighting or
									angle.
								</p>
							</div>
						</div>

						<div className="group space-y-8 bg-card p-8 transition-all hover:bg-muted/50 md:p-12">
							<div className="flex h-16 w-16 items-center justify-center border border-border bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
								<Zap size={28} strokeWidth={1.2} />
							</div>
							<div className="space-y-4">
								<h3 className="font-serif text-2xl text-foreground">
									Scene Intelligence
								</h3>
								<p className="font-serif text-muted-foreground text-sm italic leading-relaxed opacity-80">
									Describe intent, not tech specs. We translate your artistic
									direction into precise model parameters automatically.
								</p>
							</div>
						</div>

						<div className="group space-y-8 bg-card p-8 transition-all hover:bg-muted/50 sm:col-span-2 md:p-12 lg:col-span-1">
							<div className="flex h-16 w-16 items-center justify-center border border-border bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
								<Brush size={28} strokeWidth={1.2} />
							</div>
							<div className="space-y-4">
								<h3 className="font-serif text-2xl text-foreground">
									Studio Workflow
								</h3>
								<p className="font-serif text-muted-foreground text-sm italic leading-relaxed opacity-80">
									A high-contrast, 3-panel storyboard workspace. Collapsible
									panels for focus, frames for flow.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* The Process Section (Large & Cinematic) */}
			<section className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-40">
				<div className="absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[150px]" />

				<div className="relative z-10 mx-auto max-w-7xl px-6">
					<div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
						<div className="space-y-12">
							<div className="space-y-6">
								<h3 className="font-bold text-[10px] text-accent uppercase tracking-[0.4em]">
									The Workflow
								</h3>
								<h2 className="font-serif text-4xl italic leading-tight md:text-7xl">
									From Script to Cinematic.
								</h2>
							</div>

							<div className="space-y-10">
								<div className="group flex gap-6">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center border border-primary-foreground/20 font-serif text-accent italic transition-colors group-hover:bg-accent group-hover:text-primary">
										01
									</div>
									<div className="space-y-2">
										<h4 className="font-serif text-xl italic underline decoration-accent/30 underline-offset-8">
											Define the Graph
										</h4>
										<p className="font-light text-primary-foreground/60 text-sm leading-relaxed">
											Upload your character designs and environment references.
											We define their visual DNA in your private graph.
										</p>
									</div>
								</div>
								<div className="group flex gap-6">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center border border-primary-foreground/20 font-serif text-accent italic transition-colors group-hover:bg-accent group-hover:text-primary">
										02
									</div>
									<div className="space-y-2">
										<h4 className="font-serif text-xl italic underline decoration-accent/30 underline-offset-8">
											Direct the Scene
										</h4>
										<p className="font-light text-primary-foreground/60 text-sm leading-relaxed">
											Place assets and describe the action. Our engine handles
											the cinematic framing, lighting, and style consistency.
										</p>
									</div>
								</div>
								<div className="group flex gap-6">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center border border-primary-foreground/20 font-serif text-accent italic transition-colors group-hover:bg-accent group-hover:text-primary">
										03
									</div>
									<div className="space-y-2">
										<h4 className="font-serif text-xl italic underline decoration-accent/30 underline-offset-8">
											Refine & Export
										</h4>
										<p className="font-light text-primary-foreground/60 text-sm leading-relaxed">
											Iterate on specific frames while maintaining continuity.
											Export as high-res sequences or professional storyboard
											pitch-decks.
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Visual Mockup/Abstract representation */}
						<div className="relative flex items-center justify-center lg:mt-0">
							<div className="aspect-4/5 w-full max-w-[250px] overflow-hidden border border-primary-foreground/10 bg-primary-foreground/5 p-2 backdrop-blur-3xl sm:max-w-md">
								<div className="group relative flex h-full w-full items-center justify-center border border-primary-foreground/5 bg-black">
									<Frame
										size={120}
										className="text-white/10 transition-transform duration-1000 group-hover:scale-110"
										strokeWidth={0.5}
									/>
									<div className="absolute top-8 left-8 flex items-center gap-2">
										<div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
										<span className="font-bold text-[8px] text-white/40 uppercase tracking-widest">
											Scene 04 // Action 12
										</span>
									</div>
									<img
										src="https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=800"
										className="absolute inset-0 h-full w-full object-cover opacity-20 transition-opacity duration-1000 group-hover:opacity-40"
										alt="Cinematic frame"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Technical Edge / Infrastructure */}
			<section className="bg-card py-32">
				<div className="mx-auto max-w-7xl px-6">
					<div className="mb-20 flex flex-col items-baseline justify-between gap-8 md:flex-row">
						<div className="space-y-4">
							<h3 className="font-bold text-[10px] text-accent uppercase tracking-[0.4em]">
								Infrastructure
							</h3>
							<h2 className="font-serif text-5xl text-primary italic">
								Engineered for Studios
							</h2>
						</div>
						<Link to="/pricing">
							<Button
								variant="outline"
								className="group flex h-12 items-center gap-2 rounded-none border-border font-bold text-[10px] uppercase tracking-widest hover:bg-muted"
							>
								View Technical Specs
								<ArrowRight
									size={14}
									className="transition-transform group-hover:translate-x-1"
								/>
							</Button>
						</Link>
					</div>

					<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
						{[
							{
								icon: Cpu,
								name: "Model Agnostic",
								desc: "Integrate SDXL, Flux, or proprietary fine-tuned models seamlessly.",
							},
							{
								icon: Network,
								name: "Graph Latency",
								desc: "Sub-second asset referencing and prompt composition engine.",
							},
							{
								icon: Shield,
								name: "Data Sovereignty",
								desc: "Your stories, your assets. Local-first or encrypted cloud options.",
							},
							{
								icon: Globe,
								name: "Global Delivery",
								desc: "Distributed rendering via Fal.ai for zero-delay production.",
							},
						].map((item, idx) => {
							const Icon = item.icon;
							return (
								<div key={idx} className="space-y-6">
									<Icon size={24} className="text-accent" strokeWidth={1.5} />
									<h4 className="font-serif text-xl italic">{item.name}</h4>
									<p className="font-light text-muted-foreground text-xs leading-relaxed">
										{item.desc}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* CTA Bottom */}
			<section className="relative overflow-hidden bg-background py-40">
				<div className="mask-[radial-gradient(ellipse_at_center,black,transparent)] absolute inset-0 bg-[grid-black_24px] opacity-[0.02]" />

				<div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
					<div className="mb-12 flex justify-center">
						<Brush size={40} className="text-primary/20" />
					</div>
					<h2 className="mb-12 font-serif text-4xl text-primary italic leading-tight sm:text-5xl md:text-7xl">
						Master the Art of Visual Continuity.
					</h2>
					<Link to="/auth/signup" className="mx-auto block w-full max-w-md">
						<Button className="group h-20 w-full justify-center rounded-none bg-primary px-6 font-bold text-primary-foreground text-sm uppercase tracking-[0.3em] shadow-2xl transition-all hover:bg-black sm:px-20">
							<span>Join the Collective</span>
							<ChevronRight
								size={18}
								className="ml-4 transition-transform group-hover:translate-x-2"
							/>
						</Button>
					</Link>
					<p className="mt-12 font-bold text-[8px] text-muted-foreground/60 uppercase italic tracking-widest sm:text-[10px] sm:tracking-[0.4em]">
						Professional storytelling infrastructure // EST 2026
					</p>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-border border-t bg-card pt-24 pb-12">
				<div className="mx-auto max-w-7xl px-6">
					<div className="mb-24 grid gap-16 lg:grid-cols-4">
						<div className="col-span-1 space-y-8 lg:col-span-1">
							<div className="flex items-center gap-3">
								<Brush size={24} className="text-primary" strokeWidth={1.5} />
								<span className="font-semibold font-serif text-2xl text-foreground italic">
									Storygraph
								</span>
							</div>
							<p className="font-light text-muted-foreground text-xs leading-relaxed">
								High-fidelity visual narrative infrastructure for the modern
								creator. Built for consistency, directed by vision.
							</p>
							<div className="flex gap-4">
								<div className="flex h-6 w-6 cursor-pointer items-center justify-center border border-border bg-muted opacity-50 transition-opacity hover:opacity-100">
									<span className="font-bold text-[10px]">X</span>
								</div>
								<div className="flex h-6 w-6 cursor-pointer items-center justify-center border border-border bg-muted opacity-50 transition-opacity hover:opacity-100">
									<span className="font-bold text-[10px]">IG</span>
								</div>
								<div className="flex h-6 w-6 cursor-pointer items-center justify-center border border-border bg-muted opacity-50 transition-opacity hover:opacity-100">
									<span className="font-bold text-[10px]">LI</span>
								</div>
							</div>
						</div>

						<div className="space-y-6">
							<h5 className="font-bold text-[10px] text-primary uppercase tracking-[0.3em]">
								Workspace
							</h5>
							<ul className="space-y-4">
								{[
									"Storyboards",
									"Asset Library",
									"Scene Editor",
									"Generation Engine",
								].map((link) => (
									<li key={link}>
										<Link
											to="/"
											className="font-light text-muted-foreground text-xs transition-colors hover:text-primary"
										>
											{link}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div className="space-y-6">
							<h5 className="font-bold text-[10px] text-primary uppercase tracking-[0.3em]">
								Collective
							</h5>
							<ul className="space-y-4">
								{[
									"Pricing",
									"Studio Licenses",
									"Enterprise",
									"Creative Partners",
								].map((link) => (
									<li key={link}>
										<Link
											to="/pricing"
											className="font-light text-muted-foreground text-xs transition-colors hover:text-primary"
										>
											{link}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div className="space-y-6">
							<h5 className="font-bold text-[10px] text-primary uppercase tracking-[0.3em]">
								Manifesto
							</h5>
							<p className="font-serif text-[10px] text-muted-foreground italic leading-relaxed">
								Our goal is to preserve the soul of visual storytelling by
								automating the friction, while keeping the human as the sole
								director.
							</p>
						</div>
					</div>

					<div className="flex flex-col items-center justify-between gap-6 border-border/50 border-t pt-12 md:flex-row">
						<p className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest">
							© 2026 Storygraph Architecture // London, UK
						</p>
						<div className="flex gap-8">
							<button className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest transition-colors hover:text-primary">
								Privacy Privacy
							</button>
							<button className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest transition-colors hover:text-primary">
								Terms of Service
							</button>
							<button className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest transition-colors hover:text-primary">
								Security protocol
							</button>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
