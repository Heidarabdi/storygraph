import { ConvexError, v } from "convex/values";
import { action } from "./_generated/server";
import {
	emailVerificationTemplate,
	passwordResetTemplate,
} from "./emailTemplates";

// Helper to send email via Resend API using fetch (no Node dependency)
const sendResendEmail = async (payload: {
	to: string;
	subject: string;
	html: string;
}) => {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		throw new ConvexError({
			code: "CONFIG_ERROR",
			message: "RESEND_API_KEY environment variable is not set",
		});
	}

	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			from: "Storygraph <noreply@storygraph.studio>",
			...payload,
		}),
	});

	if (!res.ok) {
		const error = await res.text();
		console.error("Resend API error:", error);
		throw new ConvexError({
			code: "SEND_EMAIL_ERROR",
			message: "Failed to send email via Resend",
		});
	}

	return { success: true };
};

// Send password reset email
export const sendPasswordResetEmail = action({
	args: {
		email: v.string(),
		resetToken: v.string(),
		resetUrl: v.string(),
	},
	handler: async (ctx, args) => {
		return await sendResendEmail({
			to: args.email,
			subject: "Reset your Storygraph password",
			html: passwordResetTemplate(args.resetToken),
		});
	},
});

// Send verification email (for email verification flow)
export const sendVerificationEmail = action({
	args: {
		email: v.string(),
		code: v.string(),
	},
	handler: async (ctx, args) => {
		return await sendResendEmail({
			to: args.email,
			subject: "Verify your Storygraph email",
			html: emailVerificationTemplate(args.code),
		});
	},
});
