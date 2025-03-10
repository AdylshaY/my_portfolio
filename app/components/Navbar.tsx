'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useScrollTo } from '../hooks/useScrollTo';
import '../i18n/client';

type NavItem = {
  name: string;
  href: string;
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const scrollTo = useScrollTo();
  const navbarRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { name: t('nav.home'), href: 'home' },
    { name: t('nav.about'), href: 'about' },
    { name: t('nav.projects'), href: 'projects' },
    { name: t('nav.skills'), href: 'skills' },
    { name: t('nav.contact'), href: 'contact' },
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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      scrollTo(href);
    }, 100);
  };

  const handleKeyNavigation = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(false);
      setTimeout(() => {
        scrollTo(href);
      }, 100);
    }
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyToggleMenu = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
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
              className='flex items-center'
              aria-label='Homepage'
              tabIndex={0}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className='text-2xl font-bold bg-primary text-primary-foreground px-3 py-1 rounded-lg shadow-lg shadow-primary/25'
              >
                AY
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div
              className='hidden md:flex items-center space-x-8'
              role='navigation'
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={`#${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onKeyDown={(e) => handleKeyNavigation(e, item.href)}
                  className='text-foreground hover:text-primary transition-colors duration-200 relative group'
                  tabIndex={0}
                  aria-label={item.name}
                >
                  {item.name}
                  <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full' />
                </Link>
              ))}
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              className='md:hidden p-2 text-foreground hover:text-primary transition-colors'
              onClick={handleToggleMenu}
              onKeyDown={handleKeyToggleMenu}
              aria-label='Toggle menu'
              aria-expanded={isOpen}
              tabIndex={0}
            >
              <div className='w-6 h-5 relative flex flex-col justify-between'>
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${
                    isOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 ${
                    isOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{ height: isOpen ? 'auto' : 0 }}
            className='md:hidden overflow-hidden bg-background/50 backdrop-blur-lg rounded-b-lg'
            role={isOpen ? 'menu' : undefined}
          >
            <div className='pb-4 space-y-2'>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={`#${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onKeyDown={(e) => handleKeyNavigation(e, item.href)}
                  className='block py-2 px-4 text-foreground hover:text-primary hover:bg-primary/5 transition-colors duration-200'
                  tabIndex={isOpen ? 0 : -1}
                  aria-label={item.name}
                >
                  {item.name}
                </Link>
              ))}
              <div className='pt-2 px-4'>
                <LanguageSwitcher
                  isMobile={true}
                  closeNavbar={() => setIsOpen(false)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </nav>
    </div>
  );
};
