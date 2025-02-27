'use client';

import { SectionContainerProps } from '@/app/data/types';

export const SectionContainer = ({
  id,
  children,
  className = '',
}: SectionContainerProps) => {
  return (
    <section 
      id={id} 
      className={`relative py-20 overflow-hidden ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className='absolute inset-0 bg-background'>
        <div className='absolute inset-0 bg-gradient-to-b from-background/95 via-background to-background/95' />
      </div>
      <div className='container px-4 mx-auto relative'>{children}</div>
    </section>
  );
}
