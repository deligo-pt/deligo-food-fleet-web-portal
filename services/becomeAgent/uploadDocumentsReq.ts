"use server";

import { serverFetch } from "@/lib/serverFetch";

export const uploadDocumentsReq = async (
  id: string,
  key: string,
  file: Blob
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({ docImageTitle: key }));

    const res = await serverFetch.patch(`/fleet-managers/${id}/docImage`, {
      body: formData,
    });

    const result = await res.json();

    return result;
  } catch (err) {
    console.error("Server fetch error:", err);
    return false;
  }
};
