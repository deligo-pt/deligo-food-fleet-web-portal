import UploadDocuments from "@/components/BecomeAgent/UploadDocuments";
import { serverRequest } from "@/lib/serverFetch";
import { DocKey, FilePreview } from "@/types/documents.type";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default async function UploadDocumentPage() {
  const accessToken = (await cookies()).get("accessToken")?.value || "";
  const decoded = jwtDecode(accessToken) as { id: string };

  const savedPreviews: Record<DocKey, FilePreview | null> = {} as Record<
    DocKey,
    FilePreview | null
  >;

  try {
    const result = await serverRequest.get(`/fleet-managers/${decoded.id}`);

    if (result?.success) {
      if (result?.success) {
        const docs = result?.data?.documents || {};
        (Object.keys(docs) as DocKey[]).forEach((key) => {
          const url = docs[key];
          if (url) {
            savedPreviews[key] = {
              file: null,
              url: url || "",
              isImage: /\.(jpg|jpeg|png|gif|webp)$/i.test(url),
            };
          }
        });
      }
    }
  } catch (err) {
    console.error("Server fetch error:", err);
  }

  return <UploadDocuments savedPreviews={savedPreviews} />;
}
