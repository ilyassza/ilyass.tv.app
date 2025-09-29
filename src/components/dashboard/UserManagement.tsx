'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';

interface UserManagementProps {
  onLog: (action: string, resource: string, details: string) => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ onLog }) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
            <FiUsers className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              إدارة المستخدمين
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              إضافة وإدارة المستخدمين والمسؤولين
            </p>
          </div>
        </div>
        
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">قريباً - إدارة المستخدمين</p>
        </div>
      </motion.div>
    </div>
  );
};