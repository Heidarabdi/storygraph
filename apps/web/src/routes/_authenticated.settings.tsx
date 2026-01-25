import { createFileRoute } from "@tanstack/react-router";
import { Bell, Briefcase, CreditCard, Shield, User, Users } from "lucide-react";
import { useState } from "react";

import {
	BillingSettings,
	NotificationSettings,
	ProfileSettings,
	SecuritySettings,
	TeamSettings,
	WorkspaceSettings,
} from "@/components/settings";

export const Route = createFileRoute("/_authenticated/settings")({
	component: SettingsPage,
});

type Section =
	| "profile"
	| "workspace"
	| "billing"
	| "team"
	| "notifications"
	| "security";

function SettingsPage() {
	const [activeSection, setActiveSection] = useState<Section>("profile");

	const navItems: {
		id: Section;
		label: string;
		icon: React.ComponentType<{ size?: number; className?: string }>;
	}[] = [
		{ id: "profile", label: "Profile", icon: User },
		{ id: "workspace", label: "Workspace", icon: Briefcase },
		{ id: "billing", label: "Billing", icon: CreditCard },
		{ id: "team", label: "Team", icon: Users },
		{ id: "notifications", label: "Notifications", icon: Bell },
		{ id: "security", label: "Security", icon: Shield },
	];

	return (
		<main className="w-full">
			<div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
				{/* Fixed the lg:flex-row and gap */}
				<aside className="w-full shrink-0 border-border border-b bg-card lg:w-72 lg:border-r lg:border-b-0 lg:bg-transparent">
					<nav className="grid grid-cols-2 lg:flex lg:flex-col lg:pt-12 lg:pb-12 min-[450px]:grid-cols-3">
						{navItems.map((item) => {
							const Icon = item.icon;
							const isActive = activeSection === item.id;
							return (
								<button
									key={item.id}
									onClick={() => setActiveSection(item.id)}
									className={`-mr-px -mb-px flex items-center justify-center gap-2 border-r border-b px-4 py-4 text-[9px] uppercase tracking-widest outline-none transition-all lg:mr-0 lg:justify-start lg:gap-4 lg:border-r-2 lg:border-b-0 lg:text-xs min-[380px]:text-[10px] ${
										isActive
											? "z-10 border-primary bg-card font-bold text-primary dark:bg-neutral-800"
											: "border-border/50 text-muted-foreground hover:bg-muted hover:text-primary lg:border-transparent dark:hover:bg-neutral-800/50"
									}`}
								>
									<Icon
										size={14}
										className={
											isActive ? "text-primary" : "text-muted-foreground"
										}
									/>
									<span className="truncate">{item.label}</span>
								</button>
							);
						})}
					</nav>
				</aside>

				{/* Main Content - No max-width constraint to match reference "full" look */}
				<div className="flex-1 px-4 py-10 pb-32 sm:px-12 md:py-12">
					<div className="mx-auto max-w-4xl lg:mx-0">
						{activeSection === "profile" && <ProfileSettings />}
						{activeSection === "workspace" && <WorkspaceSettings />}
						{activeSection === "billing" && <BillingSettings />}
						{activeSection === "team" && <TeamSettings />}
						{activeSection === "notifications" && <NotificationSettings />}
						{activeSection === "security" && <SecuritySettings />}
					</div>
				</div>
			</div>
		</main>
	);
}
