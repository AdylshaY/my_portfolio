import { ReactNode } from 'react';

export interface BlogSearchProps {
  initialPosts: BlogPost[];
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  directory: string;
  publishedDate: string;
  tags: string[];
}

export interface Project {
  title: string;
  description: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  complete: boolean;
}

export interface KeyPoint {
  title: string;
  description: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  period: string;
  description: string;
  technologies?: string[];
  logo?: string;
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

export interface BentoGridProps {
  title: string;
  items: KeyPoint[];
  className?: string;
}
