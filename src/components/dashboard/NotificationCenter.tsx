'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiBell } from 'react-icons/fi';

interface NotificationCenterProps {
  onLog: (action: string, resource: string, details: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ onLog }) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
            <FiBell className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              مركز الإشعارات
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              إدارة وإرسال الإشعارات
            </p>
          </div>
        </div>
        
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">قريباً - مركز الإشعارات</p>
        </div>
      </motion.div>
    </div>
  );
};