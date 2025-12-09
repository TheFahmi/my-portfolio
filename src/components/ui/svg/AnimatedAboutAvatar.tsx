"use client";

import { motion } from 'framer-motion';
import siteConfig from '@/config/siteConfig';

const AnimatedAboutAvatar = ({ className = "" }: { className?: string }) => {
  const { personalInfo, hero } = siteConfig;

  return (
    <div className={`relative flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden ${className}`}>

      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-br from-slate-500/10 to-gray-500/10 dark:from-slate-500/5 dark:to-gray-500/5" />
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-500/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-slate-500/10 rounded-full blur-2xl" />

      <div className="z-10 w-full flex flex-col items-center text-center space-y-5">

        {/* Avatar / Profile Initials Circle */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 rounded-full bg-gradient-to-tr from-slate-700 to-slate-900 p-1 shadow-lg"
        >
          <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center border-4 border-transparent">
            <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-300 dark:to-white">
              {personalInfo.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
        </motion.div>

        {/* Name & Role */}
        <div className="space-y-1">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-slate-900 dark:text-white"
          >
            {personalInfo.name}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm font-medium text-slate-600 dark:text-slate-400"
          >
            {personalInfo.role}
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4 }}
          className="w-16 h-1 bg-slate-100 dark:bg-slate-800 rounded-full"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 w-full">
          {hero.quickStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="flex flex-col items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors"
            >
              <span className="text-sm font-bold text-slate-900 dark:text-white">{stat.number}</span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Available Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Available for work</span>
        </motion.div>

      </div>
    </div>
  );
};

export default AnimatedAboutAvatar;
