import { useState } from "react";

const emailNotifications = [
	{
		title: "Project Updates",
		desc: "Receive updates when project status changes",
		on: true,
	},
	{
		title: "Team Activity",
		desc: "Get notified when team members comment",
		on: true,
	},
	{
		title: "Rendering Complete",
		desc: "Notification when AI generation completes",
		on: false,
	},
	{
		title: "Weekly Digest",
		desc: "Summary of studio activity every Monday",
		on: false,
	},
];

const pushNotifications = [
	{
		title: "Desktop Notifications",
		desc: "Show notifications in your browser",
		on: true,
	},
	{
		title: "Mobile Push",
		desc: "Send push notifications to mobile app",
		on: false,
	},
];

export default function NotificationSettings() {
	return (
		<div className="fade-in slide-in-from-bottom-4 animate-in duration-500">
			<header className="mb-6 md:mb-10">
				<h1 className="mb-2 font-serif text-3xl italic md:text-4xl">
					Notification Preferences
				</h1>
				<p className="text-muted-foreground text-sm tracking-wide">
					Control how and when you receive updates from the studio.
				</p>
			</header>

			<div className="space-y-12">
				<section className="space-y-6">
					<h3 className="border-border border-b pb-4 font-bold text-[11px] text-accent uppercase tracking-[0.3em]">
						Email Notifications
					</h3>
					{emailNotifications.map((item, i) => (
						<NotificationRow key={i} {...item} />
					))}
				</section>

				<section className="space-y-6">
					<h3 className="border-border border-b pb-4 font-bold text-[11px] text-accent uppercase tracking-[0.3em]">
						Push Notifications
					</h3>
					{pushNotifications.map((item, i) => (
						<NotificationRow key={i} {...item} />
					))}
				</section>

				{/* Actions */}
				<div className="flex justify-end border-border border-t pt-6">
					<button className="bg-primary px-8 py-3 font-bold text-[11px] text-primary-foreground uppercase tracking-[0.2em] shadow-lg transition-all hover:shadow-xl">
						Save Preferences
					</button>
				</div>
			</div>
		</div>
	);
}

function NotificationRow({
	title,
	desc,
	on,
}: {
	title: string;
	desc: string;
	on: boolean;
}) {
	const [checked, setChecked] = useState(on);
	return (
		<div className="flex items-center justify-between border-border/10 border-b px-2 py-4 transition-colors hover:bg-muted/10">
			<div>
				<p className="font-medium text-foreground text-sm">{title}</p>
				<p className="text-muted-foreground text-xs">{desc}</p>
			</div>
			<ToggleSwitch checked={checked} onChange={setChecked} />
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
		>
			<span
				className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
			/>
		</button>
	);
}
