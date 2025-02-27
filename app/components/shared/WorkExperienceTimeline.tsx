'use client';

import { motion } from 'framer-motion';
import { WorkExperience } from '@/app/data/types';
import { motionItem } from './MotionContainer';

interface WorkExperienceTimelineProps {
  title: string;
  subtitle?: string;
  experiences: WorkExperience[];
  className?: string;
}

export const WorkExperienceTimeline = ({
  title,
  subtitle,
  experiences,
  className = '',
}: WorkExperienceTimelineProps) => {
  return (
    <motion.div variants={motionItem} className={`mt-16 ${className}`}>
      <div className='text-center mb-12'>
        <h3
          className='text-3xl font-bold tracking-tight sm:text-4xl mb-4'
          id='work-experience-heading'
        >
          {title}
        </h3>
        {subtitle && (
          <p className='text-xl text-primary font-medium'>{subtitle}</p>
        )}
      </div>

      <div
        className='relative'
        role='list'
        aria-labelledby='work-experience-heading'
      >
        {/* Timeline center line */}
        <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20' />

        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            variants={motionItem}
            className={`relative mb-12 ${
              index % 2 === 0
                ? 'md:pr-10 md:text-left md:ml-auto md:mr-1/2'
                : 'md:pl-10 md:text-left md:mr-auto md:ml-1/2'
            } md:w-[calc(50%-2.5rem)] z-10`}
            role='listitem'
          >
            <div
              className={`absolute transform z-20 ${
                index % 2 === 0 ? '-left-2' : '-right-2'
              }`}
            >
              <div className='w-4 h-4 rounded-full bg-primary' />
            </div>
            {/* Content card */}
            <div className='bg-secondary/50 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300'>
              <div className='flex flex-col md:items-start'>
                <div className='flex items-center justify-between w-full mb-2'>
                  <h4 className='text-xl font-semibold text-primary'>
                    {experience.position}
                  </h4>
                  <span className='text-sm text-muted-foreground'>
                    {experience.period}
                  </span>
                </div>
                <h5 className='text-lg font-medium mb-4'>
                  {experience.company}
                </h5>
                <p className='text-muted-foreground mb-4'>
                  {experience.description}
                </p>

                {experience.technologies && (
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className='px-2 py-1 text-xs rounded-full bg-primary/10 text-primary'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
