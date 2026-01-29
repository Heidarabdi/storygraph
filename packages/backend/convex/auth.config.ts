// Validate required environment variable
const convexSiteUrl = process.env.CONVEX_SITE_URL;

if (!convexSiteUrl) {
	console.warn(
		"⚠️  WARNING: CONVEX_SITE_URL environment variable is not set. " +
			"This may cause issues with JWT authentication.",
	);
}

export default {
	providers: [
		{
			domain: convexSiteUrl || "http://localhost:3001",
			applicationID: "convex",
		},
	],
};
