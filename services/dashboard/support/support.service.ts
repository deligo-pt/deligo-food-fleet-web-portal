"use server";

import { serverFetch } from "@/lib/serverFetch";
import { TSupportTicket } from "@/types/support.type";
import { catchAsync } from "@/utils/catchAsync";
import { queryStringFormatter } from "@/utils/formatter";

export const getMyTicketReq = async (): Promise<TSupportTicket> => {
  const result = await catchAsync(async () => {
    return await serverFetch.get("/support/tickets");
  });

  if (result?.success) return result.data?.[0] || {};

  return {} as TSupportTicket;
};

export const getMessagesReq = async (
  ticketId: string,
  queries: Record<string, string | undefined>,
) => {
  const queryString = queryStringFormatter(queries);

  const result = await catchAsync(async () => {
    return await serverFetch.get(
      `/support/tickets/${ticketId}/messages?${queryString}`,
    );
  });

  if (result?.success)
    return {
      data: result.data?.reverse(),
      meta: result.meta,
    };

  return {
    data: [],
  };
};

export const markReadReq = async (ticketId: string) => {
  return catchAsync(async () => {
    return await serverFetch.patch(`/support/tickets/${ticketId}/read`);
  });
};

export const closeTicketReq = async (ticketId: string) => {
  return catchAsync(async () => {
    return await serverFetch.patch(`/support/tickets/${ticketId}/close`);
  });
};

export const getUnreadCountReq = async () => {
  return catchAsync(async () => {
    return await serverFetch.get("/support/unread-count");
  });
};
