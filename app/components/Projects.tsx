'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { useTranslation } from 'react-i18next';
import { SectionContainer } from './shared/SectionContainer';
import { SectionHeader } from './shared/SectionHeader';
import { MotionContainer } from './shared/MotionContainer';
import { ProjectCard } from './shared/ProjectCard';
import { Project } from '../data/types';
import { Carousel } from 'react-responsive-carousel';

export function Projects() {
  const { t } = useTranslation();

  // Get projects from translations
  const projects = t('projects.list', { returnObjects: true }) as Project[];

  return (
    <SectionContainer id='projects'>
      <MotionContainer className='max-w-6xl mx-auto'>
        <SectionHeader
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />

        {/* Projects Grid */}
        <Carousel
          centerMode
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          autoPlay
          interval={3000}
          centerSlidePercentage={50}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </Carousel>
      </MotionContainer>
    </SectionContainer>
  );
}
