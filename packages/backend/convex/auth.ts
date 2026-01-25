import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store } = convexAuth({
	providers: [Google, Password],
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
			const slug = `${slugBase}-${Math.random().toString(36).substring(2, 7)}`;

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
