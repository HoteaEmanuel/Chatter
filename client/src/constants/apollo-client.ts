import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { API_URL } from "./urls";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: `${API_URL}/graphql` }),
});

export default client;
