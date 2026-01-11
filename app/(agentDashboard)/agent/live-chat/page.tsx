import LiveChat from "@/components/LiveChat/LiveChat";
import { serverFetch } from "@/lib/serverFetch";
import { TMeta } from "@/types";
import { TConversation, TMessage } from "@/types/chat.type";
import { queryStringFormatter } from "@/utils/formatter";

export default async function LiveChatPage() {
  let conversationData = {} as TConversation;
  let messagesData = {} as { data: TMessage[]; meta?: TMeta };

  try {
    const conversationRes = await serverFetch.get("/support/conversation");
    const conversationResult = await conversationRes.json();

    conversationData = conversationResult.data?.[0];

    const queryString = queryStringFormatter({
      page: "1",
      limit: "50",
      sortBy: "createdAt",
    });

    const messagesRes = await serverFetch.get(
      `/support/conversations/${conversationResult.data?.[0]?.room}/messages?${queryString}`
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
    />
  );
}
