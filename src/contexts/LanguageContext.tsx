'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, getTranslation, getCurrentLanguage, isRTL } from '../lib/i18n';

interface LanguageContextType {
  currentLanguage: Language;
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [locale, setLocaleState] = useState<string>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLocale = localStorage.getItem('locale') || 'ar';
    setLocaleState(savedLocale);
    
    // Set document direction and language
    document.documentElement.lang = savedLocale;
    document.documentElement.dir = isRTL(savedLocale) ? 'rtl' : 'ltr';
    
    setMounted(true);
  }, []);

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    
    // Update document direction and language
    document.documentElement.lang = newLocale;
    document.documentElement.dir = isRTL(newLocale) ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return getTranslation(key, locale);
  };

  const currentLanguage = getCurrentLanguage(locale);
  const isRightToLeft = isRTL(locale);

  // Avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider 
      value={{
        currentLanguage,
        locale,
        setLocale,
        t,
        isRTL: isRightToLeft,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};