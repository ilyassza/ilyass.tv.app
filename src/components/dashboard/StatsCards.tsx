'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DashboardStats } from '../../types';
import { formatNumber } from '../../lib/i18n';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  FiDownload, 
  FiUsers, 
  FiMessageSquare, 
  FiPackage,
  FiTrendingUp,
  FiTrendingDown,
  FiMinus
} from 'react-icons/fi';

interface StatsCardsProps {
  stats: DashboardStats | null;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const { locale } = useLanguage();

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
              <div className="w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="w-20 h-8 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'إجمالي التحميلات',
      value: formatNumber(stats.totalDownloads, locale),
      recent: stats.recentDownloads,
      icon: FiDownload,
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-800/40',
    },
    {
      title: 'إجمالي الزوار',
      value: formatNumber(stats.totalVisitors, locale),
      recent: stats.recentVisitors,
      icon: FiUsers,
      color: 'green',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
      iconBg: 'bg-green-100 dark:bg-green-800/40',
    },
    {
      title: 'الرسائل',
      value: formatNumber(stats.totalMessages, locale),
      recent: stats.recentMessages,
      icon: FiMessageSquare,
      color: 'purple',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-100 dark:bg-purple-800/40',
    },
    {
      title: 'التطبيقات',
      value: formatNumber(stats.totalApps, locale),
      recent: 0,
      icon: FiPackage,
      color: 'orange',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400',
      iconBg: 'bg-orange-100 dark:bg-orange-800/40',
    },
  ];

  const getTrendIcon = (recent: number, total: number) => {
    const percentage = (recent / total) * 100;
    if (percentage > 10) return FiTrendingUp;
    if (percentage < 5) return FiTrendingDown;
    return FiMinus;
  };

  const getTrendColor = (recent: number, total: number) => {
    const percentage = (recent / total) * 100;
    if (percentage > 10) return 'text-green-600 dark:text-green-400';
    if (percentage < 5) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {cards.map((card, index) => {
        const TrendIcon = getTrendIcon(card.recent, parseInt(card.value.replace(/,/g, '')));
        const trendColor = getTrendColor(card.recent, parseInt(card.value.replace(/,/g, '')));

        return (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02, 
              y: -4,
              transition: { duration: 0.2 }
            }}
            className={`${card.bgColor} rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center`}>
                <card.icon className={`w-6 h-6 ${card.textColor}`} />
              </div>
              
              {/* Trend Indicator */}
              <div className={`flex items-center space-x-1 ${trendColor}`}>
                <TrendIcon className="w-4 h-4" />
                <span className="text-xs font-medium">
                  {card.recent > 0 ? `+${formatNumber(card.recent, locale)}` : '0'}
                </span>
              </div>
            </div>

            {/* Value */}
            <div className="mb-2">
              <motion.h3
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                className={`text-3xl font-bold ${card.textColor}`}
              >
                {card.value}
              </motion.h3>
            </div>

            {/* Title */}
            <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">
              {card.title}
            </p>

            {/* Progress Bar for Downloads */}
            {index === 0 && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((stats.totalDownloads / 150000) * 100, 100)}%` }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className={`h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600`}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  من 150,000 هدف
                </p>
              </div>
            )}

            {/* Recent Activity Indicator */}
            {card.recent > 0 && (
              <div className="mt-3 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  نشاط حديث
                </span>
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};