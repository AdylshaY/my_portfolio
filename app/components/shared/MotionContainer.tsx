'use client';

import { motion } from 'framer-motion';
import { MotionContainerProps } from '@/app/data/types';

export function MotionContainer({
  children,
  className = '',
  delay = 0,
}: MotionContainerProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const motionItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
