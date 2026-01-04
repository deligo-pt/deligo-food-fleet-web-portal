import ChatSupport from "@/components/ChatSupport/ChatSupport";
import { serverRequest } from "@/lib/serverFetch";
import { TMeta, TResponse } from "@/types";
import { TConversation, TMessage } from "@/types/chat.type";

export default async function ChatSupportPage() {
  let conversationData = {} as TConversation;
  let messagesData = {} as { data: TMessage[]; meta?: TMeta };

  try {
    const conversationResult = (await serverRequest.post(
      "/support/conversation"
    )) as TResponse<TConversation>;

    conversationData = conversationResult.data;

    const messagesResult = (await serverRequest.get(
      `/support/conversations/${conversationResult?.data?.room}/messages`,
      { params: { page: 1, limit: 50, sortBy: "createdAt" } }
    )) as TResponse<TMessage[]>;

    messagesData = messagesResult;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
