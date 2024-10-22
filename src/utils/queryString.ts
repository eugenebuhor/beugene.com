import queryString from 'query-string';

type SearchParams = Record<string, string | string[] | undefined>;

export const parseSearchParams = <T extends Record<string, string | string[] | undefined>>(
  searchParams: SearchParams,
): T => {
  const stringifiedSearchParams = queryString.stringify(searchParams, { encode: false });
  const parsedParams = queryString.parse(stringifiedSearchParams, { arrayFormat: 'bracket' });

  return parsedParams as T;
};

export const stringifyQueryString = (searchParams: Record<string, string | string[]>) => {
  return queryString.stringify(searchParams, { arrayFormat: 'bracket' });
};
