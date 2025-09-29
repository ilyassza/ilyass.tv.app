'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit,
  where,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { DashboardStats, App, ContactMessage, ActivityLog, SiteSettings, DashboardSection } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';
import { StatsCards } from '../../components/dashboard/StatsCards';
import { AnalyticsChart } from '../../components/dashboard/AnalyticsChart';
import { AppsManagement } from '../../components/dashboard/AppsManagement';
import { MessagesManagement } from '../../components/dashboard/MessagesManagement';
import { MaintenanceSettings } from '../../components/dashboard/MaintenanceSettings';
import { SiteSettingsManager } from '../../components/dashboard/SiteSettingsManager';
import { UserManagement } from '../../components/dashboard/UserManagement';
import { ActivityLogs } from '../../components/dashboard/ActivityLogs';
import { NotificationCenter } from '../../components/dashboard/NotificationCenter';
import { 
  FiHome, 
  FiUsers, 
  FiMessageSquare, 
  FiSettings,
  FiActivity,
  FiBell,
  FiPackage,
  FiTool
} from 'react-icons/fi';
import toast from 'react-hot-toast';

// Remove the local DashboardSection type since we're importing it

export default function DashboardPage() {
  const { user, isAdmin, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [apps, setApps] = useState<App[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/login');
      return;
    }
    
    if (isAdmin) {
      fetchDashboardData();
    }
  }, [user, isAdmin, loading, router]);

  const fetchDashboardData = async () => {
    try {
      await Promise.all([
        fetchStats(),
        fetchApps(),
        fetchMessages(),
        fetchActivityLogs(),
        fetchSiteSettings()
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('خطأ في تحميل بيانات لوحة التحكم');
    } finally {
      setDashboardLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Fetch apps for stats calculation
      const appsSnapshot = await getDocs(collection(db, 'apps'));
      const appsData = appsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as App));
      
      // Fetch messages count
      const messagesSnapshot = await getDocs(collection(db, 'messages'));
      const unreadMessages = messagesSnapshot.docs.filter(doc => !doc.data().isRead).length;
      
      const totalDownloads = appsData.reduce((sum, app) => sum + (app.downloads || 0), 0);
      const totalVisitors = Math.floor(totalDownloads * 0.3); // Estimate based on downloads
      
      // Generate mock chart data for the last 7 days
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toLocaleDateString('ar', { day: 'numeric', month: 'short' });
      });

      const chartDownloads = Array.from({ length: 7 }, () => 
        Math.floor(Math.random() * 1000) + 200
      );
      
      const chartVisitors = Array.from({ length: 7 }, () => 
        Math.floor(Math.random() * 500) + 100
      );

      setStats({
        totalDownloads,
        totalVisitors,
        totalMessages: messagesSnapshot.size,
        totalApps: appsData.length,
        recentDownloads: Math.floor(totalDownloads * 0.1),
        recentVisitors: Math.floor(totalVisitors * 0.15),
        recentMessages: unreadMessages,
        chartData: {
          labels: last7Days,
          downloads: chartDownloads,
          visitors: chartVisitors
        }
      });

      setUnreadCount(unreadMessages);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchApps = async () => {
    try {
      const appsQuery = query(collection(db, 'apps'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(appsQuery);
      const appsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
          lastUpdated: data.lastUpdated?.toDate ? data.lastUpdated.toDate() : new Date(),
        } as App;
      });
      
      setApps(appsData);
    } catch (error) {
      console.error('Error fetching apps:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const messagesQuery = query(
        collection(db, 'messages'), 
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const snapshot = await getDocs(messagesQuery);
      const messagesData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        } as ContactMessage;
      });
      
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchActivityLogs = async () => {
    try {
      const logsQuery = query(
        collection(db, 'activityLogs'), 
        orderBy('createdAt', 'desc'),
        limit(100)
      );
      const snapshot = await getDocs(logsQuery);
      const logsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        } as ActivityLog;
      });
      
      setActivityLogs(logsData);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
    }
  };

  const fetchSiteSettings = async () => {
    try {
      const settingsSnapshot = await getDocs(collection(db, 'siteSettings'));
      if (!settingsSnapshot.empty) {
        const settingsDoc = settingsSnapshot.docs[0];
        const data = settingsDoc.data();
        
        setSiteSettings({
          id: settingsDoc.id,
          ...data,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
          maintenanceStart: data.maintenanceStart?.toDate ? data.maintenanceStart.toDate() : undefined,
          maintenanceEnd: data.maintenanceEnd?.toDate ? data.maintenanceEnd.toDate() : undefined,
        } as SiteSettings);
      }
    } catch (error) {
      console.error('Error fetching site settings:', error);
    }
  };

  const logActivity = async (action: string, resource: string, details: string) => {
    try {
      await addDoc(collection(db, 'activityLogs'), {
        userId: user?.uid,
        userEmail: user?.email,
        action,
        resource,
        details,
        createdAt: serverTimestamp(),
      });
      
      // Refresh activity logs
      fetchActivityLogs();
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  const sidebarItems = [
    { id: 'overview' as DashboardSection, label: 'نظرة عامة', icon: FiHome },
    { id: 'apps' as DashboardSection, label: 'التطبيقات', icon: FiPackage, count: apps.length },
    { id: 'messages' as DashboardSection, label: 'الرسائل', icon: FiMessageSquare, count: unreadCount },
    { id: 'users' as DashboardSection, label: 'المستخدمون', icon: FiUsers },
    { id: 'maintenance' as DashboardSection, label: 'وضع الصيانة', icon: FiTool },
    { id: 'settings' as DashboardSection, label: 'إعدادات الموقع', icon: FiSettings },
    { id: 'logs' as DashboardSection, label: 'سجل الأنشطة', icon: FiActivity, count: activityLogs.length },
    { id: 'notifications' as DashboardSection, label: 'الإشعارات', icon: FiBell },
  ];

  if (loading || dashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <StatsCards stats={stats} />
            <AnalyticsChart data={stats?.chartData} />
          </div>
        );
      case 'apps':
        return (
          <AppsManagement 
            apps={apps} 
            onUpdate={fetchApps} 
            onLog={logActivity} 
          />
        );
      case 'messages':
        return (
          <MessagesManagement 
            messages={messages} 
            onUpdate={fetchMessages} 
            onLog={logActivity} 
          />
        );
      case 'users':
        return (
          <UserManagement onLog={logActivity} />
        );
      case 'maintenance':
        return (
          <MaintenanceSettings 
            settings={siteSettings} 
            onUpdate={fetchSiteSettings} 
            onLog={logActivity} 
          />
        );
      case 'settings':
        return (
          <SiteSettingsManager 
            settings={siteSettings} 
            onUpdate={fetchSiteSettings} 
            onLog={logActivity} 
          />
        );
      case 'logs':
        return (
          <ActivityLogs logs={activityLogs} />
        );
      case 'notifications':
        return (
          <NotificationCenter onLog={logActivity} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="flex">
        {/* Sidebar - Fixed the setActiveSection dispatch issue by wrapping in a callback */}
        <DashboardSidebar
          items={sidebarItems}
          activeSection={activeSection}
          onSectionChange={(section) => setActiveSection(section)}
        />

        {/* Main Content */}
        <div className="flex-1 lg:mr-64">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                {t('dashboard.welcome')}, {user?.displayName || user?.email}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                إدارة شاملة لمتجر التطبيقات
              </p>
            </motion.div>

            {/* Content */}
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
