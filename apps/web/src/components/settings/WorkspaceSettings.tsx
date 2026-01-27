import { Briefcase } from "lucide-react";
import { useState } from "react";

export default function WorkspaceSettings() {
	const [sharedAssets, setSharedAssets] = useState(true);
	const [projectVisibility, setProjectVisibility] = useState(false);

	return (
		<div className="fade-in slide-in-from-bottom-4 animate-in duration-500">
			<header className="mb-8 md:mb-10">
				<h1 className="mb-2 font-serif text-3xl italic md:text-4xl">
					Workspace Preferences
				</h1>
				<p className="text-muted-foreground text-xs tracking-wide md:text-sm">
					Configure your studio environment and creative standards.
				</p>
			</header>

			<div className="space-y-12">
				{/* General Configuration */}
				<section className="space-y-6">
					<h3 className="border-border border-b pb-4 font-bold text-[11px] text-accent uppercase tracking-[0.3em]">
						General Configuration
					</h3>
					<div className="grid grid-cols-1 gap-6">
						<div>
							<label className="mb-2 block font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
								Workspace Name
							</label>
							<input
								className="w-full rounded-none border border-border bg-card px-4 py-3 text-foreground text-sm outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent"
								type="text"
								defaultValue="Ivory Atelier Paris"
							/>
						</div>
						<div>
							<label className="mb-4 block font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
								Workspace Logo
							</label>
							<div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
								<div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border border-border bg-muted md:h-24 md:w-24">
									<Briefcase size={24} className="text-foreground opacity-20" />
								</div>
								<div className="flex w-full flex-col items-center space-y-3 sm:items-start">
									<button
										className="w-full bg-primary px-6 py-2.5 font-bold text-[10px] text-primary-foreground uppercase tracking-widest shadow-md transition-all hover:bg-neutral-700 sm:w-auto"
										type="button"
									>
										Upload New Logo
									</button>
									<p className="text-center text-[9px] text-muted-foreground uppercase italic tracking-widest sm:text-left">
										Recommended: 400x400px .PNG or .SVG
									</p>
								</div>
							</div>
						</div>
						<div>
							<label className="mb-2 block font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
								Default Production Model
							</label>
							<div className="relative">
								<select className="w-full appearance-none rounded-none border border-border bg-card px-4 py-3 text-foreground text-sm outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent">
									<option className="bg-card">
										Cinematic Noir v4.2 (Standard)
									</option>
									<option className="bg-card">Anamorphic Dreamer v1.0</option>
									<option className="bg-card">Ethereal Landscapes Ultra</option>
									<option className="bg-card">
										High-Contrast Studio MK II
									</option>
								</select>
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
									<svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
										<title>Dropdown Arrow</title>
										<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
									</svg>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Collaboration & Privacy */}
				<section className="space-y-6">
					<h3 className="border-border border-b pb-4 font-bold text-[11px] text-accent uppercase tracking-[0.3em]">
						Collaboration & Privacy
					</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between py-2">
							<div>
								<p className="font-medium text-sm">Shared Asset Library</p>
								<p className="text-muted-foreground text-xs">
									Enable team-wide access to models, textures, and moodboards.
								</p>
							</div>
							<ToggleSwitch checked={sharedAssets} onChange={setSharedAssets} />
						</div>
						<div className="flex items-center justify-between py-2">
							<div>
								<p className="font-medium text-sm">Project Visibility</p>
								<p className="text-muted-foreground text-xs">
									New projects are visible to all workspace members by default.
								</p>
							</div>
							<ToggleSwitch
								checked={projectVisibility}
								onChange={setProjectVisibility}
							/>
						</div>
					</div>
				</section>

				{/* Actions */}
				<div className="flex justify-end border-border border-t pt-8">
					<button
						className="bg-primary px-8 py-3 font-bold text-[11px] text-primary-foreground uppercase tracking-[0.2em] shadow-xl transition-all hover:bg-neutral-800"
						type="button"
					>
						Save Workspace Changes
					</button>
				</div>
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
			type="button"
		>
			<span
				className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
			/>
		</button>
	);
}
