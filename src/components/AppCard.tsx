'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';
import { App } from '../types';
import { formatNumber, formatDate } from '../lib/i18n';
import { 
  FiDownload, 
  FiStar, 
  FiCalendar, 
  FiPackage,
  FiExternalLink,
  FiHeart
} from 'react-icons/fi';
import toast from 'react-hot-toast';

interface AppCardProps {
  app: App;
  index: number;
}

export const AppCard: React.FC<AppCardProps> = ({ app, index }) => {
  const { t, locale } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);
  const [downloadCount, setDownloadCount] = useState(app.downloads);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isDownloading) return;
    
    setIsDownloading(true);
    
    try {
      // Create ripple effect
      const button = e.currentTarget as HTMLButtonElement;
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);

      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update download count
      setDownloadCount(prev => prev + 1);
      
      // Open download link
      window.open(app.downloadUrl, '_blank');
      
      toast.success(`تم بدء تحميل ${app.name}!`, {
        icon: '⬇️',
      });
      
    } catch (error) {
      console.error('Download error:', error);
      toast.error('حدث خطأ أثناء التحميل');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'تم إلغاء الإعجاب' : 'تم الإعجاب بالتطبيق!', {
      icon: isLiked ? '💔' : '❤️',
    });
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent dark:from-primary-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Card Content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            {/* App Icon */}
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-800 dark:to-primary-700 flex items-center justify-center"
            >
              {app.iconUrl ? (
                <Image
                  src={app.iconUrl}
                  alt={app.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiPackage className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              )}
            </motion.div>

            {/* App Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-1 truncate">
                {app.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {t('home.version')} {app.version}
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center space-x-1">
                  <FiPackage className="w-3 h-3" />
                  <span>{app.size}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <FiCalendar className="w-3 h-3" />
                  <span>{formatDate(app.lastUpdated.toDate(), locale)}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`p-2 rounded-full transition-all duration-200 ${
              isLiked 
                ? 'bg-red-100 dark:bg-red-900/20 text-red-500' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-red-500'
            }`}
          >
            <FiHeart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
          {app.shortDescription}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {/* Rating */}
            <div className="flex items-center space-x-1">
              <FiStar className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {app.rating.toFixed(1)}
              </span>
            </div>

            {/* Downloads */}
            <div className="flex items-center space-x-1">
              <FiDownload className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {formatNumber(downloadCount, locale)}
              </span>
            </div>
          </div>

          {/* Category Badge */}
          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
            {app.category}
          </span>
        </div>

        {/* Download Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownload}
          disabled={isDownloading}
          className={`relative w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ripple-container overflow-hidden ${
            isDownloading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-lg hover:shadow-xl'
          } text-white`}
        >
          {isDownloading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>جاري التحميل...</span>
            </>
          ) : (
            <>
              <FiDownload className="w-5 h-5" />
              <span>{t('home.download')}</span>
              <FiExternalLink className="w-4 h-4 opacity-60" />
            </>
          )}
        </motion.button>

        {/* Progress Bar (shows during download) */}
        {isDownloading && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden"
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
            />
          </motion.div>
        )}
      </div>

      {/* Hover Effect Border */}
      <motion.div
        className="absolute inset-0 border-2 border-primary-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />

      {/* Featured Badge */}
      {app.downloads > 50000 && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
          مميز
        </div>
      )}
    </motion.div>
  );
};