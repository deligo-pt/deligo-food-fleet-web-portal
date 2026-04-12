/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import {
  IPartnersAnalyticsResponse,
  TDeliveryPartner,
} from "@/types/delivery-partner.type";
import { catchAsync } from "@/utils/catchAsync";
import {
  getAllEntityData,
  getSingleEntityData,
} from "@/utils/getAllEntityData";
import { revalidatePath, revalidateTag } from "next/cache";

export const getDeliveryPartners = async (queryString?: string) => {
  return getAllEntityData<TDeliveryPartner>("/delivery-partners", queryString);
};

export const getPartnerPerformanceAnalytics = async (queryString?: string) => {
  return getSingleEntityData<IPartnersAnalyticsResponse>(
    `/analytics/partner-performance-analytics${queryString ? `?${queryString}` : ""}`,
  );
};

export const getDeliveryPartnerDetails = async (id?: string) => {
  return getSingleEntityData<TDeliveryPartner>(`/delivery-partners/${id}`);
};

export const createDeliveryPartner = async (payload: any) => {
  const result = await catchAsync(async () => {
    return await serverFetch.post("/auth/register/onboard/delivery-partner", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  });

  if (result.success) {
    revalidateTag("delivery-partners", {});
    revalidatePath("/agent/delivery-partners");
  }

  return result;
};

export const updatePartnerInformation = async (id: string, payload: any) => {
  return catchAsync(async () => {
    return await serverFetch.post(`/delivery-partners/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  });
};

export const submitForApproval = async (id: string) => {
  const result = await catchAsync(async () => {
    return await serverFetch.patch(`/auth/${id}/submitForApproval`);
  });

  if (result.success) {
    revalidatePath("/agent/delivery-partners");
    revalidateTag("delivery-partners", {});
  }

  return result;
};
