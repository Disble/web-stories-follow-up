export function paramsStringify(params: Record<string, unknown>): string {
  const paramsStringify = JSON.parse(JSON.stringify(params));
  const searchParams = new URLSearchParams(paramsStringify);
  return searchParams.toString();
}

export function queryParse(query: Record<string, unknown> | undefined): string {
  return query ? `?${paramsStringify(query)}` : "";
}
