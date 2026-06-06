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
  return getSingleEntityData<TDeliveryPartner>(`/delivery-partners/${id}`, "delivery-partners");
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
  const result = await catchAsync(async () => {
    return await serverFetch.patch(`/delivery-partners/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  });

  if (result.success) {
    revalidateTag("delivery-partners", {});
    revalidatePath("/agent/delivery-partners");
  };

  return result;
};

export const submitForApproval = async (id: string) => {
  const result = await catchAsync(async () => {
    return await serverFetch.patch(`/auth/${id}/submitForApproval`);
  });

  if (result.success) {
    revalidatePath("/agent/delivery-partners");
    revalidatePath(`/agent/delivery-partners/${id}`)
    revalidateTag("delivery-partners", {});
  }

  return result;
};

/**
 * Payout related server actions
 */
export const initiatePartnerSettlement = async (targetUserId: string) => {
  const result = await catchAsync(async () => {
    return await serverFetch.post("/payouts/initiate-settlement", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetUserId }),
    });
  });


  if (result.success) {
    revalidateTag("payouts", {});
    revalidateTag("delivery-partners", {});
    revalidatePath("/agent/delivery-partner-payouts");
  }

  return result;
};

export const getDeliveryPartnerPayouts = async (queryString: string) => {
  const result = await catchAsync(async () => {
    return await serverFetch.get(`/payouts?${queryString}`, {
      next: {
        tags: ["payouts"],
      },
    });
  });

  return result;
};

export const settlePartnerPayout = async (payoutId: string, formData: FormData) => {
  const result = await catchAsync(async () => {
    return await serverFetch.post(`/payouts/finalize-settlement/${payoutId}`, {
      body: formData,
    });
  });

  if (result.success) {
    revalidateTag("payouts", {});
    revalidatePath("/agent/delivery-partner-payouts");
  }

  return result;
};

export const getSinglePayout = async (payoutId: string) => {
  return getSingleEntityData(
    `/payouts/${payoutId}`,
  );
};