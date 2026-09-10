'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { SectionContainer } from './SectionContainer';
import { SectionHeader } from './SectionHeader';
import { MotionContainer } from './MotionContainer';
import { ReactNode, useRef, useState, useEffect } from 'react';
import { FiChevronRight, FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';

interface ActionButton {
  text: string;
  href: string;
  icon?: ReactNode;
}

interface CardGridProps<T> {
  id: string;
  title: string;
  subtitle: string;
  items: T[];
  renderCard: (item: T, index: number) => ReactNode;
  maxWidth?: 'max-w-4xl' | 'max-w-6xl' | 'max-w-7xl';
  gridCols?: {
    sm?: string;
    md?: string;
    lg?: string;
  };
  enableMobileScroll?: boolean;
  sortItems?: (items: T[]) => T[];
  actionButton?: ActionButton;
}

export function CardGrid<T>({
  id,
  title,
  subtitle,
  items,
  renderCard,
  maxWidth = 'max-w-6xl',
  gridCols = {
    sm: 'sm:grid-cols-2',
    md: 'md:grid-cols-2',
    lg: 'lg:grid-cols-3',
  },
  enableMobileScroll = false,
  sortItems,
  actionButton,
}: CardGridProps<T>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToNextCard = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const sortedItems = sortItems ? sortItems(items) : items;
      const cardWidth = container.scrollWidth / sortedItems.length;
      const nextIndex = Math.min(currentIndex + 1, sortedItems.length - 1);
      container.scrollTo({
        left: cardWidth * nextIndex,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !enableMobileScroll) return;

    const handleScroll = () => {
      // Hide scroll hint after user starts scrolling
      if (container.scrollLeft > 10) {
        setShowScrollHint(false);
      }

      // Calculate current card index based on scroll position
      const cardWidth = container.scrollWidth / sortedItems.length;
      const index = Math.round(container.scrollLeft / cardWidth);
      setCurrentIndex(index);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [enableMobileScroll, items?.length]);

  if (!items || items.length === 0) return null;

  const sortedItems = sortItems ? sortItems(items) : items;

  const gridClasses = `grid-cols-1 ${gridCols.sm || ''} ${gridCols.md || ''} ${
    gridCols.lg || ''
  }`;

  return (
    <SectionContainer id={id}>
      <MotionContainer className={`${maxWidth} mx-auto`}>
        <SectionHeader title={title} subtitle={subtitle} />

        {enableMobileScroll ? (
          <div className='relative md:static'>
            {/* Scroll container with gradient fade */}
            <div className='relative'>
              <div
                ref={scrollContainerRef}
                className='flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
              >
                {sortedItems.map((item, index) => (
                  <div
                    key={index}
                    className='min-w-[calc(100vw-2rem)] sm:min-w-[calc(50%-12px)] md:min-w-0 snap-center h-full'
                  >
                    {renderCard(item, index)}
                  </div>
                ))}
              </div>

              {/* Right edge gradient fade - only on mobile */}
              <div className='absolute top-0 right-0 bottom-6 w-16 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none md:hidden' />

              {/* Scroll hint indicator - only on mobile */}
              {showScrollHint && (
                <button
                  onClick={scrollToNextCard}
                  className='absolute top-1/2 right-4 -translate-y-1/2 md:hidden animate-bounce cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                  aria-label='Scroll to next card'
                >
                  <div className='bg-primary/90 text-primary-foreground rounded-full p-2 shadow-lg backdrop-blur-sm hover:bg-primary transition-colors'>
                    <FiChevronRight className='w-5 h-5' />
                  </div>
                </button>
              )}
            </div>

            {/* Scroll progress dots - only on mobile */}
            <div className='flex justify-center gap-2 mt-4 md:hidden'>
              {sortedItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const container = scrollContainerRef.current;
                    if (container) {
                      const cardWidth =
                        container.scrollWidth / sortedItems.length;
                      container.scrollTo({
                        left: cardWidth * index,
                        behavior: 'smooth',
                      });
                    }
                  }}
                  className={`transition-all duration-300 ${
                    currentIndex === index
                      ? 'w-8 h-2 bg-primary'
                      : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  } rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                  aria-label={`Go to item ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={`grid ${gridClasses} gap-6`}>
            {sortedItems.map((item, index) => (
              <div key={index}>{renderCard(item, index)}</div>
            ))}
          </div>
        )}

        {/* Action Button - Centered below cards */}
        {actionButton && (
          <div className='flex justify-center mt-12'>
            <Link
              href={actionButton.href}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 duration-300 shadow-lg hover:shadow-xl font-medium group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            >
              {actionButton.text}
              <span className='transition-transform group-hover:translate-x-1'>
                {actionButton.icon || <FiExternalLink className='w-5 h-5' />}
              </span>
            </Link>
          </div>
        )}
      </MotionContainer>
    </SectionContainer>
  );
}
