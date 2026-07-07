import { ApolloCache } from "@apollo/client";
import { getMessagesDocument } from "../hooks/useGetMessages";
import { MessageFragmentFragment } from "../gql/graphql";

export const updateMessages = (
  cache: ApolloCache,
  message: MessageFragmentFragment,
) => {
  const messagesQuery = {
    query: getMessagesDocument,
    variables: {
      chatId: message.chatId,
    },
  };
  const messages = cache.readQuery({
    ...messagesQuery,
  });

  cache.writeQuery({
    ...messagesQuery,
    data: {
      messages: (messages?.messages || []).concat(message),
    },
  });
};