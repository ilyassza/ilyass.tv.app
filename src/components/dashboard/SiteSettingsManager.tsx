'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SiteSettings } from '../../types';
import { FiSettings } from 'react-icons/fi';

interface SiteSettingsManagerProps {
  settings: SiteSettings | null;
  onUpdate: () => void;
  onLog: (action: string, resource: string, details: string) => void;
}

export const SiteSettingsManager: React.FC<SiteSettingsManagerProps> = ({
  settings,
  onUpdate,
  onLog
}) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
            <FiSettings className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              إعدادات الموقع
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              إدارة الإعدادات العامة للموقع
            </p>
          </div>
        </div>
        
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">قريباً - إعدادات الموقع</p>
        </div>
      </motion.div>
    </div>
  );
};