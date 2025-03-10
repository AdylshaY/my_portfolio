'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { useTranslation } from 'react-i18next';
import { SectionContainer } from './shared/SectionContainer';
import { SectionHeader } from './shared/SectionHeader';
import { MotionContainer } from './shared/MotionContainer';
import { ProjectCard } from './shared/ProjectCard';
import { Project } from '../data/types';
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from 'react';

export function Projects() {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(0);

  // Get projects from translations
  const projects = t('projects.list', { returnObjects: true }) as Project[];

  // Update window width on client side
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine how many cards to show based on screen width
  const getItemsToShow = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const itemsToShow = getItemsToShow();

  return (
    <SectionContainer id='projects'>
      <MotionContainer className='max-w-6xl mx-auto'>
        <SectionHeader
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />

        {/* Projects Carousel */}
        <div className='relative pb-12'>
          <Carousel
            showThumbs={false}
            showStatus={false}
            autoPlay
            interval={5000}
            infiniteLoop
            showArrows
            showIndicators={false}
            centerMode
            swipeable
            centerSlidePercentage={100 / itemsToShow}
            renderArrowPrev={(onClickHandler, hasPrev) =>
              hasPrev && (
                <button
                  type='button'
                  onClick={onClickHandler}
                  className='absolute left-0  top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm text-primary hover:bg-background/90 transition-all -ml-4'
                  aria-label='Previous slide'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.75 19.5L8.25 12l7.5-7.5'
                    />
                  </svg>
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext) =>
              hasNext && (
                <button
                  type='button'
                  onClick={onClickHandler}
                  className='absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm text-primary hover:bg-background/90 transition-all -mr-4'
                  aria-label='Next slide'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8.25 4.5l7.5 7.5-7.5 7.5'
                    />
                  </svg>
                </button>
              )
            }
          >
            {projects.map((project, index) => (
              <div key={index} className='px-4 h-full'>
                <ProjectCard project={project} />
              </div>
            ))}
          </Carousel>
        </div>
      </MotionContainer>
    </SectionContainer>
  );
}
