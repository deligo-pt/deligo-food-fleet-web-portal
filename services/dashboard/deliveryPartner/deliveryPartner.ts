"use server";

import { serverRequest } from "@/lib/serverFetch";
import { TResponse } from "@/types";

export const uploadPartnerDocuments = async (
  id: string,
  key: string,
  file: Blob
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({ docImageTitle: key }));

    const result = await serverRequest.patch(
      `/delivery-partners/${id}/docImage`,
      {
        data: formData,
      }
    );

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Server fetch error:", error);
    return { success: false, message: error?.response?.data?.message };
  }
};

export const deleteDeliveryPartner = async (id: string) => {
  const result = (await serverRequest.delete(
    `/auth/soft-delete/${id}`
  )) as TResponse<null>;

  return result;
};
