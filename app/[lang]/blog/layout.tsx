import React from 'react';
import Link from 'next/link';
import {
  FaGithub,
  FaLinkedin,
  FaMedium,
  FaYoutube,
  FaXTwitter,
} from 'react-icons/fa6';

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='sticky top-0 z-40 w-full backdrop-blur-xl'>
        <div className='absolute inset-0'>
          <div className='absolute inset-x-0 top-0 h-full bg-gradient-to-b from-primary/5 to-transparent' />
          <div className='absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent' />
        </div>

        <div className='relative container mx-auto px-4'>
          <nav className='flex items-center justify-between h-16'>
            <div className='flex items-center space-x-4'>
              <Link
                href='/'
                className='text-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              >
                <span className='font-mono text-2xl font-bold bg-primary text-primary-foreground px-3 py-1 rounded-lg shadow-lg shadow-primary/25'>
                  AY
                </span>
              </Link>
            </div>

            <div className='flex items-center space-x-6'>
              <Link
                href='https://medium.com/@adylshay'
                className='text-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                target='_blank'
              >
                <FaMedium className='text-2xl' />
              </Link>
              <Link
                href='https://www.youtube.com/@AdylshasDevLab'
                className='text-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                target='_blank'
              >
                <FaYoutube className='text-2xl' />
              </Link>
              <Link
                href='https://www.linkedin.com/in/adylshay'
                className='text-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                target='_blank'
              >
                <FaLinkedin className='text-2xl' />
              </Link>
              <Link
                href='https://github.com/adylshay'
                className='text-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                target='_blank'
              >
                <FaGithub className='text-2xl' />
              </Link>
              <Link
                href='https://x.com/adylshay'
                className='text-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                target='_blank'
              >
                <FaXTwitter className='text-2xl' />
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className='flex-grow container mx-auto px-4 py-8'>{children}</main>
    </div>
  );
};

export default BlogLayout;
