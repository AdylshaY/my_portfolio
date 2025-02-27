'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionContainer } from './shared/SectionContainer';
import { SectionHeader } from './shared/SectionHeader';
import { MotionContainer, motionItem } from './shared/MotionContainer';
import { BentoGrid } from './shared/BentoGrid';
import { KeyPoint, WorkExperience } from '../data/types';
import { WorkExperienceTimeline } from './shared/WorkExperienceTimeline';

export const About = () => {
  const { t } = useTranslation();

  return (
    <SectionContainer id='about'>
      <MotionContainer className='max-w-4xl mx-auto'>
        <SectionHeader
          title={t('about.title')}
          subtitle={t('about.subtitle')}
        />

        {/* Description */}
        <motion.div
          variants={motionItem}
          className='space-y-6 text-muted-foreground'
        >
          <p>{t('about.description.part1')}</p>
          <p>{t('about.description.part2')}</p>
          <p>{t('about.description.part3')}</p>
        </motion.div>

        {/* Key Points using BentoGrid component with i18n */}
        <BentoGrid
          title={t('about.keyPoints.title')}
          items={
            t('about.keyPoints.points', { returnObjects: true }) as KeyPoint[]
          }
        />

        {/* Work Experience Timeline */}
        <WorkExperienceTimeline
          title={t('about.workExperience.title')}
          subtitle={t('about.workExperience.subtitle')}
          experiences={
            t('about.workExperience.experiences', {
              returnObjects: true,
            }) as WorkExperience[]
          }
        />
      </MotionContainer>
    </SectionContainer>
  );
};
