import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

export function SceneSettingsSheet() {
	return (
		<SheetContent side="left" className="w-80 border-border p-0">
			<SheetHeader className="border-border border-b p-4 text-left">
				<SheetTitle className="text-sm">Scene Properties</SheetTitle>
			</SheetHeader>
			<div className="space-y-6 p-6">
				<div className="space-y-3">
					<Label className="font-semibold text-muted-foreground/80 text-xs tracking-tight">
						Model
					</Label>
					<Select defaultValue="flux">
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select model" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="flux">Flux.1 Ultra</SelectItem>
							<SelectItem value="sdxl">SDXL Cinematic</SelectItem>
							<SelectItem value="sd3">Stable Diffusion 3</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-3">
					<Label className="font-semibold text-muted-foreground/80 text-xs tracking-tight">
						Style
					</Label>
					<Select defaultValue="cinematic">
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select style" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="cinematic">Cinematic</SelectItem>
							<SelectItem value="noir">Noir</SelectItem>
							<SelectItem value="anime">Anime</SelectItem>
							<SelectItem value="sketch">Hand-drawn Sketch</SelectItem>
							<SelectItem value="3d">3D Render</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-3">
					<div className="flex justify-between font-semibold text-muted-foreground/80 text-xs tracking-tight">
						<span>Consistency</span>
						<span className="text-accent">92%</span>
					</div>
					<Slider defaultValue={[92]} max={100} step={1} />
				</div>

				<div className="space-y-3">
					<div className="flex justify-between font-semibold text-muted-foreground/80 text-xs tracking-tight">
						<span>Creativity</span>
						<span className="text-accent">0.45</span>
					</div>
					<Slider defaultValue={[45]} max={100} step={1} />
				</div>
			</div>
		</SheetContent>
	);
}
