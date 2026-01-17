"use server";

import { serverFetch } from "@/lib/serverFetch";
import { catchAsync } from "@/utils/catchAsync";

export const getAllNotificationsReq = async ({ limit = 10 }) => {
  return catchAsync(async () => {
    return await serverFetch.get(
      `/notifications/my-notifications?limit=${String(limit)}`,
    );
  });
};

export const singleMarkReadReq = async (id: string) => {
  return catchAsync(async () => {
    return await serverFetch.patch(`/notifications/${id}/read`);
  });
};

export const allMarkReadReq = async () => {
  return catchAsync(async () => {
    return await serverFetch.patch("/notifications/mark-all-as-read");
  });
};
