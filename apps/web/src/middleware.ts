import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { localeCookieName, resolveLocale } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  const locale = resolveLocale(
    request.cookies.get(localeCookieName)?.value,
    request.headers.get('accept-language'),
  );

  const response = NextResponse.next();
  if (request.cookies.get(localeCookieName)?.value !== locale) {
    response.cookies.set(localeCookieName, locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
