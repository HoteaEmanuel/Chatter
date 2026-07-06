import { CombinedGraphQLErrors } from '@apollo/client/errors';

export interface OriginalErrorExtensions {
  originalError?: {
    message?: string | string[];
    statusCode?: number;
  };
}

export const extractErrorMessage = (err: unknown) => {
  if (!CombinedGraphQLErrors.is(err)) return undefined;

  const graphQLError = err.errors[0];
  const extensions = graphQLError?.extensions as
    OriginalErrorExtensions | undefined;
  const errorMessage =
    extensions?.originalError?.message ?? graphQLError?.message;
  if (Array.isArray(errorMessage)) {
    return formatErrorMessage(errorMessage[0]);
  } else if (errorMessage) return formatErrorMessage(errorMessage);
};

const formatErrorMessage = (errorMessage: string) => {
  return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
};
