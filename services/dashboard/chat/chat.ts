"use server";

import { serverFetch } from "@/lib/serverFetch";
import { catchAsync } from "@/utils/catchAsync";

export const openConversationReq = async () => {
  return catchAsync(async () => {
    return await serverFetch.post("/support/conversation");
  });
};

export const getAllAdminConversationsReq = async () => {
  return catchAsync(async () => {
    return await serverFetch.get(
      `/support/conversations?type=FLEET_MANAGER_CHAT`,
    );
  });
};

export const getMessagesByRoomReq = async (room: string, limit = 50) => {
  return catchAsync(async () => {
    return await serverFetch.get(
      `/support/conversations/${room}/messages?limit=${limit}`,
    );
  });
};

export const getUnreadCountReq = async () => {
  return catchAsync(async () => {
    return await serverFetch.get("/support/unread-count");
  });
};
