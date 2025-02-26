'use client';

import { motion } from 'framer-motion';

export function HeroBackground() {
  return (
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
        <div className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] bg-primary/30 rounded-full filter blur-[128px] opacity-50 animate-blob" />
        <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] bg-indigo-600/30 rounded-full filter blur-[128px] opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[400px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/30 rounded-full filter blur-[128px] opacity-50 animate-blob animation-delay-4000" />
      </motion.div>
    </div>
  );
} 