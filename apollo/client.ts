import { ApolloClient, InMemoryCache } from "@apollo/react-hooks";

const isServer = () => typeof window === "undefined";

const createIsomorphLink = () => {
  if (isServer()) {
    const { SchemaLink } = require("@apollo/client/link/schema");
    const { schema } = require("./schema");
    return new SchemaLink({ schema });
  } else {
    const { HttpLink } = require("@apollo/client/link/http");
    return new HttpLink({
      uri: "/api/graphql",
      credentials: "same-origin",
    });
  }
};

export const createClient = () =>
  new ApolloClient({
    ssrMode: isServer(),
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });
