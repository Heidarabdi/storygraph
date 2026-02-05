import { api } from "@storygraph/backend/convex/_generated/api";
import type { Id } from "@storygraph/backend/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useCallback, useState } from "react";

interface UploadResult {
	storageId: Id<"_storage">;
	url: string;
}

interface UseFileUploadReturn {
	upload: (file: File) => Promise<UploadResult>;
	isUploading: boolean;
	error: string | null;
}

/**
 * Hook for uploading files to Convex storage.
 * Uses the 3-step upload flow: generateUploadUrl -> POST file -> get public URL
 */
export function useFileUpload(): UseFileUploadReturn {
	const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
	const getUrlMutation = useMutation(api.storage.getUrlMutation);
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const upload = useCallback(
		async (file: File): Promise<UploadResult> => {
			setIsUploading(true);
			setError(null);

			try {
				// Step 1: Get a short-lived upload URL
				const uploadUrl = await generateUploadUrl();

				// Step 2: POST the file to the URL
				const response = await fetch(uploadUrl, {
					method: "POST",
					headers: { "Content-Type": file.type },
					body: file,
				});

				if (!response.ok) {
					throw new Error(`Upload failed: ${response.statusText}`);
				}

				const { storageId } = await response.json();

				// Step 3: Get the public URL for this storage ID
				const url = await getUrlMutation({
					storageId: storageId as Id<"_storage">,
				});

				if (!url) {
					throw new Error("Failed to get URL for uploaded file");
				}

				return {
					storageId: storageId as Id<"_storage">,
					url,
				};
			} catch (err) {
				const message = err instanceof Error ? err.message : "Upload failed";
				setError(message);
				throw err;
			} finally {
				setIsUploading(false);
			}
		},
		[generateUploadUrl, getUrlMutation],
	);

	return { upload, isUploading, error };
}
