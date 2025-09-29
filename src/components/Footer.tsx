'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiYoutube,
  FiHeart,
  FiMail,
  FiPhone,
  FiMapPin
} from 'react-icons/fi';

export const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const socialLinks = [
    { icon: FiFacebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: FiTwitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: FiInstagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: FiYoutube, href: '#', label: 'YouTube', color: 'hover:text-red-600' },
  ];

  const quickLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-display font-bold text-xl">
                {process.env.NEXT_PUBLIC_APP_NAME || 'App Store'}
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t('home.subtitle')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className={`p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-white">
              {t('nav.home')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-white">
              {t('nav.contact')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <FiMail className="w-5 h-5 text-primary-500" />
                <span>support@appstore.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FiPhone className="w-5 h-5 text-primary-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FiMapPin className="w-5 h-5 text-primary-500" />
                <span>123 Tech Street, Digital City</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-white">
              {t('footer.followUs')}
            </h3>
            <p className="text-gray-300 text-sm">
              {isRTL ? 'احصل على آخر التحديثات والأخبار' : 'Get the latest updates and news'}
            </p>
            <div className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder={isRTL ? 'البريد الإلكتروني' : 'Enter your email'}
                  className="flex-1 px-4 py-2 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-r-lg hover:from-primary-700 hover:to-primary-600 transition-all duration-200 font-medium">
                  {isRTL ? 'اشترك' : 'Subscribe'}
                </button>
              </div>
              <p className="text-xs text-gray-400">
                {isRTL ? 'لن نشارك بريدك الإلكتروني مع أحد' : 'We never share your email with anyone'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-gray-300">
              <span>© {currentYear}</span>
              <span className="font-semibold text-white">
                {process.env.NEXT_PUBLIC_APP_NAME || 'App Store'}
              </span>
              <span>•</span>
              <span>{t('footer.copyright')}</span>
            </div>

            {/* Made with love */}
            <div className="flex items-center space-x-2 text-gray-300">
              <span>{isRTL ? 'صُنع بـ' : 'Made with'}</span>
              <FiHeart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>{isRTL ? 'في المغرب' : 'in Morocco'}</span>
            </div>

            {/* Version */}
            <div className="text-sm text-gray-400">
              v{process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40"
        aria-label="Scroll to top"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
};