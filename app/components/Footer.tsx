'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { usePathname } from 'next/navigation';
import { useScrollTo } from '../hooks/useScrollTo';
import { socialLinks } from '../data/social';
import Link from 'next/link';
import { useDictionary } from '../context/DictionaryContext';

export const Footer = () => {
  const dict = useDictionary();
  const scrollTo = useScrollTo();
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '/tr' || pathname === '/en';

  const currentYear = new Date().getFullYear();

  const handleKeyDown = (e: React.KeyboardEvent, href: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollTo(href);
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  // Reconstruct nav items from dict
  const navItems = [
    { name: dict.nav.home, href: 'home', isRoute: false },
    { name: dict.nav.about, href: 'about', isRoute: false },
    { name: dict.nav.projects, href: 'projects', isRoute: false },
    { name: dict.skills.title, href: 'skills', isRoute: false },
    { name: dict.nav.blog, href: '/blog', isRoute: true },
    { name: dict.nav.contact, href: 'contact', isRoute: false },
  ];

  const emailLink = socialLinks.find((link) => link.href.startsWith('mailto:'));
  const elsewhereLinks = socialLinks.filter(
    (link) => !link.href.startsWith('mailto:')
  );
  const EmailIcon = emailLink?.icon;

  return (
    <footer className='bg-zinc-900/50 border-t border-zinc-800' id='contact'>
      {/* Primary CTA — homepage only; other pages (e.g. the blog) have no
          #contact section to anchor this to and no reason to repeat it.
          The band's wash/border live on this full-width wrapper so they
          span edge-to-edge like the footer itself; only the content inside
          is constrained to the container. */}
      {isHomePage && (
        <div className='border-b border-border bg-gradient-to-b from-primary/[0.04] to-transparent'>
          <div className='container mx-auto px-4 py-16 md:py-20 text-center'>
            <h2 className='font-mono text-2xl md:text-3xl font-bold tracking-normal text-foreground mb-6'>
              {dict.footer.contactTitle}
            </h2>
            {emailLink && EmailIcon && (
              <a
                href={emailLink.href}
                className='inline-flex items-center gap-3 px-6 py-3.5 md:px-8 md:py-4 rounded-lg bg-primary text-primary-foreground text-lg md:text-xl font-semibold hover:bg-primary/90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                aria-label={`${dict.footer.email}: adylshay@gmail.com`}
              >
                <EmailIcon className='w-5 h-5 md:w-6 md:h-6' aria-hidden='true' />
                adylshay@gmail.com
              </a>
            )}
          </div>
        </div>
      )}

      <div className='container mx-auto px-4'>
        {/* Secondary meta grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 py-12 text-sm'>
          {/* About section */}
          <div>
            <h3 className='font-semibold mb-3 text-foreground/90'>
              {dict.footer.aboutTitle}
            </h3>
            <p className='text-muted-foreground'>{dict.footer.aboutDesc}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className='font-semibold mb-3 text-foreground/90'>
              {dict.footer.linksTitle}
            </h3>
            <ul className='space-y-2'>
              {navItems.map((link) => (
                <li key={link.href}>
                  {link.isRoute ? (
                    <Link
                      href={link.href}
                      className='text-muted-foreground hover:text-primary transition-colors duration-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={`#${link.href}`}
                      className='text-muted-foreground hover:text-primary transition-colors duration-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                      aria-label={link.name}
                      onClick={(e) => handleNavClick(e, link.href)}
                      onKeyDown={(e) => handleKeyDown(e, link.href)}
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Elsewhere */}
          <div>
            <h3 className='font-semibold mb-3 text-foreground/90'>
              {dict.footer.elsewhere}
            </h3>
            <div className='flex space-x-4'>
              {elsewhereLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-muted-foreground hover:text-primary transition-colors duration-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                    aria-label={link.label}
                    onKeyDown={(e) => handleKeyDown(e, link.href)}
                  >
                    <Icon className='w-5 h-5' />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className='border-t border-border py-6 text-center text-muted-foreground text-sm'>
          <p>
            © {currentYear} Adylsha Yumayev. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};
