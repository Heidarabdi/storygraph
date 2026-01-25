import { PanelLeftClose, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Asset {
	_id: string;
	name: string;
	type: string;
	referenceImages?: string[];
}

interface AssetLibrarySidebarProps {
	assets: Asset[] | undefined;
	onClose: () => void;
}

export function AssetLibrarySidebar({
	assets,
	onClose,
}: AssetLibrarySidebarProps) {
	return (
		<div className="flex h-full flex-col overflow-hidden">
			<div className="flex h-14 shrink-0 items-center justify-between border-border border-b px-6">
				<h3 className="font-serif text-lg text-primary italic">
					Director's Library
				</h3>
				<Button
					variant="ghost"
					size="icon"
					className="hidden h-8 w-8 text-muted-foreground hover:text-primary lg:flex"
					onClick={onClose}
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
								className="relative flex-1 rounded-none border-transparent border-b-2 px-2 font-bold text-[10px] text-muted-foreground uppercase tracking-[0.2em] shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
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
								{assets?.map((char) => (
									<div
										key={char._id}
										className="group cursor-pointer space-y-3"
									>
										<div className="aspect-square overflow-hidden border border-border bg-card p-1 transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
											<div className="flex h-full w-full items-center justify-center overflow-hidden bg-muted/20">
												<img
													src={
														char.referenceImages?.[0] ||
														`https://api.dicebear.com/7.x/avataaars/svg?seed=${char.name}`
													}
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
												{char.type}
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
}
