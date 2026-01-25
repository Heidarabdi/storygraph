import { ConvexAuthProvider } from "@convex-dev/auth/react";
import type { ConvexQueryClient } from "@convex-dev/react-query";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
	useMatches,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";

import Header from "../components/header";
import appCss from "../index.css?url";

export interface RouterAppContext {
	queryClient: QueryClient;
	convexQueryClient: ConvexQueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Storygraph",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	component: RootDocument,
});

function RootDocument() {
	const { convexQueryClient } = Route.useRouteContext();
	const matches = useMatches();

	// Check if we're on an auth route - auth routes have their own full-screen layout
	const isAuthRoute = matches.some((match) =>
		match.pathname.startsWith("/auth"),
	);

	return (
		<ConvexAuthProvider client={convexQueryClient.convexClient}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<html lang="en">
					<head>
						<HeadContent />
					</head>
					<body>
						{isAuthRoute ? (
							// Auth routes: full-screen layout without header
							<div className="flex h-svh flex-col overflow-x-hidden">
								<Outlet />
							</div>
						) : (
							// App routes: header + content
							<div className="flex h-svh flex-col overflow-x-hidden">
								<Header />
								<main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
									<Outlet />
								</main>
							</div>
						)}
						<Toaster richColors />
						<TanStackRouterDevtools position="bottom-left" />
						<Scripts />
					</body>
				</html>
			</ThemeProvider>
		</ConvexAuthProvider>
	);
}
