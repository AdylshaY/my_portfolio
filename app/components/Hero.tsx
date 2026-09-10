'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import { SectionContainer } from './shared/SectionContainer';
import { HeroBackground } from './shared/HeroBackground';
import { useScrollTo } from '../hooks/useScrollTo';
import { FaArrowDown } from 'react-icons/fa';
import { useDictionary } from '../context/DictionaryContext';

export const Hero = () => {
  const dict = useDictionary();
  const scrollTo = useScrollTo();

  const handleProjectsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrollTo('projects');
  };

  const handleKeyProjectsNavigation = (
    e: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollTo('projects');
    }
  };

  const handleContactClick = () => {
    scrollTo('contact');
  };

  const handleKeyContactNavigation = (
    e: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollTo('contact');
    }
  };

  const handleScrollToProjects = () => {
    scrollTo('about');
  };

  return (
    <div className='relative h-screen overflow-hidden'>
      <SectionContainer
        id='home'
        className='h-full flex items-center justify-center'
      >
        <HeroBackground />

        <div className='container px-4 mx-auto relative z-40'>
          <div className='grid lg:grid-cols-2 gap-8 items-center'>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className='text-center lg:text-left space-y-6'
            >
              <div>
                <h1 className='font-mono text-3xl md:text-4xl lg:text-5xl font-bold tracking-normal'>
                  {dict.hero.greeting}{' '}
                  <span className='text-primary'>Adylsha Yumayev</span>
                </h1>
                <p className='mt-4 text-2xl font-medium text-foreground/80'>
                  {dict.hero.role}
                </p>
              </div>

              <p className='text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0'>
                {dict.hero.description}
              </p>

              <div className='flex flex-wrap gap-4 justify-center lg:justify-start'>
                <button
                  className='px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                  onClick={handleProjectsClick}
                  onKeyDown={handleKeyProjectsNavigation}
                  aria-label={dict.hero.viewProjects}
                  tabIndex={0}
                >
                  {dict.hero.viewProjects}
                </button>
                <button
                  className='px-6 py-3 rounded-lg border-primary border-solid border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                  onClick={handleContactClick}
                  onKeyDown={handleKeyContactNavigation}
                  aria-label={dict.hero.contactMe}
                  tabIndex={0}
                >
                  {dict.hero.contactMe}
                </button>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='relative hidden lg:block'
            >
              <div className='relative w-full aspect-square'>
                <div className='absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/20 rounded-full animate-pulse' />
                <Image
                  src='/hero-image.jpg'
                  alt='Hero Image'
                  fill
                  className='object-cover rounded-full p-8'
                  priority
                />
              </div>
            </m.div>
          </div>
        </div>
      </SectionContainer>

      <button
        className='absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
        onClick={handleScrollToProjects}
        aria-label='Scroll Down'
        tabIndex={0}
      >
        <FaArrowDown className='w-6 h-6 text-muted-foreground hover:scale-150 transition-all duration-300' />
      </button>
    </div>
  );
};
