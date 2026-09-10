'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { m } from 'framer-motion';
import { SectionContainer } from './shared/SectionContainer';
import { SectionHeader } from './shared/SectionHeader';
import { MotionContainer, motionItem } from './shared/MotionContainer';
import { BentoGrid } from './shared/BentoGrid';
import { WorkExperienceTimeline } from './shared/WorkExperienceTimeline';
import { Certificates } from './Certificates';
import { KeyPoint } from '../data/types';
import { useDictionary } from '../context/DictionaryContext';
import { jobs as jobsData } from '../data/jobs';

export const About = () => {
  const dict = useDictionary();
  const keyPoints = Object.values(dict.about.keyPoints) as KeyPoint[];

  const jobs = jobsData.map((job) => ({
    company: dict.about.jobs[job.key]?.title || '',
    position: dict.about.jobs[job.key]?.role || '',
    period: job.period,
    description: dict.about.jobs[job.key]?.desc || [],
    technologies: job.technologies,
  }));

  return (
    <SectionContainer id='about'>
      <MotionContainer className='max-w-4xl mx-auto'>
        <SectionHeader
          title={dict.about.title}
          subtitle={dict.about.subtitle}
        />

        {/* Description */}
        <m.div
          variants={motionItem}
          className='space-y-6 text-muted-foreground text-justify'
        >
          <p>{dict.about.p1}</p>
          <p>{dict.about.p2}</p>
          <p>{dict.about.p3}</p>
        </m.div>

        {/* Work Experience Timeline */}
        <WorkExperienceTimeline
          title={dict.about.experienceTitle}
          subtitle={dict.about.experienceSubtitle}
          experiences={jobs}
        />

        {/* Certificates Section - current technical direction, kept close to experience */}
        <div className='mt-16'>
          <Certificates />
        </div>

        {/* Key Points using BentoGrid component */}
        <BentoGrid title={dict.about.keyPointsTitle} items={keyPoints} />
      </MotionContainer>
    </SectionContainer>
  );
};
