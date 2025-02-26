import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiJenkins,
  SiFigma,
  SiJest,
} from 'react-icons/si';

export const skillsByCategory = {
  frontend: [
    { name: 'React.js', icon: SiReact },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
    { name: 'HTML/CSS', icon: SiHtml5 },
  ],
  backend: [
    { name: 'Node.js', icon: SiNodedotjs },
    { name: 'Express.js', icon: SiExpress },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'PostgreSQL', icon: SiPostgresql },
  ],
  tools: [
    { name: 'Git', icon: SiGit },
    { name: 'Docker', icon: SiDocker },
    { name: 'CI/CD', icon: SiJenkins },
  ],
  other: [
    { name: 'UI/UX Design', icon: SiFigma },
    { name: 'Testing', icon: SiJest },
  ],
}; 