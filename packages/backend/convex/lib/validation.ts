import { ConvexError } from "convex/values";

// Validation constants
export const VALIDATION = {
	NAME: {
		MIN_LENGTH: 1,
		MAX_LENGTH: 100,
	},
	DESCRIPTION: {
		MAX_LENGTH: 500,
	},
	SLUG: {
		MIN_LENGTH: 3,
		MAX_LENGTH: 50,
		PATTERN: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, // lowercase alphanumeric with hyphens
	},
} as const;

/**
 * Validates a name field (project, scene, frame, asset, org names)
 * @throws ConvexError if validation fails
 */
export function validateName(name: string, fieldName = "Name"): string {
	const trimmed = name.trim();

	if (!trimmed || trimmed.length < VALIDATION.NAME.MIN_LENGTH) {
		throw new ConvexError({
			code: "VALIDATION_ERROR",
			message: `${fieldName} is required`,
		});
	}

	if (trimmed.length > VALIDATION.NAME.MAX_LENGTH) {
		throw new ConvexError({
			code: "VALIDATION_ERROR",
			message: `${fieldName} must be less than ${VALIDATION.NAME.MAX_LENGTH} characters`,
		});
	}

	return trimmed;
}

/**
 * Validates an optional description field
 * @throws ConvexError if validation fails
 */
export function validateDescription(
	description: string | undefined,
): string | undefined {
	if (!description) return undefined;

	const trimmed = description.trim();

	if (trimmed.length > VALIDATION.DESCRIPTION.MAX_LENGTH) {
		throw new ConvexError({
			code: "VALIDATION_ERROR",
			message: `Description must be less than ${VALIDATION.DESCRIPTION.MAX_LENGTH} characters`,
		});
	}

	return trimmed;
}

/**
 * Validates a slug field (organization slugs)
 * @throws ConvexError if validation fails
 */
export function validateSlug(slug: string): string {
	const trimmed = slug.trim().toLowerCase();

	if (trimmed.length < VALIDATION.SLUG.MIN_LENGTH) {
		throw new ConvexError({
			code: "VALIDATION_ERROR",
			message: `Slug must be at least ${VALIDATION.SLUG.MIN_LENGTH} characters`,
		});
	}

	if (trimmed.length > VALIDATION.SLUG.MAX_LENGTH) {
		throw new ConvexError({
			code: "VALIDATION_ERROR",
			message: `Slug must be less than ${VALIDATION.SLUG.MAX_LENGTH} characters`,
		});
	}

	if (!VALIDATION.SLUG.PATTERN.test(trimmed)) {
		throw new ConvexError({
			code: "VALIDATION_ERROR",
			message: "Slug must contain only lowercase letters, numbers, and hyphens",
		});
	}

	return trimmed;
}

/**
 * Sanitizes a string to prevent XSS (basic HTML escape)
 * For use when rendering user content
 */
export function sanitizeHtml(input: string): string {
	return input
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}
