'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import '../i18n/client';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-background">
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
        
        {/* Colored gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-background to-indigo-900/30" />
        
        {/* Animated blobs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/30 rounded-full filter blur-[128px] opacity-50 animate-blob" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/30 rounded-full filter blur-[128px] opacity-50 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-32 left-1/2 w-[500px] h-[500px] bg-purple-600/30 rounded-full filter blur-[128px] opacity-50 animate-blob animation-delay-4000" />
        </motion.div>
      </div>

      <div className="container px-4 mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left space-y-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {t('hero.greeting')}{' '}
                <span className="text-primary">
                  Adylsha Yumayev
                </span>
              </h1>
              <p className="mt-4 text-2xl font-medium text-foreground/80">
                {t('hero.role')}
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition">
                {t('hero.cta.projects')}
              </button>
              <button className="px-6 py-3 rounded-full border border-input bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition">
                {t('hero.cta.contact')}
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/20 rounded-full animate-pulse" />
              <Image
                src="/hero-image.png"
                alt="Hero Image"
                fill
                className="object-cover rounded-full p-8"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-muted-foreground"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
} 