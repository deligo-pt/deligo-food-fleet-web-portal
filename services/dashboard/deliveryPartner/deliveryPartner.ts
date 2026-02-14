/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { revalidatePath, revalidateTag } from "next/cache";


export const getDeliveryPartners = async (queryString?: string) => {
  try {
    const res = await serverFetch.get(`/delivery-partners${queryString ? `?${queryString}` : ""}`, {
      next: {
        revalidate: 30
      }
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch delivery partners");
    }

    const result = await res.json();

    return result;

  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error?.message ? error?.message : error?.response?.data?.message : 'Something went wrong in delivery partner fetching.'}`
    };
  }
};

export const getPartnerPerformanceAnalytics = async (queryString?: string) => {
  try {
    const res = await serverFetch.get(`/analytics/partner-performance-analytics${queryString ? `?${queryString}` : ""}`, {
      next: {
        revalidate: 30
      }
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch performance analytics");
    }

    const result = await res.json();

    return result?.data;

  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error?.message ? error?.message : error?.response?.data?.message : 'Something went wrong in partner performance fetching.'}`
    };
  }
};

export const getDeliveryPartnerDetails = async (id?: string) => {
  try {
    const res = await serverFetch.get(`/delivery-partners/${id}`, {
      next: {
        revalidate: 30
      }
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch partner details");
    }

    const result = await res.json();

    return result?.data;

  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error?.message ? error?.message : error?.response?.data?.message : 'Something went wrong in delivery partner fetching.'}`
    };
  }
};

export const createDeliveryPartner = async (payload: any) => {
  const res = await serverFetch.post("/auth/register/onboard/delivery-partner", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create delivery partner");
  }

  const result = await res.json();

  revalidateTag("delivery-partners", {});
  revalidatePath("/agent/delivery-partners");

  return result;
};

export const updatePartnerInformation = async (id: string, payload: any) => {

  const res = await serverFetch.patch(`/delivery-partners/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update partner information");
  }

  const result = await res.json();

  return result;
};

export const uploadPartnerDocuments = async (
  id: string,
  key: string,
  file: Blob
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({ docImageTitle: key }));

    const res = await serverFetch.patch(
      `/delivery-partners/${id}/docImage`,
      {
        body: formData,
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to upload partner documents");
    };

    const result = await res.json();

    return result;
  } catch (error: any) {
    console.log("Server fetch error:", error);
    return { success: false, message: error?.message ? error?.message : error?.response?.data?.message };
  }
};

export const submitForApproval = async (id: string) => {
  const res = await serverFetch.patch(`/auth/${id}/submitForApproval`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to submit partner for approval");
  }

  const result = await res.json();

  revalidatePath("/agent/delivery-partners");
  revalidateTag("delivery-partners", {});

  return result;
};
