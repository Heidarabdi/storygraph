import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { useConvexAuth } from "convex/react";
import Loader from "../components/loader";

export const Route = createFileRoute("/_authenticated")({
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	const { isAuthenticated, isLoading } = useConvexAuth();

	if (isLoading) {
		return (
			<div className="flex h-svh w-full flex-col items-center justify-center bg-background">
				<div className="flex flex-col items-center gap-4">
					<Loader />
					<p className="animate-pulse font-bold text-[10px] text-muted-foreground uppercase tracking-[0.3em]">
						Establishing Secure Connection
					</p>
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/auth/login" />;
	}

	return <Outlet />;
}
