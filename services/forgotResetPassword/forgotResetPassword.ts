"use server";

import { serverFetch } from "@/lib/serverFetch";


export const forgotPasswordReq = async (data: { email: string }) => {
  const res = (await serverFetch.post("auth/forgot-password", {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data),
  }));

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to send forgot password request");
  }

  const result = await res.json();

  return result;
};

export const resetPasswordReq = async (data: {
  email: string;
  newPassword: string;
  token: string;
}) => {
  const res = (await serverFetch.post("auth/reset-password", {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data),
  }));

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to send reset password request");
  }

  const result = await res.json();

  return result;
};
