'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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

export function Skills() {
  const { t } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const skillsByCategory = {
    frontend: [
      { name: 'React.js', icon: <SiReact className='w-8 h-8' /> },
      { name: 'Next.js', icon: <SiNextdotjs className='w-8 h-8' /> },
      { name: 'TypeScript', icon: <SiTypescript className='w-8 h-8' /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className='w-8 h-8' /> },
      { name: 'HTML/CSS', icon: <SiHtml5 className='w-8 h-8' /> },
    ],
    backend: [
      { name: 'Node.js', icon: <SiNodedotjs className='w-8 h-8' /> },
      { name: 'Express.js', icon: <SiExpress className='w-8 h-8' /> },
      { name: 'MongoDB', icon: <SiMongodb className='w-8 h-8' /> },
      { name: 'PostgreSQL', icon: <SiPostgresql className='w-8 h-8' /> },
    ],
    tools: [
      { name: 'Git', icon: <SiGit className='w-8 h-8' /> },
      { name: 'Docker', icon: <SiDocker className='w-8 h-8' /> },
      { name: 'CI/CD', icon: <SiJenkins className='w-8 h-8' /> },
    ],
    other: [
      { name: 'UI/UX Design', icon: <SiFigma className='w-8 h-8' /> },
      { name: 'Testing', icon: <SiJest className='w-8 h-8' /> },
    ],
  };

  return (
    <section id='skills' className='relative py-20 overflow-hidden'>
      <div className='absolute inset-0 bg-background'>
        <div className='absolute inset-0 bg-gradient-to-b from-background/95 via-background to-background/95' />
      </div>

      <div className='container px-4 mx-auto relative'>
        <motion.div
          variants={container}
          initial='hidden'
          whileInView='show'
          viewport={{ once: true }}
          className='max-w-4xl mx-auto'
        >
          {/* Header */}
          <motion.div variants={item} className='text-center mb-12'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-4'>
              {t('skills.title')}
            </h2>
            <p className='text-xl text-primary font-medium'>
              {t('skills.subtitle')}
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className='grid md:grid-cols-2 gap-6'>
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <motion.div
                key={category}
                variants={item}
                className='p-6 rounded-lg bg-secondary/50 backdrop-blur-sm'
              >
                <h3 className='text-xl font-semibold text-primary mb-6'>
                  {t(`skills.categories.${category}`)}
                </h3>
                <div className='grid grid-cols-3 gap-6'>
                  {skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      whileHover={{ scale: 1.05 }}
                      className='flex flex-col items-center gap-2 text-center'
                    >
                      <div className='text-primary transition-colors duration-200 hover:text-primary/80'>
                        {skill.icon}
                      </div>
                      <span className='text-sm font-medium'>{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
