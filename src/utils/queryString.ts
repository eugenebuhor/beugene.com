import queryString from 'query-string';
import type { ParseOptions, StringifiableRecord, ParsedQuery } from 'query-string';

export const parseSearchParams = <T extends ParsedQuery>(
  searchParams: StringifiableRecord,
  types?: ParseOptions['types'],
): T => {
  const stringifiedSearchParams = queryString.stringify(searchParams, { encode: false });
  const parsedParams = queryString.parse(
    stringifiedSearchParams,
    types
      ? {
          arrayFormat: 'bracket',
          types,
        }
      : {
          arrayFormat: 'bracket',
        },
  );

  return parsedParams as T;
};

export const stringifyQueryString = (searchParams: StringifiableRecord): string => {
  return queryString.stringify(searchParams, { arrayFormat: 'bracket' });
};
