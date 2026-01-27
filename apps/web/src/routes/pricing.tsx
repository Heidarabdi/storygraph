import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	Check,
	ChevronRight,
	HelpCircle,
	Minus,
	Shield,
	Sparkles,
	Zap,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
	component: PricingPage,
});

function PricingPage() {
	const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">(
		"monthly",
	);

	const tiers = [
		{
			name: "Prototyping",
			price: billingPeriod === "monthly" ? "0" : "0",
			description: "For creators finding their visual language.",
			features: [
				"3 Active Visual Journeys",
				"30 AI Generations / mo",
				"Single Model (SDXL)",
				"Community Support",
			],
			icon: Zap,
			cta: "Start Free",
			highlight: false,
		},
		{
			name: "Director",
			price: billingPeriod === "monthly" ? "49" : "39",
			description: "For professionals delivering consistent stories.",
			features: [
				"Unlimited Projects",
				"500 AI Generations / mo",
				"All Cinematic Models (Fal.ai)",
				"Character Continuity Graph",
				"High-Res Exports",
			],
			icon: Sparkles,
			cta: "Begin Journey",
			highlight: true,
		},
		{
			name: "Studio",
			price: billingPeriod === "monthly" ? "199" : "159",
			description: "For teams building cinematic universes.",
			features: [
				"Collaborative Workspace",
				"2000 AI Generations / mo",
				"Private LoRA Support",
				"Enterprise Security",
				"Priority Rendering",
			],
			icon: Shield,
			cta: "Contact Sales",
			highlight: false,
		},
	];

	const comparison = [
		{
			feature: "AI Model Support",
			prototyping: "SDXL only",
			director: "All Cinematic",
			studio: "Custom / LoRA",
		},
		{
			feature: "Visual Continuity Graph",
			prototyping: false,
			director: true,
			studio: true,
		},
		{
			feature: "Scene Versioning",
			prototyping: "3 revisions",
			director: "Unlimited",
			studio: "Unlimited",
		},
		{
			feature: "Export Quality",
			prototyping: "720p",
			director: "4K / ProRes",
			studio: "8K / RAW",
		},
		{
			feature: "Collaboration",
			prototyping: false,
			director: "Single User",
			studio: "Up to 5 (scalable)",
		},
		{
			feature: "API Access",
			prototyping: false,
			director: false,
			studio: true,
		},
		{
			feature: "Security Protocols",
			prototyping: "Standard",
			director: "Advanced",
			studio: "Enterprise SSO",
		},
	];

	return (
		<div className="min-h-full bg-background pb-40 selection:bg-primary selection:text-white">
			{/* Header */}
			<section className="border-border border-b bg-card/40 px-6 py-32 text-center backdrop-blur-md">
				<div className="fade-in slide-in-from-bottom-4 mx-auto max-w-3xl animate-in space-y-8 duration-1000">
					<div className="flex justify-center">
						<div className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1">
							<Sparkles size={12} className="text-accent" />
							<span className="font-bold text-[9px] text-muted-foreground uppercase italic tracking-[0.2em]">
								Studio Licensing
							</span>
						</div>
					</div>
					<h1 className="font-serif text-3xl text-primary italic leading-tight tracking-tight sm:text-4xl md:text-6xl">
						Investment in Consistency.
					</h1>
					<p className="mx-auto max-w-xl px-4 font-serif text-base text-muted-foreground italic leading-relaxed sm:text-lg md:text-xl">
						Scale your visual narrative from concept to production with
						predictable billing and no hidden costs.
					</p>

					{/* Billing Toggle */}
					<div className="flex items-center justify-center gap-2 pt-4 sm:gap-4">
						<button
							onClick={() => setBillingPeriod("monthly")}
							className={`font-bold text-[9px] uppercase tracking-wider transition-colors sm:text-[10px] sm:tracking-[0.2em] ${billingPeriod === "monthly" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
							type="button"
						>
							Monthly
						</button>
						<button
							className="relative h-6 w-12 cursor-pointer border border-border bg-muted transition-colors hover:border-primary/30"
							onClick={() =>
								setBillingPeriod(
									billingPeriod === "monthly" ? "annually" : "monthly",
								)
							}
							type="button"
						>
							<div
								className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 bg-primary transition-all duration-300 ${billingPeriod === "monthly" ? "left-1" : "left-7"}`}
							/>
						</button>
						<button
							onClick={() => setBillingPeriod("annually")}
							className={`flex items-center gap-1 font-bold text-[9px] uppercase tracking-wider transition-colors sm:gap-2 sm:text-[10px] sm:tracking-[0.2em] ${billingPeriod === "annually" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
							type="button"
						>
							Annually
							<span className="whitespace-nowrap bg-accent/20 px-1.5 py-0.5 text-[8px] text-accent">
								Save 20%
							</span>
						</button>
					</div>
				</div>
			</section>

			{/* Tiers */}
			<section className="mx-auto max-w-7xl -translate-y-12 px-6">
				<div className="grid gap-px overflow-hidden border border-border bg-border shadow-2xl md:grid-cols-3">
					{tiers.map((tier) => {
						const Icon = tier.icon;
						return (
							<div
								key={tier.name}
								className={`relative flex flex-col overflow-hidden bg-card p-6 transition-all duration-500 min-[400px]:p-12 ${
									tier.highlight ? "ring-inset" : "hover:bg-muted/50"
								}`}
							>
								{tier.highlight && (
									<div className="absolute top-0 right-0">
										<div className="translate-x-10 translate-y-2 rotate-45 bg-primary px-10 py-2 font-bold text-[8px] text-white uppercase tracking-[0.3em]">
											Priority
										</div>
									</div>
								)}

								<div className="mb-10 space-y-6">
									<div className="flex h-12 w-12 items-center justify-center border border-border bg-muted">
										<Icon
											size={20}
											className={
												tier.highlight
													? "text-primary"
													: "text-muted-foreground"
											}
											strokeWidth={1.5}
										/>
									</div>
									<h3 className="font-serif text-3xl">{tier.name}</h3>
									<div className="flex items-baseline gap-1">
										<span className="font-serif text-3xl sm:text-4xl">/</span>
										<span className="font-serif text-5xl tracking-tighter sm:text-6xl">
											{tier.price}
										</span>
										<span className="ml-2 font-bold text-[9px] text-muted-foreground uppercase tracking-widest sm:text-[10px]">
											USD / mo
										</span>
									</div>
									<p className="font-serif text-muted-foreground text-xs italic leading-relaxed">
										{tier.description}
									</p>
								</div>

								<div className="mb-12 flex-1 space-y-6">
									<div className="flex items-center gap-2 font-bold text-[9px] text-primary/30 uppercase tracking-[0.4em]">
										<div className="h-px flex-1 bg-border" />
										Inclusions
										<div className="h-px flex-1 bg-border" />
									</div>
									<ul className="space-y-4">
										{tier.features.map((feature) => (
											<li key={feature} className="flex items-start gap-3">
												<Check
													size={14}
													className="mt-0.5 text-primary"
													strokeWidth={3}
												/>
												<span className="font-medium text-[11px] text-primary/80 leading-tight">
													{feature}
												</span>
											</li>
										))}
									</ul>
								</div>

								<Button
									variant={tier.highlight ? "default" : "outline"}
									className={`group h-16 rounded-none px-8 font-bold text-[11px] uppercase tracking-[0.3em] shadow-none ${
										tier.highlight
											? "bg-primary text-primary-foreground hover:bg-black"
											: "border-border hover:bg-muted"
									}`}
								>
									{tier.cta}
									<ChevronRight
										size={14}
										className="ml-2 transition-transform group-hover:translate-x-1"
									/>
								</Button>
							</div>
						);
					})}
				</div>
			</section>

			{/* Feature Comparison Table */}
			<section className="mx-auto max-w-5xl px-6 py-32">
				<div className="mb-16 space-y-4 text-center">
					<h2 className="font-serif text-4xl text-primary italic">
						In-Depth Comparison
					</h2>
					<p className="font-bold text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
						Detailed Technical Specifics
					</p>
				</div>

				<div className="w-full overflow-hidden border border-border">
					<div className="overflow-x-auto">
						<div className="min-w-[600px]">
							<table className="w-full text-left">
								<thead>
									<tr className="border-border border-b bg-muted/50">
										<th className="p-4 font-bold text-[10px] text-primary uppercase tracking-widest md:p-8">
											Feature
										</th>
										<th className="border-border border-l p-4 text-center font-bold text-[10px] uppercase tracking-widest md:p-8">
											Prototyping
										</th>
										<th className="border-border border-l bg-primary/5 p-4 text-center font-bold text-[10px] uppercase tracking-widest md:p-8">
											Director
										</th>
										<th className="border-border border-l p-4 text-center font-bold text-[10px] uppercase tracking-widest md:p-8">
											Studio
										</th>
									</tr>
								</thead>
								<tbody>
									{comparison.map((row) => (
										<tr
											key={row.feature}
											className="border-border border-b transition-colors last:border-0 hover:bg-muted/30"
										>
											<td className="flex items-center gap-2 p-4 md:p-8">
												<span className="font-bold text-[11px] text-primary/80 uppercase tracking-widest">
													{row.feature}
												</span>
												<HelpCircle
													size={12}
													className="cursor-help text-muted-foreground/30 hover:text-accent"
												/>
											</td>
											<td className="border-border border-l p-4 text-center md:p-8">
												{typeof row.prototyping === "boolean" ? (
													row.prototyping ? (
														<Check size={16} className="mx-auto text-primary" />
													) : (
														<Minus
															size={16}
															className="mx-auto text-muted-foreground/20"
														/>
													)
												) : (
													<span className="font-medium text-[10px] text-muted-foreground">
														{row.prototyping}
													</span>
												)}
											</td>
											<td className="border-border border-l bg-primary/2 p-4 text-center md:p-8">
												{typeof row.director === "boolean" ? (
													row.director ? (
														<Check size={16} className="mx-auto text-primary" />
													) : (
														<Minus
															size={16}
															className="mx-auto text-muted-foreground/20"
														/>
													)
												) : (
													<span className="font-bold text-[10px] text-primary">
														{row.director}
													</span>
												)}
											</td>
											<td className="border-border border-l p-4 text-center md:p-8">
												{typeof row.studio === "boolean" ? (
													row.studio ? (
														<Check size={16} className="mx-auto text-primary" />
													) : (
														<Minus
															size={16}
															className="mx-auto text-muted-foreground/20"
														/>
													)
												) : (
													<span className="font-medium text-[10px] text-muted-foreground">
														{row.studio}
													</span>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>

			{/* Enterprise CTA */}
			<section className="mx-auto max-w-7xl px-6">
				<div className="relative flex flex-col items-center justify-between gap-12 overflow-hidden bg-primary p-8 text-primary-foreground sm:p-16 md:flex-row">
					<div className="absolute inset-0 opacity-10">
						<img
							src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop"
							className="h-full w-full object-cover"
							alt=""
						/>
					</div>
					<div className="relative z-10 max-w-xl space-y-4">
						<h2 className="font-serif text-2xl italic leading-tight sm:text-3xl md:text-4xl">
							Bespoke Infrastructure for Global Studios.
						</h2>
						<p className="font-serif text-base text-primary-foreground/60 italic sm:text-lg">
							Custom rendering nodes, on-premise visual graphs, and dedicated
							production support.
						</p>
					</div>
					<Button className="relative z-10 h-16 w-full shrink-0 rounded-none bg-accent px-6 font-bold text-[11px] text-primary-foreground uppercase tracking-[0.2em] shadow-2xl hover:bg-white sm:px-12 md:w-auto">
						Speak with Architecture
						<ArrowRight size={16} className="ml-2" />
					</Button>
				</div>
			</section>
		</div>
	);
}
