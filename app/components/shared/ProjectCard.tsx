'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motionItem } from './MotionContainer';
import { Project } from '../../data/types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation();

  const handleKeyboardNavigation = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.open(project.githubUrl, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <motion.div
      variants={motionItem}
      className='group relative bg-secondary/50 backdrop-blur-sm rounded-lg overflow-hidden flex flex-col'
    >
      {/* Project Image or Placeholder */}
      <div className='relative h-48 overflow-hidden'>
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className='object-cover transition-transform duration-300 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent' />
          </>
        ) : (
          <div className='absolute inset-0 bg-primary/5 flex items-center justify-center'>
            {/* Animated background blobs */}
            <div className='absolute inset-0 overflow-hidden'>
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 rounded-full filter blur-3xl animate-blob' />
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-600/20 rounded-full filter blur-3xl animate-blob2' />
            </div>
            {/* Placeholder text */}
            <span className='text-muted-foreground/50 text-sm font-medium relative'>
              {t('projects.noImage')}
            </span>
            <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent' />
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className='p-6 flex flex-col flex-1'>
        <div className='flex-1'>
          <h3 className='text-xl font-semibold mb-2 text-justify'>
            {project.title}
          </h3>
          <p className='text-muted-foreground mb-4 text-justify line-clamp-3'>
            {project.description}
          </p>

          {/* Technologies */}
          <div className='flex flex-wrap gap-2 mb-4'>
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className='px-2 py-1 text-xs rounded-full bg-primary/10 text-primary'
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* GitHub Button */}
        <Link
          href={project.githubUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'
          aria-label={`${t('projects.viewOnGithub')}: ${project.title}`}
          tabIndex={0}
          onKeyDown={handleKeyboardNavigation}
        >
          <svg
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
              clipRule='evenodd'
            />
          </svg>
          <span>{t('projects.viewOnGithub')}</span>
        </Link>
      </div>
    </motion.div>
  );
} 