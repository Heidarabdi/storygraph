import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Brush,
	ChevronRight,
	Play,
	Sparkles,
	Layers,
	Zap,
	Cpu,
	Network,
	Frame,
	Shield,
	Globe,
	ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
	component: LandingPage,
});

function LandingPage() {
	return (
		<div className="flex flex-col bg-background selection:bg-primary selection:text-white">
			{/* Hero Section */}
			<section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-20">
				<div className="absolute inset-0 z-0">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-accent/5 via-background to-background" />
					{/* Subtle grid pattern */}
					<div className="absolute inset-0 opacity-[0.03] bg-[grid-white_1px] mask-[radial-gradient(ellipse_at_center,black,transparent)]" />
				</div>

				<div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
					<div className="mb-8 flex animate-in fade-in slide-in-from-bottom-4 duration-1000 items-center gap-2 border border-border bg-white/50 px-4 py-1.5 backdrop-blur-sm">
						<Sparkles size={14} className="text-accent" />
						<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">The New Era of Visual Storytelling</span>
					</div>

					<h1 className="mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 font-serif text-6xl italic leading-[1.1] tracking-tight text-primary md:text-8xl lg:text-9xl">
						Frame Your <br />
						<span className="text-accent">Stories</span> with Precision
					</h1>

					<p className="mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 font-serif text-xl italic text-muted-foreground leading-relaxed">
						From concept to storyboard in seconds. Storygraph combines cinematic intelligence with an elegant workspace for creators.
					</p>

					<div className="flex animate-in fade-in slide-in-from-bottom-10 duration-1000 items-center gap-6">
						<Link to="/auth/signup">
							<Button className="h-16 rounded-none bg-primary px-12 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-2xl transition-all hover:bg-black hover:translate-y-[-2px] justify-center">
								<span>Start Creating</span>
								<ChevronRight size={16} className="ml-2" />
							</Button>
						</Link>
						<Button variant="outline" className="h-16 rounded-none border-border px-12 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-white flex items-center gap-3">
							<div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
								<Play size={10} className="fill-primary text-primary ml-0.5" />
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
			<section className="border-y border-border bg-white/30 py-12 backdrop-blur-sm">
				<div className="mx-auto max-w-7xl px-6">
					<p className="mb-8 text-center text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60">Empowering Visionaries At</p>
					<div className="flex flex-wrap items-center justify-center gap-12 grayscale opacity-40">
						{["Aether Studios", "Zenith Films", "Neon Collective", "Ivory Creative", "Thorne Arts"].map((studio) => (
							<span key={studio} className="font-serif text-xl italic font-semibold">{studio}</span>
						))}
					</div>
				</div>
			</section>

			{/* Features Workspace Preview */}
			<section className="relative bg-background/50 py-32 overflow-hidden">
				<div className="absolute left-0 top-0 h-full w-px bg-linear-to-b from-transparent via-border to-transparent" />

				<div className="mx-auto max-w-7xl px-6">
					<div className="mb-24 space-y-4">
						<h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Architecture</h3>
						<h2 className="font-serif text-5xl italic text-primary">A Workspace for Masters</h2>
						<p className="max-w-xl text-sm leading-relaxed text-muted-foreground italic font-serif">
							Storygraph is more than a prompt box—it's a narrative system that remembers your choices across every frame.
						</p>
					</div>

					<div className="grid gap-px bg-border md:grid-cols-3 border border-border overflow-hidden shadow-2xl">
						<div className="group space-y-8 bg-white p-12 transition-all hover:bg-gray-50/50">
							<div className="flex h-16 w-16 items-center justify-center border border-border bg-gray-50 transition-colors group-hover:bg-primary group-hover:text-white">
								<Layers size={28} strokeWidth={1.2} />
							</div>
							<div className="space-y-4">
								<h3 className="font-serif text-2xl">Visual Memory</h3>
								<p className="text-sm leading-relaxed text-muted-foreground italic font-serif opacity-80">
									Define characters once. Our graph-based memory ensures they look identical in every scene, regardless of lighting or angle.
								</p>
							</div>
						</div>

						<div className="group space-y-8 bg-white p-12 transition-all hover:bg-gray-50/50">
							<div className="flex h-16 w-16 items-center justify-center border border-border bg-gray-50 transition-colors group-hover:bg-primary group-hover:text-white">
								<Zap size={28} strokeWidth={1.2} />
							</div>
							<div className="space-y-4">
								<h3 className="font-serif text-2xl">Scene Intelligence</h3>
								<p className="text-sm leading-relaxed text-muted-foreground italic font-serif opacity-80">
									Describe intent, not tech specs. We translate your artistic direction into precise model parameters automatically.
								</p>
							</div>
						</div>

						<div className="group space-y-8 bg-white p-12 transition-all hover:bg-gray-50/50">
							<div className="flex h-16 w-16 items-center justify-center border border-border bg-gray-50 transition-colors group-hover:bg-primary group-hover:text-white">
								<Brush size={28} strokeWidth={1.2} />
							</div>
							<div className="space-y-4">
								<h3 className="font-serif text-2xl">Studio Workflow</h3>
								<p className="text-sm leading-relaxed text-muted-foreground italic font-serif opacity-80">
									A high-contrast, 3-panel storyboard workspace. Collapsible panels for focus, frames for flow.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* The Process Section (Large & Cinematic) */}
			<section className="bg-primary py-40 text-white overflow-hidden relative">
				<div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-accent/20 blur-[150px] translate-x-1/2 -translate-y-1/2" />

				<div className="mx-auto max-w-7xl px-6 relative z-10">
					<div className="grid gap-20 lg:grid-cols-2">
						<div className="space-y-12">
							<div className="space-y-6">
								<h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent/80">The Workflow</h3>
								<h2 className="font-serif text-5xl italic leading-tight md:text-7xl">From Script <br />to Cinematic.</h2>
							</div>

							<div className="space-y-10">
								<div className="flex gap-6 group">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 font-serif italic text-accent transition-colors group-hover:bg-accent group-hover:text-primary">01</div>
									<div className="space-y-2">
										<h4 className="font-serif text-xl italic underline underline-offset-8 decoration-accent/30">Define the Graph</h4>
										<p className="text-sm text-white/60 leading-relaxed font-light">Upload your character designs and environment references. We define their visual DNA in your private graph.</p>
									</div>
								</div>
								<div className="flex gap-6 group">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 font-serif italic text-accent transition-colors group-hover:bg-accent group-hover:text-primary">02</div>
									<div className="space-y-2">
										<h4 className="font-serif text-xl italic underline underline-offset-8 decoration-accent/30">Direct the Scene</h4>
										<p className="text-sm text-white/60 leading-relaxed font-light">Place assets and describe the action. Our engine handles the cinematic framing, lighting, and style consistency.</p>
									</div>
								</div>
								<div className="flex gap-6 group">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 font-serif italic text-accent transition-colors group-hover:bg-accent group-hover:text-primary">03</div>
									<div className="space-y-2">
										<h4 className="font-serif text-xl italic underline underline-offset-8 decoration-accent/30">Refine & Export</h4>
										<p className="text-sm text-white/60 leading-relaxed font-light">Iterate on specific frames while maintaining continuity. Export as high-res sequences or professional storyboard pitch-decks.</p>
									</div>
								</div>
							</div>
						</div>

						{/* Visual Mockup/Abstract representation */}
						<div className="relative flex items-center justify-center">
							<div className="aspect-4/5 w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden p-2">
								<div className="h-full w-full border border-white/5 bg-black flex items-center justify-center relative group">
									<Frame size={120} className="text-white/10 group-hover:scale-110 transition-transform duration-1000" strokeWidth={0.5} />
									<div className="absolute top-8 left-8 flex items-center gap-2">
										<div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
										<span className="text-[8px] font-bold uppercase tracking-widest text-white/40">Scene 04 // Action 12</span>
									</div>
									<img
										src="https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&q=80&w=800"
										className="absolute inset-0 h-full w-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
										alt="Cinematic frame"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Technical Edge / Infrastructure */}
			<section className="py-32 bg-white">
				<div className="mx-auto max-w-7xl px-6">
					<div className="flex flex-col md:flex-row items-baseline justify-between mb-20 gap-8">
						<div className="space-y-4">
							<h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Infrastructure</h3>
							<h2 className="font-serif text-5xl italic text-primary">Engineered for Studios</h2>
						</div>
						<Link to="/pricing">
							<Button variant="outline" className="border-border rounded-none text-[10px] font-bold uppercase tracking-widest h-12 hover:bg-gray-50 flex items-center gap-2 group">
								View Technical Specs
								<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
							</Button>
						</Link>
					</div>

					<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
						{[
							{ icon: Cpu, name: "Model Agnostic", desc: "Integrate SDXL, Flux, or proprietary fine-tuned models seamlessly." },
							{ icon: Network, name: "Graph Latency", desc: "Sub-second asset referencing and prompt composition engine." },
							{ icon: Shield, name: "Data Sovereignty", desc: "Your stories, your assets. Local-first or encrypted cloud options." },
							{ icon: Globe, name: "Global Delivery", desc: "Distributed rendering via Fal.ai for zero-delay production." },
						].map((item, idx) => {
							const Icon = item.icon;
							return (
								<div key={idx} className="space-y-6">
									<Icon size={24} className="text-accent" strokeWidth={1.5} />
									<h4 className="font-serif text-xl italic">{item.name}</h4>
									<p className="text-xs text-muted-foreground leading-relaxed font-light">{item.desc}</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* CTA Bottom */}
			<section className="py-40 bg-background relative overflow-hidden">
				<div className="absolute inset-0 opacity-[0.02] bg-[grid-black_24px] mask-[radial-gradient(ellipse_at_center,black,transparent)]" />

				<div className="mx-auto max-w-5xl px-6 text-center relative z-10">
					<div className="mb-12 flex justify-center">
						<Brush size={40} className="text-primary/20" />
					</div>
					<h2 className="mb-12 font-serif text-5xl italic text-primary md:text-7xl leading-tight">Master the Art of <br />Visual Continuity.</h2>
					<Link to="/auth/signup">
						<Button className="h-20 rounded-none bg-primary px-20 text-sm font-bold uppercase tracking-[0.3em] text-white shadow-2xl hover:bg-black group transition-all justify-center">
							<span>Join the Collective</span>
							<ChevronRight size={18} className="ml-4 group-hover:translate-x-2 transition-transform" />
						</Button>
					</Link>
					<p className="mt-12 text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60 italic">
						Professional storytelling infrastructure // EST 2026
					</p>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-border bg-white pt-24 pb-12">
				<div className="mx-auto max-w-7xl px-6">
					<div className="grid gap-16 lg:grid-cols-4 mb-24">
						<div className="space-y-8 col-span-1 lg:col-span-1">
							<div className="flex items-center gap-3">
								<Brush size={24} className="text-primary" strokeWidth={1.5} />
								<span className="font-serif text-2xl font-semibold italic">Storygraph</span>
							</div>
							<p className="text-xs text-muted-foreground leading-relaxed font-light">
								High-fidelity visual narrative infrastructure for the modern creator. Built for consistency, directed by vision.
							</p>
							<div className="flex gap-4">
								<div className="h-6 w-6 border border-border bg-gray-50 flex items-center justify-center opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
									<span className="text-[10px] font-bold">X</span>
								</div>
								<div className="h-6 w-6 border border-border bg-gray-50 flex items-center justify-center opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
									<span className="text-[10px] font-bold">IG</span>
								</div>
								<div className="h-6 w-6 border border-border bg-gray-50 flex items-center justify-center opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
									<span className="text-[10px] font-bold">LI</span>
								</div>
							</div>
						</div>

						<div className="space-y-6">
							<h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Workspace</h5>
							<ul className="space-y-4">
								{["Storyboards", "Asset Library", "Scene Editor", "Generation Engine"].map((link) => (
									<li key={link}>
										<Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors font-light">{link}</Link>
									</li>
								))}
							</ul>
						</div>

						<div className="space-y-6">
							<h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Collective</h5>
							<ul className="space-y-4">
								{["Pricing", "Studio Licenses", "Enterprise", "Creative Partners"].map((link) => (
									<li key={link}>
										<Link to="/pricing" className="text-xs text-muted-foreground hover:text-primary transition-colors font-light">{link}</Link>
									</li>
								))}
							</ul>
						</div>

						<div className="space-y-6">
							<h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Manifesto</h5>
							<p className="text-[10px] italic text-muted-foreground leading-relaxed font-serif">
								Our goal is to preserve the soul of visual storytelling by automating the friction, while keeping the human as the sole director.
							</p>
						</div>
					</div>

					<div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-border/50 gap-6">
						<p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">© 2026 Storygraph Architecture // London, UK</p>
						<div className="flex gap-8">
							<button className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Privacy Privacy</button>
							<button className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Terms of Service</button>
							<button className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Security protocol</button>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
