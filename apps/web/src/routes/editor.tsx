import { createFileRoute } from "@tanstack/react-router";
import {
	ChevronDown,
	Download,
	Eye,
	History,
	Menu,
	PanelLeftClose,
	PanelLeftOpen,
	PanelRightClose,
	PanelRightOpen,
	Play,
	Plus,
	RotateCcw,
	Search,
	Settings2,
	Sparkles,
	X,
	Zap,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export const Route = createFileRoute("/editor")({
	component: EditorPage,
});

// Mock data
const mockCharacters = [
	{
		id: "1",
		name: "Kaelen",
		emotions: ["Neutral", "Intensity", "Despair", "Triumph"],
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kaelen",
	},
	{
		id: "2",
		name: "Lyra-RX",
		emotions: ["Standard", "Protocol", "Error"],
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lyra",
	},
	{
		id: "3",
		name: "The Shaman",
		emotions: ["Mystic", "Awakened"],
		image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shaman",
	},
];

const mockFrames = [
	{
		id: "1",
		index: "01",
		type: "Establishing",
		thumb: "https://images.unsplash.com/photo-1514565131-bce0801e5787",
	},
	{
		id: "2",
		index: "02",
		type: "Medium Shot",
		thumb: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4",
	},
	{
		id: "3",
		index: "03",
		type: "Extreme Close-up",
		thumb: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
	},
];

function EditorPage() {
	const [leftPanelOpen, setLeftPanelOpen] = useState(true);
	const [rightPanelOpen, setRightPanelOpen] = useState(true);
	const [activeFrame, setActiveFrame] = useState("1");

	const LeftSidebarContent = () => (
		<div className="flex h-full flex-col overflow-hidden">
			<div className="flex h-14 shrink-0 items-center justify-between border-border border-b px-6">
				<h3 className="font-serif text-lg text-primary italic">
					Director's Library
				</h3>
				<Button
					variant="ghost"
					size="icon"
					className="hidden h-8 w-8 text-muted-foreground hover:text-primary lg:flex"
					onClick={() => setLeftPanelOpen(false)}
				>
					<PanelLeftClose size={18} strokeWidth={1.5} />
				</Button>
			</div>

			<Tabs
				defaultValue="characters"
				className="flex flex-1 flex-col overflow-hidden"
			>
				<div className="shrink-0 border-border border-b">
					<TabsList className="flex h-12 w-full justify-start rounded-none bg-transparent p-0">
						{["Characters", "Environment", "Props"].map((tab) => (
							<TabsTrigger
								key={tab}
								value={tab.toLowerCase()}
								className="relative flex-1 rounded-none border-transparent border-b-2 px-2 font-bold text-[10px] text-muted-foreground uppercase tracking-[0.2em] shadow-none transition-all data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
							>
								{tab}
							</TabsTrigger>
						))}
					</TabsList>
				</div>

				<ScrollArea className="flex-1">
					<div className="p-6">
						<TabsContent value="characters" className="m-0 space-y-8">
							<div className="group relative">
								<Input
									className="rounded-none border-border border-b bg-transparent py-3 pl-8 text-[10px] text-foreground uppercase tracking-widest shadow-none placeholder:font-serif placeholder:italic focus-visible:border-primary focus-visible:ring-0"
									placeholder="search cast..."
								/>
								<Search
									size={14}
									className="absolute top-1/2 left-0 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
								/>
							</div>

							<div className="grid grid-cols-2 gap-6">
								{mockCharacters.map((char) => (
									<div key={char.id} className="group cursor-pointer space-y-3">
										<div className="aspect-square overflow-hidden border border-border bg-card p-1 transition-all group-hover:-translate-y-1 group-hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.1)]">
											<div className="flex h-full w-full items-center justify-center overflow-hidden bg-muted/20">
												<img
													src={char.image}
													alt={char.name}
													className="h-full w-full object-cover saturate-[0.25] transition-all duration-700 group-hover:saturate-100"
												/>
											</div>
										</div>
										<div className="space-y-0.5">
											<p className="font-bold text-[10px] text-primary uppercase tracking-widest">
												{char.name}
											</p>
											<p className="font-serif text-[8px] text-muted-foreground uppercase italic tracking-tighter">
												{char.emotions[0]} state
											</p>
										</div>
									</div>
								))}
								<button className="flex aspect-square flex-col items-center justify-center gap-2 border border-border border-dashed text-muted-foreground transition-all hover:bg-muted/50 hover:text-primary">
									<Plus size={20} />
									<span className="font-bold text-[9px] uppercase tracking-widest">
										New Actor
									</span>
								</button>
							</div>
						</TabsContent>

						<TabsContent value="environment" className="m-0">
							<p className="p-4 text-center font-serif text-[10px] text-muted-foreground italic">
								Select active visual domain...
							</p>
						</TabsContent>
					</div>
				</ScrollArea>
			</Tabs>
		</div>
	);

	const RightSidebarContent = () => (
		<div className="flex h-full flex-col overflow-hidden">
			<div className="flex h-14 shrink-0 items-center justify-between border-border border-b px-6">
				<h3 className="font-serif text-lg text-primary italic">
					Synthesis Specs
				</h3>
				<Button
					variant="ghost"
					size="icon"
					className="hidden h-8 w-8 text-muted-foreground hover:text-primary lg:flex"
					onClick={() => setRightPanelOpen(false)}
				>
					<PanelRightClose size={18} strokeWidth={1.5} />
				</Button>
			</div>

			<ScrollArea className="flex-1">
				<div className="space-y-12 px-8 py-10">
					<div className="space-y-6">
						<label className="flex w-full items-center justify-between font-bold text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
							Visual Engine
							<Settings2 size={12} className="opacity-20" />
						</label>
						<div className="group relative">
							<select className="w-full cursor-pointer appearance-none rounded-none border-border border-b-2 bg-transparent px-1 py-3 font-bold text-[11px] text-primary uppercase tracking-widest shadow-none outline-none transition-colors focus:border-primary">
								<option className="bg-card">Flux.1 Ultra Render</option>
								<option className="bg-card">SDXL Cinematic v4</option>
								<option className="bg-card">Aether Fine-Tune v2</option>
							</select>
							<ChevronDown
								size={14}
								className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary"
							/>
						</div>
					</div>

					<div className="space-y-8">
						<label className="font-bold text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
							Style Profile
						</label>
						<div className="grid grid-cols-2 gap-4">
							{[
								{ name: "Noir 35", color: "bg-neutral-900" },
								{ name: "Velvia 50", color: "bg-blue-900" },
								{ name: "Matte Paint", color: "bg-amber-100" },
								{ name: "Digital", color: "bg-emerald-500" },
							].map((style) => (
								<button
									key={style.name}
									className="group flex flex-col items-center gap-3"
								>
									<div
										className={
											"aspect-video w-full border border-border bg-card p-1 transition-all group-hover:border-accent group-hover:shadow-lg"
										}
									>
										<div
											className={`h-full w-full ${style.color} opacity-20 transition-opacity group-hover:opacity-40`}
										/>
									</div>
									<span className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest group-hover:text-primary">
										{style.name}
									</span>
								</button>
							))}
						</div>
					</div>

					<div className="space-y-10 border-border/50 border-t pt-6">
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<label className="font-bold text-[10px] text-primary/60 uppercase tracking-[0.2em]">
									DNA Consistency
								</label>
								<span className="font-bold font-mono text-[10px] text-accent">
									92%
								</span>
							</div>
							<Slider
								defaultValue={[92]}
								max={100}
								step={1}
								className="**:[[role=slider]]:h-3 **:[[role=slider]]:w-3 **:[[role=slider]]:border-none **:[[role=slider]]:bg-accent"
							/>
						</div>
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<label className="font-bold text-[10px] text-primary/60 uppercase tracking-[0.2em]">
									Creative Variance
								</label>
								<span className="font-bold font-mono text-[10px] text-accent">
									0.45
								</span>
							</div>
							<Slider
								defaultValue={[45]}
								max={100}
								step={1}
								className="**:[[role=slider]]:h-3 **:[[role=slider]]:w-3 **:[[role=slider]]:border-none **:[[role=slider]]:bg-accent"
							/>
						</div>
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<label className="font-bold text-[10px] text-primary/60 uppercase tracking-[0.2em]">
									Render Iteration
								</label>
								<span className="font-bold font-mono text-[10px] text-accent">
									50
								</span>
							</div>
							<Slider
								defaultValue={[50]}
								max={100}
								step={1}
								className="**:[[role=slider]]:h-3 **:[[role=slider]]:w-3 **:[[role=slider]]:border-none **:[[role=slider]]:bg-accent"
							/>
						</div>
					</div>
				</div>
			</ScrollArea>

			<div className="shrink-0 space-y-4 border-border border-t bg-card p-8 shadow-2xl">
				<Button className="group h-14 w-full rounded-none bg-primary font-bold text-[11px] text-primary-foreground uppercase tracking-[0.3em] shadow-2xl transition-all hover:bg-accent hover:text-primary-foreground">
					<Zap
						size={18}
						className="mr-3 transition-transform group-hover:scale-125"
					/>
					Synthesize Frame
				</Button>
				<div className="flex flex-col items-center justify-center gap-2">
					<span className="font-bold text-[8px] text-muted-foreground uppercase tracking-widest">
						Estimated Synthesis: 4.2s
					</span>
					<button className="font-bold text-[9px] text-primary/40 lowercase italic tracking-widest underline decoration-accent/30 underline-offset-4 transition-colors hover:text-primary">
						Save Configuration Profile
					</button>
				</div>
			</div>
		</div>
	);

	return (
		<TooltipProvider>
			<div className="flex h-full min-h-[500px] flex-col overflow-hidden bg-background selection:bg-primary selection:text-primary-foreground">
				{/* Master Toolbar */}
				<div className="z-50 flex h-12 shrink-0 items-center justify-between border-border border-b bg-card px-4 md:px-6">
					<div className="flex items-center gap-3 md:gap-6">
						<div className="flex lg:hidden">
							<Sheet>
								<SheetTrigger asChild>
									<Button variant="ghost" size="icon" className="h-8 w-8">
										<Menu size={18} />
									</Button>
								</SheetTrigger>
								<SheetContent
									side="left"
									className="w-80 border-border border-r p-0"
								>
									<LeftSidebarContent />
								</SheetContent>
							</Sheet>
						</div>
						<div className="flex items-center gap-3 border-border border-r pr-4 md:pr-6">
							<span className="max-w-[120px] truncate font-bold text-[10px] text-primary uppercase tracking-[0.2em] md:max-w-none md:tracking-[0.3em]">
								SC_01 // Neon Protocol
							</span>
							<Badge className="hidden border-accent/20 bg-accent/10 text-accent italic sm:inline-flex">
								Scene 01 ACTIVE
							</Badge>
						</div>
						<div className="hidden items-center gap-1 sm:flex">
							{["Draft", "Refine", "Finalize"].map((step) => (
								<button
									key={step}
									className={`px-4 py-1.5 font-bold text-[9px] uppercase tracking-widest transition-colors ${step === "Refine" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
								>
									{step}
								</button>
							))}
						</div>
					</div>
					<div className="flex items-center gap-2 md:gap-4">
						<span className="hidden font-bold text-[9px] text-muted-foreground uppercase italic tracking-widest md:inline-block">
							Auto-Syncing DNA...
						</span>
						<div className="mx-1 hidden h-6 w-px bg-border md:mx-2 md:block" />
						<button className="p-1 text-muted-foreground transition-colors hover:text-primary">
							<History size={16} strokeWidth={1.5} />
						</button>
						<button className="p-1 text-muted-foreground transition-colors hover:text-primary">
							<Download size={16} strokeWidth={1.5} />
						</button>
						<div className="ml-2 flex lg:hidden">
							<Sheet>
								<SheetTrigger asChild>
									<Button variant="ghost" size="icon" className="h-8 w-8">
										<Settings2 size={18} />
									</Button>
								</SheetTrigger>
								<SheetContent
									side="right"
									className="w-80 border-border border-l p-0"
								>
									<RightSidebarContent />
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</div>

				<main className="relative flex flex-1 overflow-hidden">
					{/* Left Sidebar - Library */}
					{leftPanelOpen && (
						<aside className="fade-in slide-in-from-left relative hidden w-80 shrink-0 animate-in flex-col border-border border-r bg-card/40 backdrop-blur-md duration-500 lg:flex">
							<LeftSidebarContent />
						</aside>
					)}

					{/* Center Content - Canvas Area */}
					<div className="scrollbar-none flex flex-1 flex-col items-center overflow-y-auto scroll-smooth bg-background/30 px-4 py-10 md:px-10 md:py-16">
						<div className="w-full max-w-5xl space-y-12">
							{/* Active Frame Display */}
							<div className="group relative">
								{!leftPanelOpen && (
									<Tooltip>
										<TooltipTrigger asChild>
											<button
												className="absolute top-0 -left-16 hidden border border-border bg-card p-2 text-muted-foreground transition-colors hover:text-primary lg:flex"
												onClick={() => setLeftPanelOpen(true)}
											>
												<PanelLeftOpen size={18} strokeWidth={1.5} />
											</button>
										</TooltipTrigger>
										<TooltipContent side="right">Open Library</TooltipContent>
									</Tooltip>
								)}

								<div className="absolute -top-8 left-0 flex items-center gap-4">
									<div className="flex items-center gap-2">
										<div className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
										<span className="font-bold text-[11px] text-primary uppercase tracking-[0.3em]">
											Frame // 0X12-04
										</span>
									</div>
									<div className="hidden h-px w-12 bg-border sm:block" />
									<span className="hidden font-bold text-[9px] text-muted-foreground uppercase italic tracking-[0.2em] sm:inline">
										2.39:1 Anamorphic
									</span>
								</div>

								<div className="border border-border bg-card p-1.5 shadow-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl">
									<div className="group/img relative aspect-[2.39/1] overflow-hidden border border-border/50 bg-muted/20">
										<img
											src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1200"
											alt="Current frame"
											className="h-full w-full object-cover saturate-[0.85] transition-transform duration-2000 group-hover/img:scale-105"
										/>
										<div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
											<div className="flex scale-95 gap-4 px-4 text-center transition-transform group-hover:scale-100">
												<Button className="h-10 rounded-none bg-primary px-6 font-bold text-[9px] text-primary-foreground uppercase tracking-widest shadow-2xl transition-all hover:bg-accent md:h-12 md:px-8 md:text-[10px]">
													<Eye size={14} className="mr-2" /> Inspect DNA
												</Button>
												<Button
													variant="outline"
													className="hidden h-12 rounded-none border border-white/20 bg-white/10 px-8 font-bold text-[10px] text-white uppercase tracking-widest backdrop-blur-md transition-all hover:bg-white hover:text-black md:flex"
												>
													Source Image
												</Button>
											</div>
										</div>
									</div>
								</div>

								<div className="absolute top-0 -right-4 flex flex-col gap-3 sm:-right-16">
									<Tooltip>
										<TooltipTrigger asChild>
											<button className="flex h-10 w-10 items-center justify-center border border-border bg-card text-primary shadow-sm transition-all hover:text-accent hover:shadow-lg sm:h-12 sm:w-12">
												<RotateCcw
													size={16}
													className="sm:size-[18px]"
													strokeWidth={1.5}
												/>
											</button>
										</TooltipTrigger>
										<TooltipContent side="left">Regenerate Seed</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger asChild>
											<button className="flex h-10 w-10 items-center justify-center border border-border bg-card text-primary shadow-sm transition-all hover:text-accent hover:shadow-lg sm:h-12 sm:w-12">
												<Sparkles
													size={16}
													className="sm:size-[18px]"
													strokeWidth={1.5}
												/>
											</button>
										</TooltipTrigger>
										<TooltipContent side="left">Enhance Quality</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger asChild>
											<button className="flex h-10 w-10 items-center justify-center border border-border bg-card text-primary shadow-sm transition-all hover:text-red-500 hover:shadow-lg sm:h-12 sm:w-12">
												<X
													size={16}
													className="sm:size-[18px]"
													strokeWidth={1.5}
												/>
											</button>
										</TooltipTrigger>
										<TooltipContent side="left">Purge Frame</TooltipContent>
									</Tooltip>
								</div>
							</div>

							{/* Narrative Controls */}
							<div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-10 overflow-visible pt-6 pb-20 lg:grid-cols-12 lg:gap-12 lg:pb-0">
								<div className="flex flex-col gap-10 lg:col-span-8">
									<div className="group space-y-4">
										<label className="flex items-center gap-3 font-bold text-[10px] text-muted-foreground uppercase tracking-[0.4em] transition-colors group-focus-within:text-primary">
											<Zap size={14} className="text-accent" />
											Frame Intent // Synthesis instructions
										</label>
										<textarea
											className="h-32 w-full resize-none border-border border-b-2 bg-transparent py-4 font-serif text-foreground text-xl italic leading-relaxed outline-none transition-all placeholder:text-muted-foreground/20 focus:border-primary md:text-2xl"
											placeholder="Direct the scene's emotional weight, lighting hierarchy, and cinematic beats..."
											defaultValue="Kaelen stands amidst the neon sprawl, the rain reflecting high-contrast magenta and cobalt across his obsidian collar. High-angle cinematic wide shot."
										/>
									</div>
									<div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
										<div className="group space-y-3">
											<label className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
												Vocal Beat // Dialogue
											</label>
											<Input
												className="rounded-none border-0 border-border border-b bg-transparent px-0 py-4 font-serif text-base text-foreground/80 italic shadow-none focus-visible:border-primary focus-visible:ring-0 md:text-lg"
												defaultValue='"The protocol was never meant for survival."'
											/>
										</div>
										<div className="group space-y-3">
											<label className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest transition-colors group-focus-within:text-primary">
												Technical Spec // Camera
											</label>
											<Input
												className="rounded-none border-0 border-border border-b bg-transparent px-0 py-4 font-bold text-[9px] text-accent uppercase tracking-[0.2em] shadow-none focus-visible:border-primary focus-visible:ring-0 md:text-[10px]"
												defaultValue="35MM ANAMORPHIC // F2.8 // RAIN FX"
											/>
										</div>
									</div>
								</div>

								<div className="space-y-10 border-border lg:col-span-4 lg:border-l lg:pl-12">
									<div className="space-y-6">
										<h4 className="font-bold text-[10px] text-primary/40 uppercase italic tracking-widest">
											Active DNA Manifest
										</h4>
										<div className="space-y-4">
											{[
												"Kaelen (Major)",
												"Neo Tokyo (Major)",
												"Obsidian Gear (Minor)",
											].map((asset) => (
												<div
													key={asset}
													className="group flex cursor-help items-center justify-between"
												>
													<span className="font-bold text-[10px] text-foreground/70 uppercase tracking-widest transition-colors group-hover:text-accent">
														{asset}
													</span>
													<Badge className="border-border bg-muted text-[8px] opacity-40">
														PINNED
													</Badge>
												</div>
											))}
										</div>
									</div>
									<div className="border-border/50 border-t pt-6">
										<p className="font-serif text-[9px] text-muted-foreground italic leading-tight">
											Assets are automatically referenced by the visual engine
											for consistent continuity across frames.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Sidebar - Properties */}
					{rightPanelOpen && (
						<aside className="fade-in slide-in-from-right relative hidden w-80 shrink-0 animate-in flex-col border-border border-l bg-card/50 backdrop-blur-md duration-500 lg:flex">
							{!rightPanelOpen && (
								<Tooltip>
									<TooltipTrigger asChild>
										<button
											className="absolute top-0 -right-16 hidden border border-border bg-card p-2 text-muted-foreground transition-colors hover:text-primary lg:flex"
											onClick={() => setRightPanelOpen(true)}
										>
											<PanelRightOpen size={18} strokeWidth={1.5} />
										</button>
									</TooltipTrigger>
									<TooltipContent side="left">Open Specs</TooltipContent>
								</Tooltip>
							)}
							<RightSidebarContent />
						</aside>
					)}
				</main>

				{/* Timeline Master Bar */}
				<footer className="z-50 flex h-40 shrink-0 items-center gap-4 border-border border-t bg-card px-4 shadow-[0_-16px_48px_rgba(0,0,0,0.03)] backdrop-blur-md md:h-44 md:gap-10 md:px-10">
					<div className="no-scrollbar flex min-w-0 flex-1 items-center gap-4 overflow-x-auto py-6 md:gap-8">
						<div className="flex h-full shrink-0 flex-col justify-center gap-1 border-border border-r pr-4 md:pr-8">
							<h5 className="font-bold text-[9px] text-primary uppercase italic tracking-widest md:text-[10px]">
								Scene 01
							</h5>
							<p className="hidden font-bold text-[8px] text-muted-foreground/40 uppercase tracking-widest sm:block md:text-[9px]">
								Neon Protocol
							</p>
						</div>

						{mockFrames.map((frame) => (
							<div
								key={frame.id}
								onClick={() => setActiveFrame(frame.id)}
								className={`group/f relative aspect-[2.39/1] h-full shrink-0 cursor-pointer overflow-hidden border transition-all duration-500 ${
									activeFrame === frame.id
										? "border-accent p-0.5 ring-2 ring-accent/5 md:ring-4"
										: "border-border opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
								}`}
							>
								<div className="relative h-full w-full overflow-hidden bg-muted/20">
									<img
										src={frame.thumb + "?auto=format&fit=crop&q=80&w=400"}
										className="h-full w-full object-cover"
									/>
									<div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 p-1.5 backdrop-blur-sm transition-transform group-hover/f:translate-y-0">
										<p className="text-center font-bold text-[7px] text-white uppercase tracking-widest">
											{frame.type}
										</p>
									</div>
								</div>
								<div
									className={`absolute top-0 left-0 px-2 py-0.5 font-bold text-[7px] italic md:text-[8px] ${activeFrame === frame.id ? "bg-accent text-white" : "bg-primary/20 text-primary"}`}
								>
									{frame.index}
								</div>
							</div>
						))}

						<button className="flex aspect-[2.39/1] h-full shrink-0 flex-col items-center justify-center gap-2 border border-border border-dashed text-muted-foreground transition-all hover:bg-muted/50 hover:text-primary">
							<Plus size={18} className="md:size-5" />
							<span className="truncate px-2 font-bold text-[8px] uppercase italic leading-none tracking-widest md:text-[9px]">
								Append
							</span>
						</button>
					</div>

					<div className="hidden h-16 w-px bg-border opacity-50 sm:block" />

					<div className="flex shrink-0 items-center gap-4 md:gap-10">
						<div className="hidden flex-col items-end gap-1 text-right sm:flex">
							<span className="flex items-center gap-2 font-bold text-[8px] text-muted-foreground/40 uppercase tracking-[0.2em] md:text-[9px] md:tracking-[0.3em]">
								<Play size={10} className="fill-muted-foreground" />
								Runtime
							</span>
							<span className="font-bold font-serif text-foreground text-xl italic leading-none md:text-2xl">
								00:12:<span className="text-accent">04</span>
							</span>
						</div>

						<div className="flex items-center gap-2 md:gap-3">
							<Button className="h-12 rounded-none bg-primary px-6 font-bold text-[9px] text-primary-foreground uppercase tracking-[0.2em] shadow-2xl transition-all hover:bg-accent md:h-14 md:px-12 md:text-[10px] md:tracking-[0.3em]">
								Compile
							</Button>
							{!rightPanelOpen && (
								<Tooltip>
									<TooltipTrigger asChild>
										<button
											className="hidden h-14 w-14 items-center justify-center border border-border bg-card text-muted-foreground transition-colors hover:text-primary lg:flex"
											onClick={() => setRightPanelOpen(true)}
										>
											<PanelRightOpen size={20} strokeWidth={1.5} />
										</button>
									</TooltipTrigger>
									<TooltipContent side="left">Synthesizer Props</TooltipContent>
								</Tooltip>
							)}
						</div>
					</div>
				</footer>
			</div>
		</TooltipProvider>
	);
}

function Badge({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<span
			className={`inline-flex items-center border px-2.5 py-0.5 font-bold text-[8px] uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
		>
			{children}
		</span>
	);
}
