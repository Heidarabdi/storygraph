import { AlertTriangle, RefreshCw } from "lucide-react";
import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
	state: State = { hasError: false, error: null };

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		// Log to error tracking service (Sentry, etc.)
		console.error("ErrorBoundary caught error:", error, errorInfo);
	}

	handleRetry = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-6 p-8">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
							<AlertTriangle className="h-8 w-8 text-destructive" />
						</div>
						<div className="space-y-2 text-center">
							<h2 className="font-serif text-2xl text-foreground italic">
								Something went wrong
							</h2>
							<p className="max-w-md text-muted-foreground text-sm">
								{this.state.error?.message || "An unexpected error occurred"}
							</p>
						</div>
						<div className="flex gap-3">
							<Button
								onClick={this.handleRetry}
								className="gap-2 rounded-none"
								variant="outline"
							>
								<RefreshCw className="h-4 w-4" />
								Try Again
							</Button>
							<Button
								onClick={() => window.location.reload()}
								className="rounded-none"
							>
								Reload Page
							</Button>
						</div>
					</div>
				)
			);
		}

		return this.props.children;
	}
}
