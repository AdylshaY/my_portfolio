import type { Metadata } from 'next';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inter } from 'next/font/google';
import '../globals.css';
import { FramerMotionProvider } from '../components/shared/FramerMotionProvider';
import { Footer } from '../components/Footer';
import { i18n } from '../../i18n-config';
import { getDictionary } from '../utils/get-dictionary';
import { DictionaryProvider } from '../context/DictionaryContext';
import { socialLinks } from '../data/social';

const inter = Inter({ subsets: ['latin'] });

const SITE_URL = 'https://yumayev.dev';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);
  const isTr = lang === 'tr';
  const localeUrl = isTr ? SITE_URL : `${SITE_URL}/en`;

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: localeUrl,
      languages: {
        tr: SITE_URL,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: localeUrl,
      siteName: 'Adylsha Yumayev',
      locale: isTr ? 'tr_TR' : 'en_US',
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Adylsha Yumayev',
    url: SITE_URL,
    jobTitle: 'Software Engineer',
    knowsAbout: [
      'C#',
      '.NET',
      'ASP.NET Core',
      'SQL Server',
      'Backend Engineering',
      'System Design',
      'Software Architecture',
    ],
    sameAs: socialLinks
      .filter((link) => !link.href.startsWith('mailto:'))
      .map((link) => link.href),
  };

  return (
    <html lang={lang}>
      <head>
        <meta name='color-scheme' content='dark' />
        <meta name='color-profile' content='sRGB' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <DictionaryProvider dict={dict}>
          <FramerMotionProvider>{children}</FramerMotionProvider>
          <Footer />
        </DictionaryProvider>
      </body>
    </html>
  );
}
