'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useLanguage } from '../../contexts/LanguageContext';
import { AboutContent } from '../../types';
import { LoadingSpinner, LoadingSkeleton } from '../../components/LoadingSpinner';
import { 
  FiTarget, 
  FiUsers, 
  FiAward, 
  FiTrendingUp,
  FiHeart,
  FiShield,
  FiZap
} from 'react-icons/fi';

export default function AboutPage() {
  const { t, locale } = useLanguage();
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const aboutDoc = await getDoc(doc(db, 'content', 'about'));
      
      if (aboutDoc.exists()) {
        const data = aboutDoc.data();
        setContent({
          id: aboutDoc.id,
          ...data,
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as AboutContent);
      } else {
        // Set default content
        setContent(getDefaultContent());
      }
    } catch (error) {
      console.error('Error fetching about content:', error);
      setContent(getDefaultContent());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultContent = (): AboutContent => ({
    id: 'about',
    title: {
      ar: 'حول متجر التطبيقات',
      en: 'About App Store',
      fr: 'À propos du magasin d\'applications'
    },
    content: {
      ar: 'نحن منصة حديثة لتوزيع التطبيقات المحمولة مع التركيز على الجودة وتجربة المستخدم الممتازة. هدفنا هو توفير أفضل التطبيقات للمستخدمين العرب مع ضمان الأمان والسهولة في الاستخدام.',
      en: 'We are a modern platform for mobile app distribution focusing on quality and excellent user experience. Our goal is to provide the best applications for Arab users while ensuring security and ease of use.',
      fr: 'Nous sommes une plateforme moderne de distribution d\'applications mobiles axée sur la qualité et l\'excellence de l\'expérience utilisateur. Notre objectif est de fournir les meilleures applications aux utilisateurs arabes tout en garantissant la sécurité et la facilité d\'utilisation.'
    },
    images: [
      '/images/about/team.jpg',
      '/images/about/office.jpg',
      '/images/about/technology.jpg'
    ],
    isPublished: true,
    updatedAt: new Date(),
  });

  const features = [
    {
      icon: FiTarget,
      title: 'هدفنا',
      description: 'توفير أفضل التطبيقات للمستخدمين العرب',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: FiUsers,
      title: 'المجتمع',
      description: 'أكثر من 100,000 مستخدم نشط يثق بخدماتنا',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: FiAward,
      title: 'الجودة',
      description: 'جميع التطبيقات مراجعة ومختبرة بعناية',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      icon: FiShield,
      title: 'الأمان',
      description: 'حماية مضمونة من البرمجيات الضارة',
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      icon: FiZap,
      title: 'السرعة',
      description: 'تحميل سريع وتحديثات فورية',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: FiHeart,
      title: 'الشغف',
      description: 'فريق متحمس لتقديم أفضل تجربة',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20'
    }
  ];

  const stats = [
    { value: '125K+', label: 'تحميل', color: 'text-blue-600' },
    { value: '12+', label: 'تطبيق', color: 'text-green-600' },
    { value: '99.9%', label: 'وقت التشغيل', color: 'text-purple-600' },
    { value: '4.8/5', label: 'تقييم المستخدمين', color: 'text-yellow-600' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <div className="w-32 h-8 bg-gray-300 dark:bg-gray-700 rounded mx-auto mb-4"></div>
            <LoadingSkeleton lines={3} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="animate-pulse">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6">
              {content?.title[locale] || t('about.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {content?.content[locale] || t('about.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              ما يميزنا
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              نحن نؤمن بتقديم أفضل تجربة للمستخدمين من خلال التركيز على هذه القيم
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-8 rounded-2xl ${feature.bgColor} border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl`}
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              فريقنا المتميز
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              مجموعة من المطورين والمصممين المتحمسين لتطوير أفضل الحلول التقنية
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'أحمد محمد',
                role: 'مطور رئيسي',
                image: '/images/team/developer1.jpg',
                bio: 'خبرة 5 سنوات في تطوير التطبيقات'
              },
              {
                name: 'فاطمة علي',
                role: 'مصممة UX/UI',
                image: '/images/team/designer1.jpg',
                bio: 'متخصصة في تجربة المستخدم والتصميم'
              },
              {
                name: 'محمد حسن',
                role: 'مدير المشروع',
                image: '/images/team/manager1.jpg',
                bio: 'قائد فريق مع خبرة في إدارة المشاريع'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FiUsers className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              انضم إلى مجتمعنا اليوم
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              اكتشف أفضل التطبيقات وكن جزءًا من رحلتنا نحو التميز
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              ابدأ الاستكشاف
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}