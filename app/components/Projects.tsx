'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Project {
  title: string;
  description: string;
  image?: string;
  githubUrl: string;
  technologies: string[];
}

export function Projects() {
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Sample project data - you can replace this with your own projects
  const projects: Project[] = [
    {
      title: 'Sample Project',
      description:
        'This is a sample project description. Replace this with your actual project details.',
      githubUrl: 'https://github.com/yourusername/project',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      title: 'Sample Project',
      description:
        'This is a sample project description. Replace this with your actual project details.',
      githubUrl: 'https://github.com/yourusername/project',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      title: 'Sample Project',
      description:
        'This is a sample project description. Replace this with your actual project details.',
      githubUrl: 'https://github.com/yourusername/project',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    },
  ];

  // State for random positions
  const [randomPositions, setRandomPositions] = useState<Array<{
    blob1: { x: number; y: number };
    blob2: { x: number; y: number };
  }>>([]);

  // Function to generate random position values
  const getRandomPosition = () => {
    const randomX = Math.floor(Math.random() * 100) - 50; // -50 to 50
    const randomY = Math.floor(Math.random() * 100) - 50; // -50 to 50
    return { x: randomX, y: randomY };
  };

  // Generate random positions on client-side only
  useEffect(() => {
    const positions = projects.map(() => ({
      blob1: getRandomPosition(),
      blob2: getRandomPosition(),
    }));
    setRandomPositions(positions);
  }, []);

  return (
    <section id='projects' className='relative py-20 overflow-hidden'>
      <div className='absolute inset-0 bg-background'>
        <div className='absolute inset-0 bg-gradient-to-b from-background/95 via-background to-background/95' />
      </div>

      <div className='container px-4 mx-auto relative'>
        <motion.div
          variants={container}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='max-w-6xl mx-auto'
        >
          {/* Header */}
          <motion.div variants={item} className='text-center mb-12'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-4'>
              {t('projects.title')}
            </h2>
            <p className='text-xl text-primary font-medium'>
              {t('projects.subtitle')}
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={item}
                className='group relative bg-secondary/50 backdrop-blur-sm rounded-lg overflow-hidden'
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
                        <div
                          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full filter blur-2xl animate-blob'
                          style={
                            randomPositions[index]
                              ? {
                                  '--random-x': `${randomPositions[index].blob1.x}px`,
                                  '--random-y': `${randomPositions[index].blob1.y}px`,
                                } as React.CSSProperties
                              : {}
                          }
                        />
                        <div
                          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-600/10 rounded-full filter blur-2xl animate-blob animation-delay-2000'
                          style={
                            randomPositions[index]
                              ? {
                                  '--random-x': `${randomPositions[index].blob2.x}px`,
                                  '--random-y': `${randomPositions[index].blob2.y}px`,
                                } as React.CSSProperties
                              : {}
                          }
                        />
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
                <div className='p-6'>
                  <h3 className='text-xl font-semibold mb-2'>
                    {project.title}
                  </h3>
                  <p className='text-muted-foreground mb-4'>
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

                  {/* GitHub Button */}
                  <Link
                    href={project.githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'
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
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
