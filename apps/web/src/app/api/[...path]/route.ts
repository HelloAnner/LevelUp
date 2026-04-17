import type { NextRequest } from 'next/server';
import { buildApiTargetUrl, shouldProxyRequestBody } from '@/lib/api-proxy';

function filterRequestHeaders(headers: Headers, target: URL): Headers {
  const nextHeaders = new Headers(headers);
  nextHeaders.delete('host');
  nextHeaders.delete('content-length');
  nextHeaders.set('x-forwarded-host', headers.get('host') ?? target.host);
  return nextHeaders;
}

async function proxy(request: NextRequest): Promise<Response> {
  const targetUrl = new URL(
    buildApiTargetUrl(
      request.nextUrl.pathname,
      request.nextUrl.search,
      process.env.API_URL,
    ),
  );

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: filterRequestHeaders(request.headers, targetUrl),
    body: shouldProxyRequestBody(request.method) ? await request.arrayBuffer() : undefined,
    redirect: 'manual',
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: new Headers(response.headers),
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const HEAD = proxy;
export const OPTIONS = proxy;
