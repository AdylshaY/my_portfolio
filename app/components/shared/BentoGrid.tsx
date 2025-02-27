'use client';

import { motion } from 'framer-motion';
import { BentoGridProps } from '@/app/data/types';
import { motionItem } from './MotionContainer';

export const BentoGrid = ({ title, items, className = '' }: BentoGridProps) => {
  const sizes = [
    'md:col-span-3 md:row-span-1',
    'md:col-span-3 md:row-span-1',
    'md:col-span-2 md:row-span-1',
    'md:col-span-4 md:row-span-1',
    'md:col-span-3 md:row-span-1',
    'md:col-span-3 md:row-span-1',
  ];

  const variants = [
    'bg-secondary/50',
    'bg-primary/10',
    'bg-indigo-500/10',
    'bg-purple-500/10',
    'bg-fuchsia-500/10',
    'bg-primary/10',
  ];

  return (
    <motion.div variants={motionItem} className={`mt-16 ${className}`}>
      <h3
        className='text-xl font-semibold mb-8 text-center'
        id='bento-grid-heading'
      >
        {title}
      </h3>

      <div
        className='grid grid-cols-1 md:grid-cols-6 gap-4'
        role='list'
        aria-labelledby='bento-grid-heading'
      >
        {items.map((item, index) => {
          const sizeClass = sizes[index % sizes.length];
          const variantClass = variants[index % variants.length];

          return (
            <motion.div
              key={index}
              variants={motionItem}
              className={`${sizeClass} p-6 rounded-xl backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 ${variantClass} flex flex-col`}
              role='listitem'
              whileHover={{
                y: -5,
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                transition: { duration: 0.3 },
              }}
            >
              <h4 className='text-lg font-medium mb-3 text-primary flex items-center'>
                <span className='w-8 h-8 rounded-full bg-primary/20 text-primary mr-2 flex items-center justify-center'>
                  {index + 1}
                </span>
                {item.title}
              </h4>
              <p className='text-muted-foreground'>{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
