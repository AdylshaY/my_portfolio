'use client';

import { ReactNode } from 'react';

interface SectionContainerProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionContainer({
  id,
  children,
  className = '',
}: SectionContainerProps) {
  return (
    <section id={id} className={`relative py-20 overflow-hidden ${className}`}>
      <div className='absolute inset-0 bg-background'>
        <div className='absolute inset-0 bg-gradient-to-b from-background/95 via-background to-background/95' />
      </div>
      <div className='container px-4 mx-auto relative'>{children}</div>
    </section>
  );
}
