import { MessageSquare, Sparkles, UserPlus, X } from "lucide-react";
import { useState } from "react";

interface Notification {
	id: string;
	type: "comment" | "system" | "invite";
	title: string;
	message: string;
	time: string;
	read: boolean;
	avatar?: string;
}

const mockNotifications: Notification[] = [
	{
		id: "1",
		type: "comment",
		title: "Elena Voss",
		message: "commented on Frame 12 of The Last Descent.",
		time: "12 minutes ago",
		read: false,
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
	},
	{
		id: "2",
		type: "system",
		title: "System",
		message: "Gemini 1.5 Pro rendering complete for the cinematic sequence.",
		time: "1 hour ago",
		read: false,
	},
	{
		id: "3",
		type: "invite",
		title: "Studio X",
		message: "New team invitation to collaborate on Noir Nights.",
		time: "3 hours ago",
		read: false,
	},
	{
		id: "4",
		type: "comment",
		title: "Marcus Chen",
		message: "shared 4 new moodboard references.",
		time: "Yesterday",
		read: true,
		avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
	},
];

interface NotificationPanelProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function NotificationPanel({
	isOpen,
	onClose,
}: NotificationPanelProps) {
	const [notifications] = useState<Notification[]>(mockNotifications);

	const getIcon = (type: Notification["type"]) => {
		switch (type) {
			case "comment":
				return <MessageSquare size={10} />;
			case "system":
				return <Sparkles size={14} className="text-accent" />;
			case "invite":
				return <UserPlus size={14} className="text-accent" />;
		}
	};

	return (
		<>
			{/* Backdrop */}
			{isOpen && (
				<div
					className="fixed inset-0 z-55 bg-background/40 backdrop-blur-sm"
					onClick={onClose}
				/>
			)}

			{/* Panel */}
			<div
				className={`fixed top-0 right-0 z-60 flex h-full w-full max-w-sm flex-col border-border border-l bg-background shadow-2xl transition-transform duration-300 ease-out ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				{/* Header */}
				<div className="flex items-center justify-between border-border border-b bg-card/30 p-6">
					<div>
						<h3 className="font-serif text-2xl text-foreground italic">
							Notifications
						</h3>
						<p className="mt-1 text-[9px] text-muted-foreground uppercase tracking-[0.2em]">
							Recent Activity
						</p>
					</div>
					<button
						onClick={onClose}
						className="rounded-none p-2 transition-colors hover:bg-muted"
					>
						<X size={18} />
					</button>
				</div>

				{/* Notification List */}
				<div className="flex-1 overflow-y-auto py-2">
					{notifications.map((notification) => (
						<div
							key={notification.id}
							className={`group cursor-pointer border-border/10 border-b p-6 transition-colors hover:bg-muted/50 ${
								notification.read ? "opacity-60" : ""
							}`}
						>
							<div className="flex gap-4">
								{/* Avatar / Icon */}
								<div className="relative shrink-0">
									{notification.avatar ? (
										<img
											src={notification.avatar}
											alt={notification.title}
											className="h-10 w-10 border border-border object-cover"
										/>
									) : (
										<div className="flex h-10 w-10 items-center justify-center border border-border bg-muted">
											{getIcon(notification.type)}
										</div>
									)}
									{notification.type === "comment" && notification.avatar && (
										<div className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center border border-border bg-card">
											{getIcon(notification.type)}
										</div>
									)}
								</div>

								{/* Content */}
								<div className="min-w-0 flex-1 text-foreground">
									<p className="text-[13px] leading-relaxed">
										<span className="font-bold text-primary">
											{notification.title}
										</span>{" "}
										{notification.message}
									</p>
									<p className="mt-2 text-[10px] text-muted-foreground uppercase tracking-widest">
										{notification.time}
									</p>
								</div>

								{/* Unread indicator */}
								{!notification.read && (
									<div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
								)}
							</div>
						</div>
					))}
				</div>

				{/* Footer */}
				<div className="border-border border-t bg-card/30 p-6">
					<button className="w-full border border-primary bg-transparent py-3 font-bold text-[10px] text-primary uppercase tracking-[0.2em] transition-all hover:bg-primary hover:text-primary-foreground">
						Mark all as read
					</button>
				</div>
			</div>
		</>
	);
}
