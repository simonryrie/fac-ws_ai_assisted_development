import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  type DefaultOptions,
} from "@apollo/client/core/index.js";
import { onError } from "@apollo/client/link/error/index.js";
import { browser } from "$app/environment";

// Create the HTTP link to our GraphQL API
const httpLink = (fetchFn: typeof fetch) => {
  return createHttpLink({
    uri: '/api/graphql',
    fetch: fetchFn,
  });
};

// Set up error handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Disable cache for SSR
const ssrOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

// Create and export the Apollo Client factory function
export default function (fetchFn: typeof fetch = fetch) {
  return new ApolloClient({
    ssrMode: !browser,
    link: from([errorLink, httpLink(fetchFn)]),
    cache: new InMemoryCache(),
    defaultOptions: ssrOptions,
  });
}

// For convenience, also export a singleton client instance
export const client = browser 
  ? new ApolloClient({
      ssrMode: false,
      link: from([errorLink, httpLink(fetch)]),
      cache: new InMemoryCache(),
    })
  : null; // Will be created per-request on server