'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface KeyPoint {
  title: string;
  description: string;
}

export function About() {
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background to-background/95" />
      </div>

      <div className="container px-4 mx-auto relative">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={item} className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {t('about.title')}
            </h2>
            <p className="text-xl text-primary font-medium">
              {t('about.subtitle')}
            </p>
          </motion.div>

          {/* Description */}
          <motion.div variants={item} className="space-y-6 text-muted-foreground">
            <p>{t('about.description.part1')}</p>
            <p>{t('about.description.part2')}</p>
            <p>{t('about.description.part3')}</p>
          </motion.div>

          {/* Key Points */}
          <motion.div variants={item} className="mt-16">
            <h3 className="text-xl font-semibold mb-8 text-center">
              {t('about.keyPoints.title')}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {(t('about.keyPoints.points', { returnObjects: true }) as KeyPoint[]).map((point, index) => (
                <motion.div
                  key={index}
                  variants={item}
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
        </motion.div>
      </div>
    </section>
  );
} 