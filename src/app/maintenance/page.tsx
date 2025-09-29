'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useLanguage } from '../../contexts/LanguageContext';
import { SiteSettings } from '../../types';
import { 
  FiTool, 
  FiClock, 
  FiRefreshCw,
  FiHeart,
  FiStar
} from 'react-icons/fi';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function MaintenancePage() {
  const { t, locale } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [progress, setProgress] = useState(0);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaintenanceSettings();
  }, []);

  useEffect(() => {
    if (settings?.maintenanceEnd) {
      const timer = setInterval(() => {
        calculateTimeLeft();
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [settings]);

  const fetchMaintenanceSettings = async () => {
    try {
      const settingsSnapshot = await getDoc(doc(db, 'siteSettings', 'main'));
      if (settingsSnapshot.exists()) {
        const data = settingsSnapshot.data();
        setSettings({
          ...data,
          maintenanceStart: data.maintenanceStart?.toDate?.() || new Date(),
          maintenanceEnd: data.maintenanceEnd?.toDate?.() || new Date(),
        } as SiteSettings);
      }
    } catch (error) {
      console.error('Error fetching maintenance settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTimeLeft = () => {
    if (!settings?.maintenanceEnd) return;

    const now = new Date().getTime();
    const endTime = settings.maintenanceEnd.getTime();
    const startTime = settings.maintenanceStart ? settings.maintenanceStart.getTime() : now;
    const totalDuration = endTime - startTime;
    const timeRemaining = endTime - now;

    if (timeRemaining > 0) {
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      // Calculate progress (0-100%)
      const progressPercentage = ((totalDuration - timeRemaining) / totalDuration) * 100;
      setProgress(Math.min(100, Math.max(0, progressPercentage)));
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setProgress(100);
      // Maintenance finished, redirect to home
      window.location.href = '/';
    }
  };

  const getMaintenanceMessage = () => {
    if (settings?.maintenanceMessage) {
      return settings.maintenanceMessage;
    }
    return t('maintenance.subtitle');
  };

  const floatingVariants = {
    floating: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center maintenance-bg">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen maintenance-bg flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            variants={floatingVariants}
            animate="floating"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
            className={`absolute w-${4 + Math.floor(Math.random() * 8)} h-${4 + Math.floor(Math.random() * 8)} bg-white/10 rounded-full`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Icon */}
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex justify-center"
          >
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <FiTool className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-6xl font-display font-bold"
            >
              {t('maintenance.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              {getMaintenanceMessage()}
            </motion.p>
          </div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {[
              { value: timeLeft.days, label: t('maintenance.days') },
              { value: timeLeft.hours, label: t('maintenance.hours') },
              { value: timeLeft.minutes, label: t('maintenance.minutes') },
              { value: timeLeft.seconds, label: t('maintenance.seconds') },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="countdown-digit"
                animate={{ scale: item.value !== timeLeft.seconds ? 1 : [1, 1.05, 1] }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-3xl md:text-4xl font-bold font-mono">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-white/80 mt-1">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/80">
                {t('maintenance.timeLeft')}
              </span>
              <span className="text-sm text-white/80">
                {progress.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
              <motion.div
                className="bg-gradient-to-r from-white to-white/80 h-3 rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <FiRefreshCw className="w-4 h-4" />
                <span className="text-sm">تحديث تلقائي</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiClock className="w-4 h-4" />
                <span className="text-sm">مؤقت مباشر</span>
              </div>
            </div>

            <p className="text-white/70 text-sm max-w-lg mx-auto">
              نعمل حالياً على تحسين الموقع لتوفير تجربة أفضل لكم. نعتذر عن أي إزعاج قد يسببه هذا التوقف المؤقت.
            </p>
          </motion.div>

          {/* Social Links or Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex items-center justify-center space-x-4"
          >
            <div className="text-white/60 text-sm">
              تابعونا للحصول على التحديثات
            </div>
          </motion.div>

          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="pt-8 border-t border-white/20"
          >
            <div className="flex items-center justify-center space-x-2 text-white/80">
              <span>شكراً لصبركم</span>
              <FiHeart className="w-4 h-4 text-red-400 animate-pulse" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            className="absolute"
          >
            <FiStar className="w-4 h-4 text-white/40" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}