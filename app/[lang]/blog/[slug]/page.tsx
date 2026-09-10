import { getBlogPostBySlug } from '@/app/utils/getBlogPosts';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Locale } from '../../../../i18n-config';
import { getDictionary } from '@/app/utils/get-dictionary';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: Locale }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Blog Bulunamadı | Adylsha Yumayev',
    };
  }

  return {
    title: `${post.title} | Adylsha Yumayev`,
    description: post.description || `${post.title} hakkında blog yazısı.`,
    authors: [{ name: 'Adylsha Yumayev' }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://yumayev.dev/blog/${slug}`,
      publishedTime: post.publishedDate,
      authors: ['Adylsha Yumayev'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; lang: Locale }>;
}) {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang);
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className='container mx-auto my-20'>
      <div className='mb-8'>
        <Link
          href='/blog'
          className='flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m15 18-6-6 6-6' />
          </svg>
          <span>{dict.blog.back}</span>
        </Link>
      </div>
      <h1 className='text-6xl font-bold mb-8'>{post.title}</h1>
      <article>
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className='text-3xl font-bold mt-12 mb-6 text-foreground leading-tight'>
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className='text-2xl font-semibold mt-10 mb-5 text-foreground leading-snug border-l-4 border-primary pl-4'>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className='text-xl font-semibold mt-8 mb-4 text-foreground/90'>
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className='text-lg leading-relaxed text-muted-foreground mb-6 font-normal tracking-wide'>
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className='list-disc list-inside mb-6 space-y-2 text-muted-foreground text-lg ml-4 marker:text-primary'>
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className='list-decimal list-inside mb-6 space-y-2 text-muted-foreground text-lg ml-4 marker:text-primary font-medium'>
                {children}
              </ol>
            ),
            blockquote: ({ children }) => (
              <blockquote className='border-l-4 border-primary/50 pl-6 py-2 my-8 italic text-xl text-foreground/80 bg-secondary/10 rounded-r-lg'>
                {children}
              </blockquote>
            ),
            code: ({ children, className }) => {
              const match = /language-(\w+)/.exec(className || '');
              const isInline = !match && !className?.includes('language-');

              if (isInline) {
                return (
                  <code className='bg-secondary text-primary px-1.5 py-0.5 rounded text-sm font-mono'>
                    {children}
                  </code>
                );
              }

              return (
                <div className='my-8 rounded-lg overflow-hidden border border-border/50 bg-[#0d1117] shadow-lg'>
                  <div className='flex items-center px-4 py-2 bg-[#161b22] border-b border-border/10'>
                    <div className='flex space-x-2'>
                      <div className='w-3 h-3 rounded-full bg-red-500/80'></div>
                      <div className='w-3 h-3 rounded-full bg-yellow-500/80'></div>
                      <div className='w-3 h-3 rounded-full bg-green-500/80'></div>
                    </div>
                  </div>
                  <div className='p-6 overflow-x-auto text-sm font-mono text-gray-300'>
                    <code className={className}>{children}</code>
                  </div>
                </div>
              );
            },
            img: ({ src, alt }) => {
              if (!src) return null;

              // If it's an external URL, render normal image
              if (src.startsWith('http')) {
                return (
                  <span className="block my-10">
                    <img src={src} alt={alt || ''} className='rounded-lg shadow-xl mx-auto max-h-[500px] object-cover' />
                    {alt && <span className="block text-center text-sm text-muted-foreground mt-3 italic">{alt}</span>}
                  </span>
                );
              }

              // For local images, prefix with the blog directory
              const imagePath = `/blogs/${post.directory}/${src}`;

              return (
                <span className="block my-10 group">
                  <span className="block relative overflow-hidden rounded-lg shadow-xl transition-transform duration-300 hover:scale-[1.01]">
                    <Image
                      src={imagePath}
                      alt={alt || 'Blog görseli'}
                      width={800}
                      height={400}
                      className='object-contain mx-auto'
                    />
                  </span>
                  {alt && <span className="block text-center text-sm text-muted-foreground mt-3 italic group-hover:text-primary transition-colors">{alt}</span>}
                </span>
              );
            },
            a: ({ href, children }) => (
              <a href={href} className='text-primary hover:text-primary/80 underline decoration-primary/30 underline-offset-4 transition-colors font-medium rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background' target="_blank" rel="noopener noreferrer">{children}</a>
            ),
            hr: () => <hr className='my-12 border-border' />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
