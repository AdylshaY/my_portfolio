'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { motionItem } from './MotionContainer';
import { Project } from '../../data/types';
import { FaGithub } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiExternalLink } from 'react-icons/fi';
import { useDictionary } from '../../context/DictionaryContext';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const dict = useDictionary();
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const inDevelopmentText = dict.projects.inDevelopment;
  const noImageText = dict.projects.noImage;
  const viewOnGithubText = dict.projects.viewOnGithub;
  const showMoreText = dict.projects.showMore;
  const showLessText = dict.projects.showLess;

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [project.description]);

  const handleKeyboardNavigation = (
    e: React.KeyboardEvent<HTMLAnchorElement>
  ) => {
    if ((e.key === 'Enter' || e.key === ' ') && project.githubUrl) {
      e.preventDefault();
      window.open(project.githubUrl, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <m.div
      variants={motionItem}
      className='group relative bg-secondary/50 backdrop-blur-sm rounded-lg overflow-hidden flex flex-col h-full min-h-[480px]'
    >
      {/* Project Image or Placeholder */}
      <div className='relative h-48 overflow-hidden'>
        {/* Development Status Badge */}
        {project.complete === false && (
          <div className='absolute top-2 right-2 z-10'>
            <span className='px-2 py-1 text-xs font-semibold bg-yellow-500/90 text-white rounded-full shadow-sm backdrop-blur-sm flex items-center gap-1'>
              <span className='w-2 h-2 rounded-full bg-white animate-pulse' />
              {inDevelopmentText}
            </span>
          </div>
        )}
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
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
              {noImageText}
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
          <div className='mb-4'>
            <m.div
              initial={false}
              animate={{
                height: isExpanded ? contentHeight : 72,
              }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
              className='overflow-hidden relative'
            >
              <p
                ref={contentRef}
                className='text-muted-foreground text-justify'
              >
                {project.description}
              </p>
              {/* Gradient fade overlay when collapsed */}
              {!isExpanded && project.description.length > 150 && (
                <div className='absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-secondary/50 to-transparent pointer-events-none' />
              )}
            </m.div>
            {/* Reserve space for button to keep consistent card height */}
            <div className='h-8 mt-2'>
              {project.description.length > 150 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className='inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors'
                  aria-label={isExpanded ? showLessText : showMoreText}
                >
                  <span>{isExpanded ? showLessText : showMoreText}</span>
                  <m.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <FiChevronDown className='w-4 h-4' />
                  </m.span>
                </button>
              )}
            </div>
          </div>

          {/* Technologies */}
          <div className='flex flex-wrap gap-2 mb-4'>
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className='px-2 py-1 text-xs rounded-lg bg-primary/10 text-primary'
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-3 mt-auto w-full'>
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 duration-300'
              aria-label={`${dict.projects.viewProject}: ${project.title}`}
            >
              <FiExternalLink className='w-5 h-5' />
              <span>{dict.projects.viewProject}</span>
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              className={`flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all hover:scale-105 duration-300 ${
                project.liveUrl
                  ? 'border-2 border-primary text-primary hover:bg-primary/10'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
              aria-label={`${viewOnGithubText}: ${project.title}`}
              tabIndex={0}
              onKeyDown={handleKeyboardNavigation}
            >
              <FaGithub className='w-5 h-5' />
              <span>{viewOnGithubText}</span>
            </Link>
          )}
        </div>
      </div>
    </m.div>
  );
};
