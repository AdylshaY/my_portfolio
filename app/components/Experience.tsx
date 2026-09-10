'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { WorkExperienceTimeline } from './shared/WorkExperienceTimeline';
import { jobs as jobsData } from '../data/jobs';
import { useDictionary } from '../context/DictionaryContext';

export function Experience() {
  const dict = useDictionary();

  const jobs = jobsData.map((job) => ({
    company: dict.about.jobs[job.key]?.title || '',
    position: dict.about.jobs[job.key]?.role || '',
    period: job.period,
    description: dict.about.jobs[job.key]?.desc || [],
    technologies: job.technologies,
  }));

  return (
    <WorkExperienceTimeline
      id='experience'
      title={dict.about.experienceTitle}
      subtitle={dict.about.experienceSubtitle}
      experiences={jobs}
    />
  );
}
