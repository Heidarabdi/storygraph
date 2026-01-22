import { createFileRoute } from "@tanstack/react-router";
import {
    Check,
    Sparkles,
    Zap,
    Shield,
    Minus,
    HelpCircle,
    ArrowRight,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
    component: PricingPage,
});

function PricingPage() {
    const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly");

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
        { feature: "AI Model Support", prototyping: "SDXL only", director: "All Cinematic", studio: "Custom / LoRA" },
        { feature: "Visual Continuity Graph", prototyping: false, director: true, studio: true },
        { feature: "Scene Versioning", prototyping: "3 revisions", director: "Unlimited", studio: "Unlimited" },
        { feature: "Export Quality", prototyping: "720p", director: "4K / ProRes", studio: "8K / RAW" },
        { feature: "Collaboration", prototyping: false, director: "Single User", studio: "Up to 5 (scalable)" },
        { feature: "API Access", prototyping: false, director: false, studio: true },
        { feature: "Security Protocols", prototyping: "Standard", director: "Advanced", studio: "Enterprise SSO" },
    ];

    return (
        <div className="min-h-full bg-background selection:bg-primary selection:text-white pb-40">
            {/* Header */}
            <section className="px-6 py-32 text-center border-b border-border bg-white/40 backdrop-blur-md">
                <div className="mx-auto max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 border border-border bg-white px-3 py-1">
                            <Sparkles size={12} className="text-accent" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground italic">Studio Licensing</span>
                        </div>
                    </div>
                    <h1 className="font-serif text-6xl italic tracking-tight text-primary leading-tight">Investment in <br />Consistency.</h1>
                    <p className="font-serif text-xl italic text-muted-foreground leading-relaxed max-w-xl mx-auto">
                        Scale your visual narrative from concept to production with predictable billing and no hidden costs.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 pt-4">
                        <button
                            onClick={() => setBillingPeriod("monthly")}
                            className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${billingPeriod === "monthly" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                        >
                            Monthly
                        </button>
                        <div
                            className="relative h-6 w-12 cursor-pointer bg-gray-100 border border-border transition-colors hover:border-primary/30"
                            onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annually" : "monthly")}
                        >
                            <div className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-primary transition-all duration-300 ${billingPeriod === "monthly" ? "left-1" : "left-7"}`} />
                        </div>
                        <button
                            onClick={() => setBillingPeriod("annually")}
                            className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${billingPeriod === "annually" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                        >
                            Annually
                            <span className="text-[8px] bg-accent/20 text-accent px-1.5 py-0.5 whitespace-nowrap">Save 20%</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Tiers */}
            <section className="mx-auto max-w-7xl px-6 -translate-y-12">
                <div className="grid gap-px bg-border border border-border shadow-2xl md:grid-cols-3 overflow-hidden">
                    {tiers.map((tier) => {
                        const Icon = tier.icon;
                        return (
                            <div
                                key={tier.name}
                                className={`relative flex flex-col bg-white p-12 transition-all duration-500 overflow-hidden ${tier.highlight ? "ring-inset" : "hover:bg-gray-50/50"
                                    }`}
                            >
                                {tier.highlight && (
                                    <div className="absolute top-0 right-0">
                                        <div className="bg-primary text-white text-[8px] font-bold uppercase tracking-[0.3em] px-10 py-2 rotate-45 translate-x-10 translate-y-2">
                                            Priority
                                        </div>
                                    </div>
                                )}

                                <div className="mb-10 space-y-6">
                                    <div className="flex h-12 w-12 items-center justify-center border border-border bg-gray-50">
                                        <Icon size={20} className={tier.highlight ? "text-primary" : "text-muted-foreground"} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-serif text-3xl">{tier.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-serif">/</span>
                                        <span className="text-6xl font-serif tracking-tighter">{tier.price}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-2">USD / mo</span>
                                    </div>
                                    <p className="text-xs font-serif italic text-muted-foreground leading-relaxed">
                                        {tier.description}
                                    </p>
                                </div>

                                <div className="mb-12 flex-1 space-y-6">
                                    <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary/30 flex items-center gap-2">
                                        <div className="h-px flex-1 bg-border" />
                                        Inclusions
                                        <div className="h-px flex-1 bg-border" />
                                    </div>
                                    <ul className="space-y-4">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3">
                                                <Check size={14} className="mt-0.5 text-primary" strokeWidth={3} />
                                                <span className="text-[11px] font-medium leading-tight text-primary/80">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Button
                                    variant={tier.highlight ? "default" : "outline"}
                                    className={`h-16 rounded-none px-8 text-[11px] font-bold uppercase tracking-[0.3em] shadow-none group ${tier.highlight ? "bg-primary text-white hover:bg-black" : "border-border hover:bg-white"
                                        }`}
                                >
                                    {tier.cta}
                                    <ChevronRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Feature Comparison Table */}
            <section className="mx-auto max-w-5xl px-6 py-32">
                <div className="mb-16 text-center space-y-4">
                    <h2 className="font-serif text-4xl italic text-primary">In-Depth Comparison</h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Detailed Technical Specifics</p>
                </div>

                <div className="border border-border">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-border">
                                <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-primary">Feature</th>
                                <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-center border-l border-border">Prototyping</th>
                                <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-center border-l border-border bg-primary/5">Director</th>
                                <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-center border-l border-border">Studio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparison.map((row, idx) => (
                                <tr key={idx} className="border-b border-border last:border-0 hover:bg-gray-50/30 transition-colors">
                                    <td className="p-8 flex items-center gap-2">
                                        <span className="text-[11px] font-bold uppercase tracking-widest text-primary/80">{row.feature}</span>
                                        <HelpCircle size={12} className="text-muted-foreground/30 hover:text-accent cursor-help" />
                                    </td>
                                    <td className="p-8 border-l border-border text-center">
                                        {typeof row.prototyping === "boolean" ? (
                                            row.prototyping ? <Check size={16} className="mx-auto text-primary" /> : <Minus size={16} className="mx-auto text-muted-foreground/20" />
                                        ) : (
                                            <span className="text-[10px] font-medium text-muted-foreground">{row.prototyping}</span>
                                        )}
                                    </td>
                                    <td className="p-8 border-l border-border text-center bg-primary/2">
                                        {typeof row.director === "boolean" ? (
                                            row.director ? <Check size={16} className="mx-auto text-primary" /> : <Minus size={16} className="mx-auto text-muted-foreground/20" />
                                        ) : (
                                            <span className="text-[10px] font-bold text-primary">{row.director}</span>
                                        )}
                                    </td>
                                    <td className="p-8 border-l border-border text-center">
                                        {typeof row.studio === "boolean" ? (
                                            row.studio ? <Check size={16} className="mx-auto text-primary" /> : <Minus size={16} className="mx-auto text-muted-foreground/20" />
                                        ) : (
                                            <span className="text-[10px] font-medium text-muted-foreground">{row.studio}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Enterprise CTA */}
            <section className="mx-auto max-w-7xl px-6">
                <div className="bg-primary p-16 flex flex-col md:flex-row items-center justify-between gap-12 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop" className="h-full w-full object-cover" alt="" />
                    </div>
                    <div className="space-y-4 relative z-10 max-w-xl">
                        <h2 className="font-serif text-4xl italic leading-tight">Bespoke Infrastructure for Global Studios.</h2>
                        <p className="font-serif text-lg italic text-white/60">
                            Custom rendering nodes, on-premise visual graphs, and dedicated production support.
                        </p>
                    </div>
                    <Button className="h-16 rounded-none bg-accent text-primary px-12 text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-white relative z-10 shrink-0">
                        Speak with Architecture
                        <ArrowRight size={16} className="ml-2" />
                    </Button>
                </div>
            </section>
        </div>
    );
}
