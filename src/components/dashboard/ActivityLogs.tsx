'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ActivityLog } from '../../types';
import { FiActivity, FiClock } from 'react-icons/fi';

interface ActivityLogsProps {
  logs: ActivityLog[];
}

export const ActivityLogs: React.FC<ActivityLogsProps> = ({ logs }) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center">
            <FiActivity className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              سجل الأنشطة
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              تتبع جميع العمليات والتغييرات
            </p>
          </div>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {logs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">لا توجد أنشطة مسجلة</p>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <FiClock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {log.userEmail}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {log.createdAt.toLocaleString('ar')}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {log.details}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};