'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionContainer } from './shared/SectionContainer';
import { SectionHeader } from './shared/SectionHeader';
import { MotionContainer, motionItem } from './shared/MotionContainer';
import { skillsByCategory } from '../data/skills';

export function Skills() {
  const { t } = useTranslation();

  return (
    <SectionContainer id="skills">
      <MotionContainer className="max-w-4xl mx-auto">
        <SectionHeader
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
        />

        {/* Skills Grid */}
        <div className='grid md:grid-cols-2 gap-6'>
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <motion.div
              key={category}
              variants={motionItem}
              className='p-6 rounded-lg bg-secondary/50 backdrop-blur-sm'
            >
              <h3 className='text-xl font-semibold text-primary mb-6'>
                {t(`skills.categories.${category}`)}
              </h3>
              <div className='grid grid-cols-3 gap-6'>
                {skills.map((skill, skillIndex) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skillIndex}
                      whileHover={{ scale: 1.05 }}
                      className='flex flex-col items-center gap-2 text-center'
                    >
                      <div className='text-primary transition-colors duration-200 hover:text-primary/80'>
                        <Icon className='w-8 h-8' />
                      </div>
                      <span className='text-sm font-medium'>{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </MotionContainer>
    </SectionContainer>
  );
}
