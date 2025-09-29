'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { SiteSettings, MaintenanceSettings as MaintenanceSettingsType } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  FiTool, 
  FiClock, 
  FiToggleLeft, 
  FiToggleRight,
  FiSave,
  FiAlertTriangle,
  FiCalendar
} from 'react-icons/fi';
import toast from 'react-hot-toast';

interface MaintenanceSettingsProps {
  settings: SiteSettings | null;
  onUpdate: () => void;
  onLog: (action: string, resource: string, details: string) => void;
}

export const MaintenanceSettings: React.FC<MaintenanceSettingsProps> = ({
  settings,
  onUpdate,
  onLog
}) => {
  const { t, locale } = useLanguage();
  
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceSettingsType>({
    isEnabled: false,
    startTime: new Date(),
    endTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
    message: {
      ar: 'الموقع قيد الصيانة، سنعود قريباً',
      en: 'Site under maintenance, we\'ll be back soon',
      fr: 'Site en maintenance, nous reviendrons bientôt'
    },
    showCountdown: true,
    showProgressBar: true,
    backgroundImage: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (settings) {
      setMaintenanceData({
        isEnabled: settings.maintenanceMode || false,
        startTime: settings.maintenanceStart || new Date(),
        endTime: settings.maintenanceEnd || new Date(Date.now() + 3 * 60 * 60 * 1000),
        message: {
          ar: settings.maintenanceMessage || 'الموقع قيد الصيانة، سنعود قريباً',
          en: 'Site under maintenance, we\'ll be back soon',
          fr: 'Site en maintenance, nous reviendrons bientôt'
        },
        showCountdown: true,
        showProgressBar: true,
        backgroundImage: ''
      });
    }
  }, [settings]);

  const handleToggleMaintenance = async () => {
    setIsLoading(true);
    
    try {
      const newStatus = !maintenanceData.isEnabled;
      
      const settingsData = {
        maintenanceMode: newStatus,
        maintenanceStart: newStatus ? new Date() : null,
        maintenanceEnd: newStatus ? maintenanceData.endTime : null,
        maintenanceMessage: maintenanceData.message[locale],
        updatedAt: new Date(),
      };

      if (settings?.id) {
        await updateDoc(doc(db, 'siteSettings', settings.id), settingsData);
      } else {
        await setDoc(doc(db, 'siteSettings', 'main'), {
          ...settingsData,
          siteName: 'App Store Platform',
          siteDescription: 'Modern app store platform',
          logoUrl: '',
          faviconUrl: '',
          primaryColor: '#3b82f6',
          secondaryColor: '#6b7280',
          theme: 'light' as const,
          socialLinks: {},
          seoMeta: {
            keywords: [],
            author: '',
            ogImage: ''
          }
        });
      }

      setMaintenanceData(prev => ({ ...prev, isEnabled: newStatus }));
      onUpdate();
      
      toast.success(newStatus ? 'تم تفعيل وضع الصيانة' : 'تم إلغاء وضع الصيانة');
      
      await onLog(
        newStatus ? 'enable_maintenance' : 'disable_maintenance',
        'maintenance',
        `وضع الصيانة ${newStatus ? 'مفعل' : 'معطل'}`
      );
      
    } catch (error) {
      console.error('Error toggling maintenance:', error);
      toast.error('حدث خطأ أثناء تغيير حالة الصيانة');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    try {
      const settingsData = {
        maintenanceMode: maintenanceData.isEnabled,
        maintenanceStart: maintenanceData.startTime,
        maintenanceEnd: maintenanceData.endTime,
        maintenanceMessage: maintenanceData.message[locale],
        updatedAt: new Date(),
      };

      if (settings?.id) {
        await updateDoc(doc(db, 'siteSettings', settings.id), settingsData);
      } else {
        await setDoc(doc(db, 'siteSettings', 'main'), {
          ...settingsData,
          siteName: 'App Store Platform',
          siteDescription: 'Modern app store platform',
          logoUrl: '',
          faviconUrl: '',
          primaryColor: '#3b82f6',
          secondaryColor: '#6b7280',
          theme: 'light' as const,
          socialLinks: {},
          seoMeta: {
            keywords: [],
            author: '',
            ogImage: ''
          }
        });
      }

      onUpdate();
      toast.success('تم حفظ إعدادات الصيانة');
      
      await onLog(
        'update_maintenance_settings',
        'maintenance',
        'تم تحديث إعدادات وضع الصيانة'
      );
      
    } catch (error) {
      console.error('Error saving maintenance settings:', error);
      toast.error('حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('ar', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDurationString = () => {
    const duration = maintenanceData.endTime.getTime() - maintenanceData.startTime.getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} ساعة و ${minutes} دقيقة`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
              <FiTool className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                إدارة وضع الصيانة
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                تحكم في إعدادات الصيانة وتحديد الأوقات
              </p>
            </div>
          </div>

          {/* Main Toggle */}
          <div className="flex items-center space-x-3">
            <span className={`text-sm font-medium ${
              maintenanceData.isEnabled ? 'text-orange-600' : 'text-gray-600'
            }`}>
              {maintenanceData.isEnabled ? 'مفعل' : 'معطل'}
            </span>
            <button
              onClick={handleToggleMaintenance}
              disabled={isLoading}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                maintenanceData.isEnabled 
                  ? 'bg-orange-600' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  maintenanceData.isEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Status Alert */}
        {maintenanceData.isEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-4"
          >
            <div className="flex items-center space-x-3">
              <FiAlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <div>
                <p className="font-medium text-orange-800 dark:text-orange-200">
                  تحذير: وضع الصيانة مفعل حالياً
                </p>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  الزوار لن يتمكنوا من الوصول للموقع حتى انتهاء فترة الصيانة
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Time Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center space-x-3 mb-6">
          <FiClock className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            إعدادات الوقت
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              وقت البداية
            </label>
            <input
              type="datetime-local"
              value={maintenanceData.startTime.toISOString().slice(0, 16)}
              onChange={(e) => setMaintenanceData(prev => ({
                ...prev,
                startTime: new Date(e.target.value)
              }))}
              className="input-field"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              وقت الانتهاء
            </label>
            <input
              type="datetime-local"
              value={maintenanceData.endTime.toISOString().slice(0, 16)}
              onChange={(e) => setMaintenanceData(prev => ({
                ...prev,
                endTime: new Date(e.target.value)
              }))}
              className="input-field"
            />
          </div>
        </div>

        {/* Duration Info */}
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <div className="flex items-center space-x-3">
            <FiCalendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-800 dark:text-blue-200">
                مدة الصيانة: {getDurationString()}
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                من {formatDateTime(maintenanceData.startTime)} إلى {formatDateTime(maintenanceData.endTime)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Message Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          رسالة الصيانة
        </h3>
        
        <div className="space-y-4">
          {Object.entries(maintenanceData.message).map(([lang, message]) => (
            <div key={lang}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {lang === 'ar' ? 'العربية' : lang === 'en' ? 'English' : 'Français'}
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMaintenanceData(prev => ({
                  ...prev,
                  message: { ...prev.message, [lang]: e.target.value }
                }))}
                className="input-field resize-none"
                placeholder={`أدخل رسالة الصيانة باللغة ${lang === 'ar' ? 'العربية' : lang === 'en' ? 'الإنجليزية' : 'الفرنسية'}`}
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-end"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveSettings}
          disabled={isLoading}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl'
          } text-white`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>جاري الحفظ...</span>
            </>
          ) : (
            <>
              <FiSave className="w-5 h-5" />
              <span>حفظ الإعدادات</span>
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};