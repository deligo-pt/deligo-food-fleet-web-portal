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

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

export const loginReq = async (payload: {
  email: string;
  password: string;
  forceLogin?: boolean;
  deviceDetails: TDeviceDetails;
}) => {
  return catchAsync(async () => {
    return await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  });
};

export const resendOtpReq = async (payload: { email: string; role: string; }) => {
  return catchAsync(async () => {
    return await serverFetch.post("/auth/resend-otp", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
};

export const verifyOtpReq = async (payload: {
  email: string;
  otp: string;
  role: string;
  deviceDetails?: TDeviceDetails;
}) => {
  return catchAsync(async () => {
    return await serverFetch.post("/auth/verify-otp", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
};

export const logoutReq = async () => {
  const cookieStore = await cookies();
  const deviceId = cookieStore.get(DEVICE_KEY)?.value || "";

  const cookieStr = cookieStore.toString();
  const accessToken = cookieStore.get("accessToken")?.value || "";

  return catchAsync(async () => {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { authorization: `Bearer ${accessToken}` }),
        ...(cookieStr && { cookie: cookieStr }),
      },
      body: JSON.stringify({
        deviceId
      }
      ),
    });

    return response;
  });
};
