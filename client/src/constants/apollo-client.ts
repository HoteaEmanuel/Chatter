import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { API_URL, WS_URL } from "./urls";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import excludedRoutes from "./excluded-routes";
import router from "../components/Routes";
import { OriginalErrorExtensions } from "../utils/errors";
import { onLogout } from "../utils/logout";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { CloseCode, createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
const logoutLink = new ErrorLink(({ error }) => {
  if (!CombinedGraphQLErrors.is(error)) return;

  const extensions = error.errors[0]?.extensions as
    | OriginalErrorExtensions
    | undefined;

  if (extensions?.originalError?.statusCode === 401) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${WS_URL}/graphql`,
    on: {
      closed: (event) => {
        if ((event as CloseEvent)?.code !== CloseCode.Forbidden) return;
        if (!excludedRoutes.includes(window.location.pathname)) {
          onLogout();
        }
      },
    },
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(splitLink),
});

export default client;
