'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, Target, TrendingUp } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="text-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        {/* Hero Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full border border-accent/30 mb-8"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-accent">AI-Powered Ad Generation</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl font-bold bg-gradient-to-r from-text-primary via-blue-400 to-accent bg-clip-text text-transparent mb-6"
        >
          RemixAi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Transform one product image into multiple high-converting ad variants. 
          Generate, optimize, and auto-post to social media in minutes.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-surface/80 rounded-full border border-white/10">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI-Powered</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-surface/80 rounded-full border border-white/10">
            <Target className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">Multi-Platform</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-surface/80 rounded-full border border-white/10">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Auto-Post</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5x</div>
            <div className="text-sm text-text-secondary">Faster Creation</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">94%</div>
            <div className="text-sm text-text-secondary">Time Saved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">3.2x</div>
            <div className="text-sm text-text-secondary">Better CTR</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
