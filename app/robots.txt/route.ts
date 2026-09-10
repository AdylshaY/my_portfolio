import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';

  // Only allow indexing on the main production domain
  const isMainProduction = host === 'yumayev.dev';

  const lines = ['User-agent: *'];

  if (isMainProduction) {
    lines.push('Allow: /');
    lines.push('Disallow: /private/');
    // Content Signals (https://contentsignals.org/): search engines may
    // index this site, AI agents may use it to answer questions about me
    // (that's the point of this site) - but it should not be used to
    // train AI models.
    lines.push('Content-Signal: search=yes, ai-input=yes, ai-train=no');
    lines.push('');
    lines.push(`Sitemap: ${protocol}://${host}/sitemap.xml`);
  } else {
    lines.push('Disallow: /');
  }

  return new NextResponse(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
