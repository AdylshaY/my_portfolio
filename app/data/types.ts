import { ReactNode } from 'react';

export interface Project {
  title: string;
  description: string;
  image?: string;
  githubUrl: string;
  technologies: string[];
}

export interface KeyPoint {
  title: string;
  description: string;
}

export interface SectionContainerProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export interface MotionContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}
