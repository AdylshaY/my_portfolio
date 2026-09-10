'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { m } from 'framer-motion';
import { SectionContainer } from './shared/SectionContainer';
import { SectionHeader } from './shared/SectionHeader';
import { MotionContainer, motionItem } from './shared/MotionContainer';
import { BentoGrid } from './shared/BentoGrid';
import { KeyPoint } from '../data/types';
import { useDictionary } from '../context/DictionaryContext';

export const About = () => {
  const dict = useDictionary();
  const keyPoints = Object.values(dict.about.keyPoints) as KeyPoint[];

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
          className='space-y-6 text-muted-foreground text-left'
        >
          <p>{dict.about.p1}</p>
          <p>{dict.about.p2}</p>
          <p>{dict.about.p3}</p>
        </m.div>

        {/* Key Points using BentoGrid component */}
        <BentoGrid title={dict.about.keyPointsTitle} items={keyPoints} />
      </MotionContainer>
    </SectionContainer>
  );
};
