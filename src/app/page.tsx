'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, orderBy, query, limit, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import { App } from '@/types';
import { AppCard } from '@/components/AppCard';
import { StatsSection } from '@/components/StatsSection';
import { HeroSection } from '@/components/HeroSection';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';

export default function HomePage() {
  const { t } = useLanguage();
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDownloads: 0,
    totalApps: 0,
    lastUpdated: Timestamp.fromDate(new Date()),
  });

  useEffect(() => {
    fetchApps();
    fetchStats();
  }, []);

  const fetchApps = async () => {
    try {
      const appsQuery = query(
        collection(db, 'apps'),
        orderBy('downloads', 'desc'),
        limit(6)
      );
      
      const querySnapshot = await getDocs(appsQuery);
      const appsData: App[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        appsData.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt || Timestamp.fromDate(new Date()),
          updatedAt: data.updatedAt || Timestamp.fromDate(new Date()),
          lastUpdated: data.lastUpdated || Timestamp.fromDate(new Date()),
        } as App);
      });
      
      setApps(appsData);
    } catch (error) {
      console.error('Error fetching apps:', error);
      toast.error('خطأ في تحميل التطبيقات');
      // Add sample data for demo
      setApps(getSampleApps());
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // This would normally fetch from analytics collection
      // For demo, we'll calculate from apps
      const totalDownloads = apps.reduce((sum, app) => sum + app.downloads, 0);
      setStats({
        totalDownloads,
        totalApps: apps.length,
        lastUpdated: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set sample stats
      setStats({
        totalDownloads: 125000,
        totalApps: 12,
        lastUpdated: Timestamp.fromDate(new Date()),
      });
    }
  };

  const getSampleApps = (): App[] => [
    {
      id: '1',
      name: 'ILYASS TV',
      description: 'تطبيق مشاهدة القنوات التلفزيونية المباشرة مع جودة عالية وواجهة سهلة الاستخدام',
      shortDescription: 'مشاهدة القنوات المباشرة',
      version: '2.1.0',
      downloadUrl: 'https://example.com/download/ilyass-tv.apk',
      imageUrl: '/images/apps/ilyass-tv.jpg',
      iconUrl: '/images/apps/ilyass-tv-icon.png',
      category: 'Entertainment',
      downloads: 85000,
      rating: 4.5,
      size: '25 MB',
      lastUpdated: Timestamp.fromDate(new Date('2024-01-15')),
      screenshots: [],
      features: ['مشاهدة مباشرة', 'جودة عالية', 'واجهة سهلة'],
      requirements: ['Android 5.0+'],
      isActive: true,
      createdAt: Timestamp.fromDate(new Date('2024-01-01')),
      updatedAt: Timestamp.fromDate(new Date('2024-01-15')),
    },
    {
      id: '2',
      name: 'Video Player Pro',
      description: 'مشغل فيديو متقدم يدعم جميع صيغ الفيديو مع ميزات متطورة',
      shortDescription: 'مشغل فيديو قوي',
      version: '1.8.5',
      downloadUrl: 'https://example.com/download/video-player.apk',
      imageUrl: '/images/apps/video-player.jpg',
      iconUrl: '/images/apps/video-player-icon.png',
      category: 'Media',
      downloads: 42000,
      rating: 4.2,
      size: '18 MB',
      lastUpdated: Timestamp.fromDate(new Date('2024-01-10')),
      screenshots: [],
      features: ['دعم جميع الصيغ', 'تحكم متقدم', 'ترجمة تلقائية'],
      requirements: ['Android 4.4+'],
      isActive: true,
      createdAt: Timestamp.fromDate(new Date('2023-12-01')),
      updatedAt: Timestamp.fromDate(new Date('2024-01-10')),
    },
  ];

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection 
        totalDownloads={stats.totalDownloads}
        totalApps={stats.totalApps}
        lastUpdated={stats.lastUpdated.toDate()}
      />

      {/* Featured Apps Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              {t('home.featuredApps')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('home.subtitle')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {apps.map((app, index) => (
              <AppCard key={app.id} app={app} index={index} />
            ))}
          </motion.div>

          {apps.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('common.loading')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                جاري تحميل التطبيقات...
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              ابحث عن تطبيقات أخرى
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              استكشف المزيد من التطبيقات المفيدة والمميزة
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              تصفح جميع التطبيقات
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}