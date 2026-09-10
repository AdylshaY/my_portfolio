'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { useScrollTo } from '../hooks/useScrollTo';
import LanguageSwitcher from './LanguageSwitcher';
import { useDictionary } from '../context/DictionaryContext';

export const Navbar = () => {
  const dict = useDictionary();
  const [isOpen, setIsOpen] = useState(false);
  const scrollTo = useScrollTo();
  const navbarRef = useRef<HTMLDivElement>(null);

  const items = [
    { name: dict.nav.home, href: 'home', isRoute: false },
    { name: dict.nav.about, href: 'about', isRoute: false },
    { name: dict.nav.projects, href: 'projects', isRoute: false },
    { name: dict.skills.title, href: 'skills', isRoute: false },
    { name: dict.nav.blog, href: '/blog', isRoute: true },
    { name: dict.nav.contact, href: 'contact', isRoute: false },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLinkClick = (e: any, item: any) => {
    if (item.isRoute) {
      setIsOpen(false);
      return;
    }
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      scrollTo(item.href);
    }, 100);
  };

  return (
    <div className='fixed top-0 w-full z-50' ref={navbarRef}>
      {/* Blur Background */}
      <div className='absolute inset-0 bg-background/30 backdrop-blur-xl' />

      {/* Shadow and Border Overlay */}
      <div className='absolute inset-0'>
        <div className='absolute inset-x-0 top-0 h-full bg-gradient-to-b from-primary/5 to-transparent' />
        <div className='absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent' />
      </div>

      <nav className='relative' aria-label='Main Navigation'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between h-16'>
            {/* Logo */}
            <Link
              href='/'
              className='flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              aria-label='Homepage'
              tabIndex={0}
            >
              <m.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className='font-mono text-2xl font-bold bg-primary text-primary-foreground px-3 py-1 rounded-lg shadow-lg shadow-primary/25'
              >
                AY
              </m.div>
            </Link>

            {/* Desktop Navigation */}
            <div
              className='hidden md:flex items-center space-x-8'
              role='navigation'
            >
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.isRoute ? item.href : `#${item.href}`}
                  onClick={(e) => handleLinkClick(e, item)}
                  className='text-foreground hover:text-primary transition-colors duration-200 relative group rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                >
                  {item.name}
                  <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full' />
                </Link>
              ))}
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button - Left LanguageSwitcher outside mobile menu or inside? Inside looks cleaner for mobile */}
            <div className='flex md:hidden items-center gap-4'>
              <LanguageSwitcher />
              <button
                className='p-2 text-foreground hover:text-primary transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                onClick={() => setIsOpen(!isOpen)}
                aria-label='Toggle menu'
                aria-expanded={isOpen}
              >
                <div className='w-6 h-5 relative flex flex-col justify-between'>
                  <span
                    className={`w-full h-0.5 bg-current transition-all duration-300 origin-center ${
                      isOpen ? 'rotate-45 translate-y-[9px]' : ''
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-current transition-all duration-300 ${
                      isOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-current transition-all duration-300 origin-center ${
                      isOpen ? '-rotate-45 -translate-y-[9px]' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <m.nav
            initial={false}
            animate={{ height: isOpen ? 'auto' : 0 }}
            className='md:hidden overflow-hidden bg-background/50 backdrop-blur-lg rounded-b-lg'
            role={isOpen ? 'menu' : undefined}
          >
            <div className='pb-4 space-y-2'>
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.isRoute ? item.href : `#${item.href}`}
                  onClick={(e) => handleLinkClick(e, item)}
                  className='block py-2 px-4 text-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </m.nav>
        </div>
      </nav>
    </div>
  );
};
