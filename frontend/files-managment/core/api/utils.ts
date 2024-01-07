export const stringifyQueryParams = (params: Record<string, any>) => {
  const query = Object.entries(params)
    .map(
      ([key, val]) =>
        val && `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
    )
    .join("&");

  return query ? `?${query}` : "";
};
