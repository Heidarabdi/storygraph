import { createFileRoute, Link } from "@tanstack/react-router";
import { KeyRound, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/reset-password")({
    component: ResetPasswordPage,
});

function ResetPasswordPage() {
    const [status, setStatus] = useState<"idle" | "success">("idle");

    if (status === "success") {
        return (
            <div className="flex flex-col items-center text-center space-y-6">
                <div className="flex h-16 w-16 items-center justify-center bg-green-50 text-green-600 mb-2">
                    <CheckCircle2 size={32} strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                    <h2 className="font-serif text-2xl">Password Reset Complete</h2>
                    <p className="font-serif text-[11px] italic text-muted-foreground leading-relaxed px-8">
                        Your secure access has been restored. You may now proceed to the studio with your new credentials.
                    </p>
                </div>
                <Link to="/auth/login" className="w-full">
                    <Button className="w-full h-12 rounded-none px-8 text-[11px] font-bold uppercase tracking-widest shadow-none">
                        Return to Login
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h2 className="font-serif text-2xl">New Credentials</h2>
                <p className="font-serif text-[11px] italic text-muted-foreground leading-relaxed">
                    Ensure your new password is secure and unique. We recommend a combination of characters that reflects the complexity of your work.
                </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStatus("success"); }}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest opacity-50">New Password</Label>
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="password"
                                placeholder="••••••••"
                                className="h-12 border-border rounded-none pl-10 focus-visible:ring-0 focus-visible:border-primary transition-colors bg-white/50"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Confirm Password</Label>
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="password"
                                placeholder="••••••••"
                                className="h-12 border-border rounded-none pl-10 focus-visible:ring-0 focus-visible:border-primary transition-colors bg-white/50"
                                required
                            />
                        </div>
                    </div>
                </div>

                <Button type="submit" className="w-full h-12 rounded-none px-8 text-[11px] font-bold uppercase tracking-widest shadow-none">
                    Update Password
                </Button>
            </form>

            <div className="text-center">
                <Link to="/auth/login" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft size={14} />
                    Back to Login
                </Link>
            </div>
        </div>
    );
}
