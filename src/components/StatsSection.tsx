'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { formatNumber, formatDate } from '../lib/i18n';
import { FiDownload, FiPackage, FiClock, FiTrendingUp } from 'react-icons/fi';

interface StatsSectionProps {
  totalDownloads: number;
  totalApps: number;
  lastUpdated: Date;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  totalDownloads,
  totalApps,
  lastUpdated,
}) => {
  const { t, locale } = useLanguage();

  const stats = [
    {
      icon: FiDownload,
      value: formatNumber(totalDownloads, locale),
      label: t('stats.totalDownloads'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600',
    },
    {
      icon: FiPackage,
      value: formatNumber(totalApps, locale),
      label: t('home.featuredApps'),
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600',
    },
    {
      icon: FiClock,
      value: formatDate(lastUpdated, locale),
      label: t('home.lastUpdated'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600',
    },
    {
      icon: FiTrendingUp,
      value: '4.8★',
      label: t('home.rating'),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      iconColor: 'text-yellow-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative overflow-hidden rounded-2xl p-6 ${stat.bgColor} border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl`}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-800/50"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  
                  {/* Animated Number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`text-3xl font-bold ${stat.color}`}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="text-gray-600 dark:text-gray-400 font-medium text-sm"
                  >
                    {stat.label}
                  </motion.p>
                </div>

                {/* Progress Bar for Downloads */}
                {index === 0 && (
                  <motion.div
                    className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min((totalDownloads / 150000) * 100, 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 1, duration: 1 }}
                    />
                  </motion.div>
                )}
              </div>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl px-8 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>آخر تحديث: {formatDate(lastUpdated, locale)}</span>
            </div>
            
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>حالة الخدمة: متاحة</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};