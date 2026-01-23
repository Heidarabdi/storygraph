import { Download } from "lucide-react";

const billingHistory = [
	{
		date: "Oct 14, 2023",
		description: "Studio Tier - Monthly Subscription",
		amount: "$299.00",
	},
	{
		date: "Sep 14, 2023",
		description: "Studio Tier - Monthly Subscription",
		amount: "$299.00",
	},
	{
		date: "Aug 28, 2023",
		description: "Extra Credits Bundle (500)",
		amount: "$45.00",
	},
	{
		date: "Aug 14, 2023",
		description: "Studio Tier - Monthly Subscription",
		amount: "$299.00",
	},
];

export default function BillingSettings() {
	return (
		<div className="fade-in slide-in-from-bottom-4 animate-in duration-500">
			<header className="mb-6 md:mb-10">
				<h3 className="mb-1 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.3em] md:text-[10px]">
					Subscription
				</h3>
				<h1 className="font-serif text-2xl italic md:text-4xl">Current Plan</h1>
			</header>

			<div className="space-y-12">
				{/* Current Plan Card */}
				<div className="border border-border bg-card p-6 shadow-sm md:p-8">
					<div className="mb-6 flex flex-col items-start justify-between border-border border-b pb-6 md:mb-10 md:flex-row md:items-center md:pb-10">
						<div>
							<div className="mb-3 inline-block border border-accent/20 bg-accent/10 px-3 py-1 font-bold text-[9px] text-accent uppercase tracking-widest">
								Active Plan
							</div>
							<h4 className="mb-1 font-serif text-2xl text-foreground">
								Studio Tier
							</h4>
							<p className="text-muted-foreground text-sm italic">
								Professional grade production workspace
							</p>
						</div>
						<div className="mt-6 w-full md:mt-0 md:w-auto md:text-right">
							<div className="font-serif text-2xl text-foreground md:text-3xl">
								$299
								<span className="text-muted-foreground text-sm italic">
									/mo
								</span>
							</div>
							<p className="mt-1 font-bold text-[9px] text-muted-foreground uppercase tracking-widest">
								Renewal: Nov 14, 2023
							</p>
						</div>
					</div>
					<div className="space-y-6">
						<div className="flex items-end justify-between">
							<div className="space-y-1">
								<h5 className="font-bold text-[11px] text-foreground uppercase tracking-widest">
									Credit Usage
								</h5>
								<p className="font-serif text-muted-foreground text-xs italic">
									Monthly allocation of AI generation credits
								</p>
							</div>
							<div className="text-right">
								<span className="font-medium text-foreground text-lg">450</span>
								<span className="mx-1 text-muted-foreground text-sm italic">
									/
								</span>
								<span className="text-muted-foreground text-sm">1,000</span>
							</div>
						</div>
						<div className="h-1.5 w-full overflow-hidden bg-muted">
							<div className="h-full bg-primary" style={{ width: "45%" }} />
						</div>
						<div className="flex flex-col gap-3 pt-4 sm:flex-row md:gap-4">
							<button className="w-full bg-primary px-6 py-2.5 font-bold text-[10px] text-primary-foreground uppercase tracking-widest transition-all hover:bg-neutral-800 sm:w-auto">
								Add Credits
							</button>
							<button className="w-full border border-border px-6 py-2.5 font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-all hover:bg-muted hover:text-foreground sm:w-auto">
								Change Plan
							</button>
						</div>
					</div>
				</div>

				{/* Billing History */}
				<section>
					<div className="mb-6 flex items-end justify-between">
						<div>
							<h3 className="mb-1 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.3em] md:text-[10px]">
								Archive
							</h3>
							<h2 className="font-serif text-xl italic md:text-3xl">
								Billing History
							</h2>
						</div>
						<button className="flex items-center gap-2 font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors hover:text-primary">
							<span className="hidden sm:inline">Export All</span>
							<Download size={14} />
						</button>
					</div>
					<div className="no-scrollbar overflow-hidden overflow-x-auto border border-border bg-card shadow-sm">
						<table className="w-full min-w-[700px] text-left md:min-w-0">
							<thead>
								<tr className="border-border border-b bg-muted/50">
									<th className="px-4 py-4 font-bold text-[10px] text-muted-foreground uppercase tracking-widest md:px-8">
										Date
									</th>
									<th className="px-4 py-4 font-bold text-[10px] text-muted-foreground uppercase tracking-widest md:px-8">
										Description
									</th>
									<th className="px-4 py-4 font-bold text-[10px] text-muted-foreground uppercase tracking-widest md:px-8">
										Amount
									</th>
									<th className="px-4 py-4 text-right font-bold text-[10px] text-muted-foreground uppercase tracking-widest md:px-8">
										Invoice
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border">
								{billingHistory.map((item, i) => (
									<tr key={i} className="transition-colors hover:bg-muted/30">
										<td className="whitespace-nowrap px-4 py-5 font-medium text-foreground text-xs md:px-8">
											{item.date}
										</td>
										<td className="px-4 py-5 text-muted-foreground text-xs md:px-8">
											{item.description}
										</td>
										<td className="px-4 py-5 font-medium text-foreground text-xs md:px-8">
											{item.amount}
										</td>
										<td className="px-4 py-5 text-right md:px-8">
											<button className="rounded p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary">
												<Download size={16} />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</section>
			</div>
		</div>
	);
}
