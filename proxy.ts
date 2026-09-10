import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n-config';

// Paths that represent "the homepage" across locales - used to advertise
// llms.txt via a Link header for AI agent discovery (RFC 8288).
const HOMEPAGE_PATHS = ['/', '/tr', '/en'];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the file is an asset (image, favicon, etc.) or a root-level
  // metadata route (robots.txt, sitemap.xml, llms.txt, OG images) that must
  // not be rewritten under a locale prefix.
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
      '/robots.txt',
      '/sitemap.xml',
      '/llms.txt',
    ].includes(pathname) ||
    pathname.startsWith('/blogs/') ||
    pathname.startsWith('/certificates/') ||
    pathname.startsWith('/md/') ||
    pathname.startsWith('/_next/')
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );
  const locale = pathnameIsMissingLocale ? i18n.defaultLocale : pathname.slice(1);

  // Agents that request markdown (Accept: text/markdown) get a markdown
  // rendering of the homepage at the same URL instead of the HTML page.
  const acceptsMarkdown =
    request.headers.get('accept')?.includes('text/markdown') ?? false;
  if (acceptsMarkdown && HOMEPAGE_PATHS.includes(pathname)) {
    const markdownResponse = NextResponse.rewrite(
      new URL(`/md/${locale}`, request.url),
    );
    markdownResponse.headers.set('Vary', 'Accept');
    return markdownResponse;
  }

  // Rewrite to the default locale (hidden default locale strategy)
  // e.g. /about -> /tr/about (but URL bar stays /about)
  const response = pathnameIsMissingLocale
    ? NextResponse.rewrite(
        new URL(
          `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
          request.url,
        ),
      )
    : NextResponse.next();

  // Point AI agents to a machine-readable site summary on the homepage.
  if (HOMEPAGE_PATHS.includes(pathname)) {
    response.headers.set('Link', '</llms.txt>; rel="describedby"');
  }

  return response;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
