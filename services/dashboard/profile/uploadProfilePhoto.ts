"use server";

import { serverRequest } from "@/lib/serverFetch";
import { TResponse } from "@/types";
import { TFleetManager } from "@/types/fleet-manager.type";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const uploadProfilePhoto = async (file: File) => {
  const accessToken = (await cookies())?.get("accessToken")?.value || "";
  const decoded = jwtDecode(accessToken) as { id: string };

  const formData = new FormData();
  formData.append("file", file);

  const result = (await serverRequest.patch(`/fleet-managers/${decoded.id}`, {
    data: formData,
  })) as TResponse<TFleetManager>;

  return result;
};
