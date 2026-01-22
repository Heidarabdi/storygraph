import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/verify-email")({
    component: VerifyEmailPage,
});

function VerifyEmailPage() {
    const [isVerified, setIsVerified] = useState(false);

    return (
        <div className="flex flex-col items-center text-center space-y-8">
            {isVerified ? (
                <>
                    <div className="flex h-16 w-16 items-center justify-center bg-green-50 text-green-600 mb-2 animate-in zoom-in duration-500">
                        <CheckCircle2 size={32} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="font-serif text-2xl">Identity Verified</h2>
                        <p className="font-serif text-[11px] italic text-muted-foreground leading-relaxed px-8">
                            Your digital signature has been confirmed. You are now a verified creator within the Storygraph collective.
                        </p>
                    </div>
                    <Link to="/dashboard" className="w-full">
                        <Button className="w-full h-12 rounded-none px-8 text-[11px] font-bold uppercase tracking-widest shadow-none group">
                            Enter Workspace
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </>
            ) : (
                <>
                    <div className="flex h-16 w-16 items-center justify-center bg-primary/5 text-primary mb-2">
                        <Mail size={32} strokeWidth={1.5} className="animate-pulse" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="font-serif text-2xl">Awaiting Confirmation</h2>
                        <p className="font-serif text-[11px] italic text-muted-foreground leading-relaxed px-8">
                            We have dispatched a verification link to your inbox. Please follow the instructions to formalize your studio invitation.
                        </p>
                    </div>

                    <div className="w-full space-y-4">
                        <Button
                            variant="outline"
                            className="w-full h-12 rounded-none px-8 text-[11px] font-bold uppercase tracking-widest border-border hover:bg-white transition-colors"
                            onClick={() => setIsVerified(true)}
                        >
                            Manually Verify (Mock)
                        </Button>

                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-50">
                            Didn't receive the email? <button className="text-primary hover:underline">Resend</button>
                        </p>
                    </div>

                    <Link to="/auth/login" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                        Cancel & Return
                    </Link>
                </>
            )}
        </div>
    );
}
