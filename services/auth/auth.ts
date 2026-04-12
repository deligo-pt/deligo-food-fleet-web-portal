"use server";

import { DEVICE_KEY } from "@/consts/device.const";
import { serverFetch } from "@/lib/serverFetch";
import { catchAsync } from "@/utils/catchAsync";
import { cookies } from "next/headers";

type TDeviceDetails = {
  deviceId: string;
  deviceType: string;
  deviceName: string;
  userAgent: string;
};

export const loginReq = async (payload: {
  email: string;
  password: string;
  forceLogin?: boolean;
  deviceDetails: TDeviceDetails;
}) => {
  return catchAsync(async () => {
    return await serverFetch.post("/auth/login", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
};

export const logoutReq = async (payload: { email: string; token: string }) => {
  const deviceId = (await cookies()).get(DEVICE_KEY)?.value || "";
  return catchAsync(async () => {
    return await serverFetch.post("/auth/logout", {
      body: JSON.stringify({ ...payload, deviceId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
};
