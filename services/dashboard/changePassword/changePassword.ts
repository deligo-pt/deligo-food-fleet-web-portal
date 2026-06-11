"use server";

import { serverFetch } from "@/lib/serverFetch";
import { catchAsync } from "@/utils/catchAsync";

export const changePasswordReq = async (payload: {
  oldPassword: string;
  newPassword: string;
}) => {
  return catchAsync(async () => {
    const result = await serverFetch.post("/auth/change-password", {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return result;
  });
};
