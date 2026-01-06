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
