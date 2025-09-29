'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ContactMessage } from '../../types';
import { FiMessageSquare, FiMail } from 'react-icons/fi';

interface MessagesManagementProps {
  messages: ContactMessage[];
  onUpdate: () => void;
  onLog: (action: string, resource: string, details: string) => void;
}

export const MessagesManagement: React.FC<MessagesManagementProps> = ({
  messages,
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
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
            <FiMessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              إدارة الرسائل
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              رسائل الدعم والاستفسارات
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">لا توجد رسائل</p>
            </div>
          ) : (
            messages.slice(0, 10).map((message) => (
              <div key={message.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center">
                    <FiMail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{message.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{message.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {message.createdAt.toLocaleDateString('ar')}
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};