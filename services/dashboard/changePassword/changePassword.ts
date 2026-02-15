"use server";

import { serverFetch } from "@/lib/serverFetch";

export const changePasswordReq = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  const res = (await serverFetch.post("/auth/change-password", {
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data),
  }));

  if (!res.ok) throw new Error('Failed to change password');

  const result = await res.json();

  return result;
};
