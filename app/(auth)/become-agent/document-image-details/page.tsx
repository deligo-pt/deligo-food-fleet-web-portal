export const dynamic = "force-dynamic";

import UploadDocuments from "@/components/BecomeAgent/UploadDocuments";
import { getFleetManagerInfo } from "@/services/getFleetManagerInfo/getFleetManagerInfo";
import { DocKey, FilePreview } from "@/types/documents.type";

export default async function UploadDocumentPage() {
  const savedPreviews: Record<DocKey, FilePreview | null> = {} as Record<
    DocKey,
    FilePreview | null
  >;

  try {
    const result = await getFleetManagerInfo();

    if (result?.success) {
      const docs = result?.data?.documents || {};

      (Object.keys(docs) as DocKey[]).forEach((key) => {
        const urls = docs[key];

        if (urls) {
          const urlArray = Array.isArray(urls) ? urls : [urls];
          const url = urlArray[0] || "";

          savedPreviews[key] = {
            file: null,
            url,
            isImage: /\.(jpg|jpeg|png|gif|webp)$/i.test(url),
          };
        } else {
          savedPreviews[key] = null;
        }
      });
    }
  } catch (err) {
    console.log("Server fetch error:", err);
  }

  return <UploadDocuments savedPreviews={savedPreviews} />;
}