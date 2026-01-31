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
			// Security headers as meta tags
			{
				"http-equiv": "X-Content-Type-Options",
				content: "nosniff",
			},
			{
				"http-equiv": "X-Frame-Options",
				content: "DENY",
			},
			{
				"http-equiv": "Content-Security-Policy",
				content: [
					"default-src 'self'",
					"script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Required for Vite HMR in dev
					"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
					"font-src 'self' https://fonts.gstatic.com",
					"img-src 'self' data: blob: https:",
					"connect-src 'self' https://*.convex.cloud wss://*.convex.cloud https://api.resend.com",
					"frame-ancestors 'none'",
				].join("; "),
			},
			{
				name: "referrer",
				content: "strict-origin-when-cross-origin",
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

	// Check if we're on an editor route - editor has its own minimal floating UI
	const isEditorRoute = matches.some((match) =>
		match.pathname.includes("/editor/"),
	);

	// Full-screen layout (no header) for auth and editor routes
	const isFullScreen = isAuthRoute || isEditorRoute;

	return (
		<ConvexAuthProvider client={convexQueryClient.convexClient}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<html lang="en">
					<head>
						<HeadContent />
					</head>
					<body>
						{isFullScreen ? (
							// Full-screen layout without header
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
