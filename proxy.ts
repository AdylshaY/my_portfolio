import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n-config';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the file is an asset (image, favicon, etc.)
  if (
    [
      '/manifest.json',
      '/favicon.ico',
      '/logo.png',
      '/hero-image.jpg',
      '/dalle-clone.png',
      '/airbnb-clone.png',
      '/twitter-image.png',
      '/prompt-app.png',
      '/yumasnap.png',
    ].includes(pathname) ||
    pathname.startsWith('/blogs/') ||
    pathname.startsWith('/certificates/') ||
    pathname.startsWith('/_next/')
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = i18n.defaultLocale;

    // Rewrite URL to use default locale (hidden default locale strategy)
    // e.g. /about -> /tr/about (but URL bar stays /about)
    return NextResponse.rewrite(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url,
      ),
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
