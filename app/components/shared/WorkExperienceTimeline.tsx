'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { WorkExperience } from '@/app/data/types';
import { motionItem, MotionContainer } from './MotionContainer';
import { SectionContainer } from './SectionContainer';
import { SectionHeader } from './SectionHeader';
import { useDictionary } from '../../context/DictionaryContext';

interface WorkExperienceTimelineProps {
  id: string;
  title: string;
  subtitle?: string;
  experiences: WorkExperience[];
}

const VISIBLE_BULLETS = 4;

export const WorkExperienceTimeline = ({
  id,
  title,
  subtitle,
  experiences,
}: WorkExperienceTimelineProps) => {
  const dict = useDictionary();
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const headingId = `${id}-heading`;

  const toggleExpanded = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <SectionContainer id={id}>
      <MotionContainer className='max-w-4xl mx-auto'>
        <SectionHeader title={title} subtitle={subtitle} id={headingId} />

        <div className='relative' role='list' aria-labelledby={headingId}>
          {/* Timeline center line */}
          <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20' />

          {experiences.map((experience, index) => {
            const hasMore = experience.description.length > VISIBLE_BULLETS;
            const isExpanded = expanded.has(index);
            const visibleDescription =
              hasMore && !isExpanded
                ? experience.description.slice(0, VISIBLE_BULLETS)
                : experience.description;

            return (
              <m.div
                key={index}
                variants={motionItem}
                className={`relative mb-12 ${index % 2 === 0
                    ? 'md:pr-10 md:text-left md:ml-auto md:mr-1/2'
                    : 'md:pl-10 md:text-left md:mr-auto md:ml-1/2'
                  } md:w-[calc(50%-2.5rem)] z-10`}
                role='listitem'
              >
                {/* Timeline dot */}
                <div
                  className={`hidden md:block absolute transform z-20 ${index % 2 === 0 ? '-left-2' : '-right-2'
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
                    <ul className='text-muted-foreground mb-3 space-y-1.5 list-disc list-outside pl-5 marker:text-primary/50'>
                      {visibleDescription.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    {hasMore && (
                      <button
                        onClick={() => toggleExpanded(index)}
                        className='inline-flex items-center gap-1.5 ml-5 mb-3 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/10 hover:bg-primary/20 hover:border-primary/30 text-xs font-semibold text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                        aria-label={
                          isExpanded ? dict.about.showLess : dict.about.showMore
                        }
                      >
                        <span>
                          {isExpanded ? dict.about.showLess : dict.about.showMore}
                        </span>
                        <m.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <FiChevronDown className='w-3.5 h-3.5' />
                        </m.span>
                      </button>
                    )}

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
              </m.div>
            );
          })}
        </div>
      </MotionContainer>
    </SectionContainer>
  );
};
