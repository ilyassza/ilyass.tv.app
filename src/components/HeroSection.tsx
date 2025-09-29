'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { FiDownload, FiStar, FiUsers, FiTrendingUp } from 'react-icons/fi';

export const HeroSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const floatingVariants = {
    floating: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        variants={floatingVariants}
        animate="floating"
        className="absolute top-20 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20"
      />
      <motion.div
        variants={floatingVariants}
        animate="floating"
        style={{ animationDelay: '1s' }}
        className="absolute top-40 right-16 w-16 h-16 bg-secondary-200 dark:bg-secondary-800 rounded-full opacity-20"
      />
      <motion.div
        variants={floatingVariants}
        animate="floating"
        style={{ animationDelay: '2s' }}
        className="absolute bottom-32 left-20 w-24 h-24 bg-primary-300 dark:bg-primary-700 rounded-full opacity-20"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 dark:text-white leading-tight">
              <span className="gradient-text">{t('home.title')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('home.subtitle')}
            </p>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
          >
            {[
              { icon: FiDownload, label: 'تحميل سريع', color: 'text-blue-500' },
              { icon: FiStar, label: 'جودة عالية', color: 'text-yellow-500' },
              { icon: FiUsers, label: 'مستخدمين سعداء', color: 'text-green-500' },
              { icon: FiTrendingUp, label: 'تحديثات مستمرة', color: 'text-purple-500' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20"
              >
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {feature.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2 text-lg px-8 py-4 ripple-container relative overflow-hidden"
              onClick={() => document.getElementById('featured-apps')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <FiDownload className="w-5 h-5" />
              <span>استكشف التطبيقات</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4"
            >
              <FiStar className="w-5 h-5" />
              <span>معرفة المزيد</span>
            </motion.button>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto pt-8"
          >
            {[
              { value: '125K+', label: 'تحميل', color: 'text-blue-600' },
              { value: '12+', label: 'تطبيق', color: 'text-green-600' },
              { value: '4.8★', label: 'تقييم', color: 'text-yellow-600' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-gray-600 dark:text-gray-400"
        >
          <span className="text-sm font-medium">تصفح التطبيقات</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};