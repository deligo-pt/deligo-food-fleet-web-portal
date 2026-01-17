import LiveChat from "@/components/LiveChat/LiveChat";
import { serverFetch } from "@/lib/serverFetch";
import { TMeta } from "@/types";
import { TConversation, TMessage } from "@/types/chat.type";
import { queryStringFormatter } from "@/utils/formatter";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default async function LiveChatPage() {
  let conversationData = {} as TConversation;
  let messagesData = {} as { data: TMessage[]; meta?: TMeta };

  const accessToken = (await cookies()).get("accessToken")?.value || "";
  const decoded = jwtDecode(accessToken) as { userId: string };

  try {
    const conversationQueryString = queryStringFormatter({
      type: "FLEET_MANAGER_CHAT",
    });

    const conversationRes = await serverFetch.get(
      `/support/conversation?${conversationQueryString}`
    );
    const conversationResult = await conversationRes.json();

    conversationData = conversationResult.data?.[0];

    const msgsQueryString = queryStringFormatter({
      page: "1",
      limit: "50",
      sortBy: "createdAt",
    });

    const messagesRes = await serverFetch.get(
      `/support/conversations/${conversationResult.data?.[0]?.room}/messages?${msgsQueryString}`
    );

    messagesData = await messagesRes.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error?.response?.data, error.message);
  }

  return (
    <LiveChat
      initialConversation={conversationData}
      initialMessagesData={messagesData}
      fleetManagerId={decoded.userId}
    />
  );
}
