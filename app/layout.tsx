import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Adylsha Yumayev | Full Stack Developer',
  description:
    'Adylsha Yumayev - Full Stack Developer specializing in React.js, Next.js, TypeScript, Node.js, and modern web technologies. Creator of Agency Website, Dall-E Clone, and Airbnb Clone projects. Currently working at Gelecek Varlık Yönetimi as a Junior Full Stack Developer.',
  keywords:
    'Adylsha Yumayev, Full Stack Developer, React Developer, Next.js, TypeScript, JavaScript, Node.js, MongoDB, Tailwind CSS, Agency Website, Dall-E Clone, Airbnb Clone, OpenAI API, Zustand, Prisma',
  authors: [{ name: 'Adylsha Yumayev' }],
  creator: 'Adylsha Yumayev',
  publisher: 'Adylsha Yumayev',
  metadataBase: new URL('https://adylshayumayev.vercel.app/'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'tr-TR': '/tr',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'tr_TR',
    url: 'https://adylshayumayev.vercel.app',
    siteName: 'Adylsha Yumayev Portfolio',
    title: 'Adylsha Yumayev | Full Stack Developer',
    description:
      'Full Stack Developer with expertise in React.js, Next.js, and modern web technologies. Portfolio featuring an Agency Website, AI-powered Dall-E Clone for image generation, and an Airbnb Clone with booking functionality. Currently working at Gelecek Varlık Yönetimi.',
  },
  twitter: {
    card: 'summary',
    title: 'Adylsha Yumayev | Full Stack Developer',
    description:
      'Full Stack Developer specializing in React.js and Next.js. View my portfolio showcasing Agency Website, Dall-E Clone, and Airbnb Clone projects with modern technologies.',
    creator: '@adylshay',
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        href: '/favicon.ico',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
