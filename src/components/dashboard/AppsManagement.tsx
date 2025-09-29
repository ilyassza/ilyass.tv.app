'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { App } from '../../types';
import { FiPackage, FiPlus } from 'react-icons/fi';

interface AppsManagementProps {
  apps: App[];
  onUpdate: () => void;
  onLog: (action: string, resource: string, details: string) => void;
}

export const AppsManagement: React.FC<AppsManagementProps> = ({
  apps,
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
              <FiPackage className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                إدارة التطبيقات
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                إضافة وتعديل وحذف التطبيقات المتاحة
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            <span>إضافة تطبيق</span>
          </motion.button>
        </div>

        <div className="space-y-4">
          {apps.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">لا توجد تطبيقات متاحة</p>
            </div>
          ) : (
            apps.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                    <FiPackage className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{app.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">الإصدار {app.version}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {app.downloads.toLocaleString()} تحميل
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};