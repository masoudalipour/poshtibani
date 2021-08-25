import { ApolloClient, from } from '@apollo/client';
import { InMemoryCache, NormalizedCacheObject } from '@apollo/client/cache';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import fetch from 'isomorphic-unfetch';
import { pick } from 'lodash';

/**
 * Apollo Client can only have 1 “terminating” Apollo Link that sends the GraphQL requests
 * so we use apollo-upload-client instead of 'apollo-link-http'
 */
interface IOptions {
  domain?: string;
  cookie?: any;
}

type ICreateApolloClient = (
  ...args: [NormalizedCacheObject, IOptions]
) => ApolloClient<NormalizedCacheObject>;

/**
 * Creates and configures an isomorphic ApolloClient
 * @returns the created ApolloClient instance
 */
export const createApolloClient: ICreateApolloClient = (
  initialState = {},
  { domain, cookie },
) => {
  const authLink = setContext((_request, previousContext) => {
    const { headers } = previousContext;

    if (!domain) {
      domain = document.location.origin;
    }

    return {
      headers: {
        ...headers,
        Cookie: cookie ?? headers?.cookie,
      },
      uri: `${domain}/api/v1/graphql`,
    };
  });

  interface ErrorExtensions {
    messageKey: string;
    variables?: Record<string, any>;
  }

  const translateError = (errorExtensions?: ErrorExtensions): any => {
    /* i18next-extract-disable-next-line */
    return errorExtensions?.messageKey ?? '', errorExtensions?.variables;
  };

  const errorLink = onError(({ operation, graphQLErrors, networkError }) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('--- ', 'failed to run operation: ', operation.operationName, ' ---');
      if (networkError) {
        console.log(`[Network Error]:`, networkError.message);
      }
      if (graphQLErrors) {
        graphQLErrors.forEach((error) => {
          console.log(`[GraphQL Error]:`, error.message);
          console.log('[GraphQL Error Details]:', error);
        });
      }
    }
    if (graphQLErrors) {
      graphQLErrors.forEach((error) => {
        error.message = translateError(
          pick(error.extensions ?? {}, ['messageKey', 'variables']),
        );
      });
    }
  });

  const uploadLink = createUploadLink({
    credentials: 'same-origin',
    fetch: (url, init) =>
      fetch(url, { ...init, headers: { ...init.headers, Cookie: cookie } }),
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([authLink, errorLink, uploadLink as any]),
    cache: new InMemoryCache().restore(initialState),
  });
};
