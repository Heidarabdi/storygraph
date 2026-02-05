import { api } from "@storygraph/backend/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotificationSettings() {
	const user = useQuery(api.users.viewer);
	const updatePreferences = useMutation(api.users.updatePreferences);

	// Local preference state
	const [projectUpdates, setProjectUpdates] = useState(true);
	const [teamMentions, setTeamMentions] = useState(true);
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [weeklyDigest, setWeeklyDigest] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [hasChanges, setHasChanges] = useState(false);

	// Sync with user data
	useEffect(() => {
		if (user) {
			const prefs = user;
			setProjectUpdates(prefs.projectUpdates ?? true);
			setTeamMentions(prefs.teamMentions ?? true);
			setEmailNotifications(prefs.emailNotifications ?? true);
			setWeeklyDigest(prefs.weeklyDigest ?? false);
		}
	}, [user]);

	// Track changes
	useEffect(() => {
		if (!user) return;
		const prefs = user;
		const changed =
			projectUpdates !== (prefs.projectUpdates ?? true) ||
			teamMentions !== (prefs.teamMentions ?? true) ||
			emailNotifications !== (prefs.emailNotifications ?? true) ||
			weeklyDigest !== (prefs.weeklyDigest ?? false);
		setHasChanges(changed);
	}, [projectUpdates, teamMentions, emailNotifications, weeklyDigest, user]);

	const handleSave = async () => {
		setIsSaving(true);
		try {
			await updatePreferences({
				projectUpdates,
				teamMentions,
				emailNotifications,
				weeklyDigest,
			});
			setHasChanges(false);
		} catch (error) {
			console.error("Failed to save preferences:", error);
		} finally {
			setIsSaving(false);
		}
	};

	if (!user) {
		return (
			<div className="flex h-64 items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

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
					<NotificationRow
						title="Project Updates"
						desc="Receive updates when project status changes"
						checked={projectUpdates}
						onChange={setProjectUpdates}
					/>
					<NotificationRow
						title="Team Activity"
						desc="Get notified when team members comment"
						checked={teamMentions}
						onChange={setTeamMentions}
					/>
					<NotificationRow
						title="Email Notifications"
						desc="Receive all notifications via email"
						checked={emailNotifications}
						onChange={setEmailNotifications}
					/>
					<NotificationRow
						title="Weekly Digest"
						desc="Summary of studio activity every Monday"
						checked={weeklyDigest}
						onChange={setWeeklyDigest}
					/>
				</section>

				{/* Actions */}
				<div className="flex justify-end border-border border-t pt-6">
					<button
						className="bg-primary px-8 py-3 font-bold text-[11px] text-primary-foreground uppercase tracking-[0.2em] shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
						type="button"
						onClick={handleSave}
						disabled={!hasChanges || isSaving}
					>
						{isSaving ? (
							<span className="flex items-center gap-2">
								<Loader2 className="h-3 w-3 animate-spin" />
								Saving...
							</span>
						) : (
							"Save Preferences"
						)}
					</button>
				</div>
			</div>
		</div>
	);
}

function NotificationRow({
	title,
	desc,
	checked,
	onChange,
}: {
	title: string;
	desc: string;
	checked: boolean;
	onChange: (val: boolean) => void;
}) {
	return (
		<div className="flex items-center justify-between border-border/10 border-b px-2 py-4 transition-colors hover:bg-muted/10">
			<div>
				<p className="font-medium text-foreground text-sm">{title}</p>
				<p className="text-muted-foreground text-xs">{desc}</p>
			</div>
			<button
				onClick={() => onChange(!checked)}
				className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted"}`}
				type="button"
			>
				<span
					className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
				/>
			</button>
		</div>
	);
}
