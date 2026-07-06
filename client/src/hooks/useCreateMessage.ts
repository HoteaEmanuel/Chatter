import { MessageFragment } from "./../fragments/message.fragment";
import { useMutation } from "@apollo/client/react";
import { graphql } from "../gql";
import { getMessagesDocument } from "./useGetMessages";

export const createMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

const useCreateMessage = (chatId: string) => {
  return useMutation(createMessageDocument, {
    update(cache, { data }) {
      const messagesQuery = {
        query: getMessagesDocument,
        variables: {
          chatId,
        },
      };
      const messages = cache.readQuery({
        ...messagesQuery,
      });

      if (!messages || !data?.createMessage) return;

      cache.writeQuery({
        ...messagesQuery,
        data: {
          messages: messages.messages.concat(data?.createMessage),
        },
      });
    },
  });
};
export { useCreateMessage };
