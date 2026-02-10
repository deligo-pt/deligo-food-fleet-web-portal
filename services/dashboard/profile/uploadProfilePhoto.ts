"use server";

import { serverFetch } from "@/lib/serverFetch";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const uploadProfilePhoto = async (file: File) => {
  const accessToken = (await cookies())?.get("accessToken")?.value || "";
  const decoded = jwtDecode(accessToken) as { userId: string };

  const formData = new FormData();
  formData.append("file", file);

  const res = (await serverFetch.patch(`/fleet-managers/${decoded.userId}`, {
    body: formData,
  }));

  if (!res.ok) throw new Error('Failed to upload profile photo');

  const result = await res.json();

  return result;
};
