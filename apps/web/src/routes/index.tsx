import { convexQuery } from "@convex-dev/react-query";
import { api } from "@storygraph/backend/convex/_generated/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	const hello = useQuery(convexQuery(api.hello.sayHi, {}));

	return (
		<div className="flex min-h-[50vh] items-center justify-center">
			<div className="text-center">
				<h1 className="mb-4 font-bold text-4xl">Storygraph</h1>
				<p className="text-muted-foreground text-xl">
					Backend says:{" "}
					<span className="font-mono text-primary">
						{hello.isLoading ? "..." : hello.data}
					</span>
				</p>
			</div>
		</div>
	);
}
