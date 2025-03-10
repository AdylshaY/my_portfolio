'use client';

import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaEnvelope, FaYoutube } from 'react-icons/fa';
import { FaMedium, FaXTwitter } from 'react-icons/fa6';
import { useScrollTo } from '../hooks/useScrollTo';

export const Footer = () => {
  const { t } = useTranslation();
  const scrollTo = useScrollTo();

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaGithub className='w-5 h-5' />,
      href: 'https://github.com/adylshay',
      label: 'GitHub',
    },
    {
      icon: <FaLinkedin className='w-5 h-5' />,
      href: 'https://linkedin.com/in/adylshay',
      label: 'LinkedIn',
    },
    {
      icon: <FaXTwitter className='w-5 h-5' />,
      href: 'https://x.com/adylshay',
      label: 'Twitter',
    },
    {
      icon: <FaEnvelope className='w-5 h-5' />,
      href: 'mailto:adylshay@gmail.com',
      label: 'Email',
    },
    {
      icon: <FaYoutube className='w-5 h-5' />,
      href: 'https://www.youtube.com/@AdylshasDevLab',
      label: 'YouTube',
    },
    {
      icon: <FaMedium className='w-5 h-5' />,
      href: 'https://medium.com/@adylshay',
      label: 'Medium',
    },
  ];

  const navLinks = [
    { name: t('nav.home'), href: 'home' },
    { name: t('nav.about'), href: 'about' },
    { name: t('nav.projects'), href: 'projects' },
    { name: t('nav.skills'), href: 'skills' },
    { name: t('nav.contact'), href: 'contact' },
  ];

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

  return (
    <footer className='bg-gray-900 text-white py-12' id='contact'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* About section */}
          <div>
            <h3 className='text-xl font-bold mb-4'>{t('footer.about')}</h3>
            <p className='text-gray-300 mb-4'>{t('footer.description')}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className='text-xl font-bold mb-4'>{t('footer.quickLinks')}</h3>
            <ul className='space-y-2'>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={`#${link.href}`}
                    className='text-gray-300 hover:text-white transition-colors duration-300'
                    tabIndex={0}
                    aria-label={link.name}
                    onClick={(e) => handleNavClick(e, link.href)}
                    onKeyDown={(e) => handleKeyDown(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect section */}
          <div>
            <h3 className='text-xl font-bold mb-4'>{t('footer.connect')}</h3>
            <div className='flex space-x-4 mb-4'>
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-300 hover:text-white transition-colors duration-300'
                  tabIndex={0}
                  aria-label={link.label}
                  onKeyDown={(e) => handleKeyDown(e, link.href)}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <p className='text-gray-300'>
              {t('footer.contactEmail')}: adylshay@gmail.com
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-800 my-8'></div>

        {/* Copyright */}
        <div className='text-center text-gray-400'>
          <p>
            © {currentYear} Adylshay Yumayev. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};
