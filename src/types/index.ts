import { Timestamp } from 'firebase/firestore';

export interface App {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  version: string;
  downloadUrl: string;
  imageUrl: string;
  iconUrl: string;
  category: string;
  downloads: number;
  rating: number;
  size: string;
  lastUpdated: Timestamp | Date;
  screenshots: string[];
  features: string[];
  requirements: string[];
  isActive: boolean;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'admin' | 'user';
  createdAt: Timestamp | Date;
  lastLogin: Timestamp | Date;
}

export type DashboardSection = 
  | 'overview' 
  | 'apps' 
  | 'messages' 
  | 'users' 
  | 'settings'
  | 'maintenance'
  | 'logs'
  | 'notifications';

export interface SiteSettings {
  id: string;
  siteName: string;
  siteDescription: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  theme: 'light' | 'dark';
  maintenanceMode: boolean;
  maintenanceStart?: Timestamp | Date;
  maintenanceEnd?: Timestamp | Date;
  maintenanceMessage: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  seoMeta: {
    keywords: string[];
    author: string;
    ogImage: string;
  };
  updatedAt: Timestamp | Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  createdAt: Timestamp | Date;
  reply?: {
    message: string;
    sentAt: Timestamp | Date;
    sentBy: string;
  };
}

export interface Analytics {
  id: string;
  date: string;
  pageViews: number;
  downloads: number;
  uniqueVisitors: number;
  appDownloads: { [appId: string]: number };
  createdAt: Timestamp | Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  userId: string;
  createdAt: Timestamp | Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Timestamp | Date;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  flag: string;
}

export interface Translations {
  [key: string]: {
    [locale: string]: string;
  };
}

export interface AboutContent {
  id: string;
  title: { [locale: string]: string };
  content: { [locale: string]: string };
  images: string[];
  isPublished: boolean;
  updatedAt: Timestamp | Date;
}

export interface MaintenanceSettings {
  isEnabled: boolean;
  startTime: Timestamp | Date;
  endTime: Timestamp | Date;
  message: { [locale: string]: string };
  backgroundImage?: string;
  showCountdown: boolean;
  showProgressBar: boolean;
}

export interface ThemeSettings {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  customCSS?: string;
}

export interface DashboardStats {
  totalDownloads: number;
  totalVisitors: number;
  totalMessages: number;
  totalApps: number;
  recentDownloads: number;
  recentVisitors: number;
  recentMessages: number;
  chartData: {
    labels: string[];
    downloads: number[];
    visitors: number[];
  };
}
