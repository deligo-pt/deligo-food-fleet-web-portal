export const dynamic = "force-dynamic";

import UploadDocuments from "@/components/BecomeAgent/UploadDocuments";
import { getFleetManagerInfo } from "@/services/getFleetManagerInfo/getFleetManagerInfo";
import { DocKey, IDocs } from "@/types/documents.type";

export default async function UploadDocumentPage() {
  const savedPreviews: IDocs = {} as IDocs;

  try {
    const result = await getFleetManagerInfo();

    if (result?.success) {
      const docs = result?.data?.existingFleetManager?.documents || {};

      (Object.keys(docs) as DocKey[]).forEach((key) => {
        const urls = docs[key];

        if (Array.isArray(urls)) {
          const cleanUrls = Array.isArray(urls)
            ? urls.filter((url) => typeof url === "string" && url.trim() !== "")
            : [];

          savedPreviews[key] = cleanUrls.length > 0 ? cleanUrls : [];
        } else {
          savedPreviews[key] = [];
        }
      });
    }
  } catch (err) {
    console.log("Server fetch error:", err);
  }

  return <UploadDocuments savedPreviews={savedPreviews} />;
}