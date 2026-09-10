'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { m } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { SectionContainer } from './shared/SectionContainer';
import { SectionHeader } from './shared/SectionHeader';
import { MotionContainer, motionItem } from './shared/MotionContainer';
import { skillTiers } from '../data/skills';
import { useDictionary } from '../context/DictionaryContext';

const tierOrder = ['primary', 'secondary', 'supporting'] as const;
const VISIBLE_SKILLS = 8;

const tierStyles = {
  primary: {
    wrapper: 'bg-primary/5 border-primary/30 hover:border-primary/50',
    heading: 'text-2xl font-bold text-primary',
    pill: 'bg-primary/10 border-primary/20 text-foreground font-medium text-base',
    icon: 'w-5 h-5 text-primary',
  },
  secondary: {
    wrapper: 'bg-card/50 border-primary/10 hover:border-primary/30',
    heading: 'text-xl font-semibold text-foreground/90',
    pill: 'bg-white/5 border-border text-foreground/80 text-sm',
    icon: 'w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors',
  },
  supporting: {
    wrapper: 'bg-card/20 border-border/50 hover:border-primary/20',
    heading: 'text-lg font-medium text-muted-foreground',
    pill: 'bg-white/[0.03] border-border/50 text-muted-foreground text-sm',
    icon: 'w-4 h-4 text-muted-foreground/70',
  },
};

export const Skills = () => {
  const dict = useDictionary();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpanded = (tier: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(tier)) {
        next.delete(tier);
      } else {
        next.add(tier);
      }
      return next;
    });
  };

  return (
    <SectionContainer id='skills'>
      <MotionContainer className='max-w-5xl mx-auto'>
        <SectionHeader title={dict.skills.title} subtitle={dict.skills.subtitle} />

        <p className='text-center text-muted-foreground max-w-2xl mx-auto -mt-6 mb-10'>
          {dict.skills.intro}
        </p>

        <div className='space-y-6'>
          {tierOrder.map((tier) => {
            const styles = tierStyles[tier];
            const allSkills = skillTiers[tier];
            const hasMore = allSkills.length > VISIBLE_SKILLS;
            const isExpanded = expanded.has(tier);
            const visibleSkills =
              hasMore && !isExpanded
                ? allSkills.slice(0, VISIBLE_SKILLS)
                : allSkills;

            return (
              <m.div
                key={tier}
                variants={motionItem}
                className={`space-y-4 backdrop-blur-sm p-6 rounded-2xl border transition-colors ${styles.wrapper}`}
              >
                <h3 className={styles.heading}>
                  {dict.skills.tiers[tier as keyof typeof dict.skills.tiers]}
                </h3>
                <div className='flex flex-wrap gap-3'>
                  {visibleSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`group flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${styles.pill}`}
                    >
                      <skill.icon className={styles.icon} />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>

                {hasMore && (
                  <button
                    onClick={() => toggleExpanded(tier)}
                    className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/10 hover:bg-primary/20 hover:border-primary/30 text-xs font-semibold text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
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
              </m.div>
            );
          })}
        </div>
      </MotionContainer>
    </SectionContainer>
  );
};
