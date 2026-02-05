import { HOUR, MINUTE, RateLimiter } from "@convex-dev/rate-limiter";
import { components } from "./_generated/api";

export const rateLimiter = new RateLimiter(components.rateLimiter, {
	sendMessage: { kind: "token bucket", rate: 10, period: MINUTE, capacity: 3 },
	createProject: { kind: "fixed window", rate: 100, period: HOUR * 24 },
	uploadFile: { kind: "token bucket", rate: 20, period: HOUR, capacity: 5 },
});
