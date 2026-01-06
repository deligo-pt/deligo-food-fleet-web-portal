/* eslint-disable @typescript-eslint/no-explicit-any */
import ChatSupport from "@/components/ChatSupport/ChatSupport";
import { serverFetch } from "@/lib/serverFetch";
import { TMeta } from "@/types";
import { TConversation, TMessage } from "@/types/chat.type";
import { queryStringFormatter } from "@/utils/formatter";

export default async function ChatSupportPage() {
  let conversationData = {} as TConversation;
  let messagesData = {} as { data: TMessage[]; meta?: TMeta };

  try {
    const conversationRes = await serverFetch.post("/support/conversation");
    const conversationResult = await conversationRes.json();

    conversationData = conversationResult.data;

    const queryString = queryStringFormatter({
      page: "1",
      limit: "50",
      sortBy: "createdAt",
    });

    const messagesRes = await serverFetch.get(
      `/support/conversations/${conversationResult.data.room}/messages?${queryString}`
    );

    messagesData = await messagesRes.json();
  } catch (error: any) {
    console.log(error?.response?.data, error.message);
  }


  return (
    <ChatSupport
      initialConversation={conversationData}
      initialMessagesData={messagesData}
    />
  );
}
