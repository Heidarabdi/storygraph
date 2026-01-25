import { CheckCircle2, Lock } from "lucide-react";

interface Trait {
	name: string;
	locked?: boolean;
}

interface Identity {
	_id: string;
	name: string;
	type: string;
	image?: string;
	traits: Trait[];
}

interface IdentityCardProps {
	identity: Identity;
}

export function IdentityCard({ identity }: IdentityCardProps) {
	return (
		<div className="group cursor-pointer border border-border bg-card transition-all duration-500 hover:shadow-xl">
			<div className="aspect-3/4 overflow-hidden bg-neutral-200">
				<img
					src={
						identity.image ||
						`https://api.dicebear.com/7.x/avataaars/svg?seed=${identity.name}`
					}
					alt={identity.name}
					className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
				/>
			</div>
			<div className="p-5">
				<div className="mb-4 flex items-start justify-between">
					<h3 className="font-serif text-xl">{identity.name}</h3>
					<Lock size={14} className="text-muted-foreground/40" />
				</div>
				<div className="flex flex-wrap gap-2">
					{identity.traits.map((trait) => (
						<span
							key={trait.name}
							className="inline-flex items-center gap-1.5 border border-border bg-background px-2 py-1 font-bold text-[9px] uppercase tracking-widest"
						>
							{trait.locked && (
								<CheckCircle2 size={10} className="text-accent" />
							)}
							{trait.name}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
