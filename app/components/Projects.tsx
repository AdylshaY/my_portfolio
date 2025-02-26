'use client';

import { useTranslation } from 'react-i18next';
import { SectionContainer } from './shared/SectionContainer';
import { SectionHeader } from './shared/SectionHeader';
import { MotionContainer } from './shared/MotionContainer';
import { ProjectCard } from './shared/ProjectCard';

interface Project {
  title: string;
  description: string;
  image?: string;
  githubUrl: string;
  technologies: string[];
}

export function Projects() {
  const { t } = useTranslation();

  // Get projects from translations
  const projects = t('projects.list', { returnObjects: true }) as Project[];

  return (
    <SectionContainer id="projects">
      <MotionContainer className="max-w-6xl mx-auto">
        <SectionHeader
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />

        {/* Projects Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </MotionContainer>
    </SectionContainer>
  );
}
