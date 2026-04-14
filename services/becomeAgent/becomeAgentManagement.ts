"use server";
import { serverFetch } from "@/lib/serverFetch";
import { TFleetManager } from "@/types/fleet-manager.type";
import { catchAsync } from "@/utils/catchAsync";

export const registerFleetAndSendOTPReq = async (payload: {
  email: string;
  password: string;
}) => {
  return catchAsync(async () => {
    return await serverFetch.post("/auth/register/create-fleet-manager", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  });
};

export const updateFleetInformation = async (
  id: string,
  payload: Partial<TFleetManager>,
) => {
  return catchAsync(async () => {
    return await serverFetch.patch(`/fleet-managers/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  });
};

export const uploadDocumentsReq = async (
  id: string,
  key: string,
  file: Blob,
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("data", JSON.stringify({ docImageTitle: key }));

  return catchAsync(async () => {
    return await serverFetch.patch(`/fleet-managers/${id}/docImage`, {
      body: formData,
    });
  });
};
