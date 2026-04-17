const DEFAULT_API_URL = 'http://localhost:4000';

export function buildApiTargetUrl(
  pathname: string,
  search: string,
  apiUrl = process.env.API_URL ?? DEFAULT_API_URL,
): string {
  const upstream = new URL(apiUrl);
  const suffix = pathname.replace(/^\/api\/?/, '');
  const basePath = upstream.pathname.replace(/\/$/, '');
  upstream.pathname = `${basePath}/api${suffix ? `/${suffix}` : ''}`;
  upstream.search = search;
  return upstream.toString();
}

export function shouldProxyRequestBody(method: string): boolean {
  return !['GET', 'HEAD'].includes(method.toUpperCase());
}
