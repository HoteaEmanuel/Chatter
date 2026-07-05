import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { API_URL } from "./urls";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import excludedRoutes from "./excluded-routes";
import router from "../components/Routes";
import { OriginalErrorExtensions } from "../utils/errors";

const logoutLink = new ErrorLink(({ error }) => {
  if (!CombinedGraphQLErrors.is(error)) return;

  const extensions = error.errors[0]?.extensions as
    | OriginalErrorExtensions
    | undefined;

  if (extensions?.originalError?.statusCode === 401) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      router.navigate("/login");
      client.clearStore().catch(() => {});
    }
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});

export default client;
