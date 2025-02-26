'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionContainer } from './shared/SectionContainer';
import { SectionHeader } from './shared/SectionHeader';
import { MotionContainer, motionItem } from './shared/MotionContainer';

interface KeyPoint {
  title: string;
  description: string;
}

export function About() {
  const { t } = useTranslation();

  return (
    <SectionContainer id="about">
      <MotionContainer className="max-w-4xl mx-auto">
        <SectionHeader
          title={t('about.title')}
          subtitle={t('about.subtitle')}
        />

        {/* Description */}
        <motion.div variants={motionItem} className="space-y-6 text-muted-foreground">
          <p>{t('about.description.part1')}</p>
          <p>{t('about.description.part2')}</p>
          <p>{t('about.description.part3')}</p>
        </motion.div>

        {/* Key Points */}
        <motion.div variants={motionItem} className="mt-16">
          <h3 className="text-xl font-semibold mb-8 text-center">
            {t('about.keyPoints.title')}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {(t('about.keyPoints.points', { returnObjects: true }) as KeyPoint[]).map((point, index) => (
              <motion.div
                key={index}
                variants={motionItem}
                className="p-6 rounded-lg bg-secondary/50 backdrop-blur-sm"
              >
                <h4 className="text-lg font-medium mb-2 text-primary">
                  {point.title}
                </h4>
                <p className="text-muted-foreground">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </MotionContainer>
    </SectionContainer>
  );
} 