import React from 'react';
import { BlogPost } from '@/app/data/types';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';

const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime === 0 ? 1 : readingTime;
};

const BlogCard = ({ post }: { post: BlogPost }) => {
  const readingTime = calculateReadingTime(post.content);

  return (
    <div className='bg-secondary/30 border border-border/50 p-8 rounded-lg mb-6 hover:border-primary/20 transition-all duration-300'>
      <h2 className='text-2xl font-bold mb-2'>{post.title}</h2>
      <div className='flex items-center gap-3 mb-6'>
        <p className='text-sm text-muted-foreground mr-6'>
          Yayınlanma Tarihi:{' '}
          {new Date(post.publishedDate).toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </p>
        <div className='flex items-center text-sm text-muted-foreground'>
          <FiClock className='mr-1' />
          <span> Ortalama {readingTime} dk okuma süresi</span>
        </div>
      </div>
      <p className='text-md text-muted-foreground mb-6'>{post.description}</p>
      <div className='flex justify-between items-center'>
        <div className='flex flex-wrap gap-2'>
          {post.tags.map((tag) => (
            <p
              key={tag}
              className='p-2 rounded-lg bg-primary/20 text-sm text-muted-foreground'
            >
              #{tag}
            </p>
          ))}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className='group inline-flex items-center gap-1 px-4 py-2 bg-primary rounded-lg text-primary-foreground hover:bg-primary/80 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
          tabIndex={0}
          aria-label={`${post.title} yazısını oku`}
        >
          <span>Devamını Oku</span>
          <FaArrowRight className='w-4 h-4 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300' />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
