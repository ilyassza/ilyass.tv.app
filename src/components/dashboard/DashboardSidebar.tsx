'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { IconType } from 'react-icons';
import { DashboardSection } from '../../types';
import { FiLogOut, FiHome } from 'react-icons/fi';

interface SidebarItem {
  id: DashboardSection;
  label: string;
  icon: IconType;
  count?: number;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  items,
  activeSection,
  onSectionChange,
}) => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-primary-600 to-primary-500">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary-600 font-bold text-sm">A</span>
            </div>
            <span className="text-white font-display font-bold text-lg">
              لوحة التحكم
            </span>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.displayName?.[0] || user?.email?.[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.displayName || user?.email}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                مدير النظام
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {items.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSectionChange(item.id)}
              className={`w-full group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeSection === item.id
                  ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-r-2 border-primary-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon
                className={`mr-3 flex-shrink-0 h-5 w-5 ${
                  activeSection === item.id
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              <span className="flex-1 text-right">{item.label}</span>
              {item.count && item.count > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {item.count}
                </span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-2">
            {/* Back to Site */}
            <motion.a
              href="/"
              whileHover={{ scale: 1.02 }}
              className="w-full group flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <FiHome className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              <span className="flex-1 text-right">العودة للموقع</span>
            </motion.a>

            {/* Logout */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full group flex items-center px-3 py-2 text-sm font-medium text-red-700 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
            >
              <FiLogOut className="mr-3 h-5 w-5" />
              <span className="flex-1 text-right">تسجيل الخروج</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};