import { NextResponse } from 'next/server';

let locales = ['en', 'es'];

function getLocale(request: { headers: { get: (arg0: string) => string } }) {
  const pathname = request.headers.get('x-invoke-path') || '';
  const localeInPath = locales.find(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (localeInPath) return localeInPath;

  const referer = request.headers.get('referer') || '';
  const localeInReferer = locales.find(locale => referer.includes(`/${locale}/`) || referer.endsWith(`/${locale}`));

  return localeInReferer || 'en';
}

export function middleware(request: { nextUrl: { pathname: string }; headers: { get: (arg0: string) => string } }) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl as URL);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), api routes, and all files with extensions
    '/((?!api|_next|.*\\..*$).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
