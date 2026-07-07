import { MessageFragment } from "./../fragments/message.fragment";
import { graphql } from "../gql";
import {
  MessageCreatedSubscriptionVariables,
  MessageCreatedSubscription,
} from "../gql/graphql";
import { useSubscription } from "@apollo/client/react";
import { data } from "react-router-dom";
import { updateMessages } from "../cache/messages";

const messageCreatedDocument = graphql(`
  subscription messageCreated($chatId: String!) {
    messageCreated(chatId: $chatId) {
      ...MessageFragment
    }
  }
`);

export const useMessageCreated = (
  variables: MessageCreatedSubscriptionVariables,
  onData?: (message: MessageCreatedSubscription["messageCreated"]) => void,
) => {
  return useSubscription(messageCreatedDocument, {
    variables,
    onData: ({ client, data }) => {
      if (data.data) updateMessages(client.cache, data.data.messageCreated);
    },
  });
};
