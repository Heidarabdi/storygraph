import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { passwordResetTemplate } from "./emailTemplates";

export const { auth, signIn, signOut, store } = convexAuth({
	providers: [
		Google,
		Password({
			reset: {
				id: "resend",
				name: "Resend",
				type: "email",
				sendVerificationRequest: async ({ identifier: email, token }) => {
					const res = await fetch("https://api.resend.com/emails", {
						method: "POST",
						headers: {
							Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							from: "Storygraph <noreply@storygraph.studio>",
							to: email,
							subject: "Reset your Storygraph password",
							html: passwordResetTemplate(token),
						}),
					});

					if (!res.ok) {
						const error = await res.text();
						console.error("Resend API error:", error);
						throw new Error("Failed to send password reset email");
					}
				},
			},
		}),
	],
	callbacks: {
		async createOrUpdateUser(ctx, args) {
			if (args.existingUserId) {
				return args.existingUserId;
			}
			const userId = await ctx.db.insert("users", {
				name: args.profile.name,
				email: args.profile.email,
				image: args.profile.image,
			});

			// Create a default "Personal" organization for the new user
			// We use a simple slug strategy for now: email-prefix + random suffix to ensure uniqueness
			const slugBase = args.profile.email?.split("@")[0] || "user";
			const slug = `${slugBase}-${crypto.randomUUID().slice(0, 8)}`;

			const orgId = await ctx.db.insert("organizations", {
				name: "Personal",
				slug: slug,
				ownerId: userId,
				plan: "prototyping",
			});

			await ctx.db.insert("organizationMembers", {
				orgId,
				userId,
				role: "admin",
			});

			return userId;
		},
	},
});
