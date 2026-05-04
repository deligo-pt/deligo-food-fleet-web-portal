"use server";

import { serverFetch } from "@/lib/serverFetch";
import { catchAsync } from "@/utils/catchAsync";

export const changePasswordReq = async (payload: {
  oldPassword: string;
  newPassword: string;
}) => {
  return catchAsync(async () => {
    return await serverFetch.post("/auth/change-password", {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  });
};
