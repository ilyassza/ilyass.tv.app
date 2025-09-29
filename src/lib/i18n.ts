import { Language, Translations } from '@/types';

export const languages: Language[] = [
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    flag: '🇸🇦'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇺🇸'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr',
    flag: '🇫🇷'
  }
];

export const translations: Translations = {
  // Navigation
  'nav.home': {
    ar: 'الرئيسية',
    en: 'Home',
    fr: 'Accueil'
  },
  'nav.about': {
    ar: 'حولنا',
    en: 'About',
    fr: 'À propos'
  },
  'nav.contact': {
    ar: 'اتصل بنا',
    en: 'Contact',
    fr: 'Contact'
  },
  'nav.dashboard': {
    ar: 'لوحة التحكم',
    en: 'Dashboard',
    fr: 'Tableau de bord'
  },
  'nav.login': {
    ar: 'تسجيل الدخول',
    en: 'Login',
    fr: 'Connexion'
  },
  'nav.logout': {
    ar: 'تسجيل الخروج',
    en: 'Logout',
    fr: 'Déconnexion'
  },

  // Home Page
  'home.title': {
    ar: 'متجر التطبيقات',
    en: 'App Store',
    fr: 'Magasin d\'applications'
  },
  'home.subtitle': {
    ar: 'اكتشف وحمّل أفضل التطبيقات',
    en: 'Discover and download the best apps',
    fr: 'Découvrez et téléchargez les meilleures applications'
  },
  'home.featuredApps': {
    ar: 'التطبيقات المميزة',
    en: 'Featured Apps',
    fr: 'Applications en vedette'
  },
  'home.download': {
    ar: 'تحميل',
    en: 'Download',
    fr: 'Télécharger'
  },
  'home.downloads': {
    ar: 'التحميلات',
    en: 'Downloads',
    fr: 'Téléchargements'
  },
  'home.version': {
    ar: 'الإصدار',
    en: 'Version',
    fr: 'Version'
  },
  'home.size': {
    ar: 'الحجم',
    en: 'Size',
    fr: 'Taille'
  },
  'home.rating': {
    ar: 'التقييم',
    en: 'Rating',
    fr: 'Évaluation'
  },
  'home.lastUpdated': {
    ar: 'آخر تحديث',
    en: 'Last Updated',
    fr: 'Dernière mise à jour'
  },

  // About Page
  'about.title': {
    ar: 'حول الموقع',
    en: 'About Us',
    fr: 'À propos de nous'
  },
  'about.description': {
    ar: 'منصة حديثة لتوزيع التطبيقات مع أحدث التقنيات',
    en: 'A modern platform for app distribution with cutting-edge technology',
    fr: 'Une plateforme moderne de distribution d\'applications avec une technologie de pointe'
  },

  // Contact Page
  'contact.title': {
    ar: 'اتصل بنا',
    en: 'Contact Us',
    fr: 'Contactez-nous'
  },
  'contact.subtitle': {
    ar: 'نحن هنا لمساعدتك',
    en: 'We\'re here to help',
    fr: 'Nous sommes là pour vous aider'
  },
  'contact.name': {
    ar: 'الاسم',
    en: 'Name',
    fr: 'Nom'
  },
  'contact.email': {
    ar: 'البريد الإلكتروني',
    en: 'Email',
    fr: 'E-mail'
  },
  'contact.message': {
    ar: 'الرسالة',
    en: 'Message',
    fr: 'Message'
  },
  'contact.send': {
    ar: 'إرسال',
    en: 'Send',
    fr: 'Envoyer'
  },
  'contact.sending': {
    ar: 'جاري الإرسال...',
    en: 'Sending...',
    fr: 'Envoi en cours...'
  },
  'contact.success': {
    ar: 'تم إرسال الرسالة بنجاح!',
    en: 'Message sent successfully!',
    fr: 'Message envoyé avec succès!'
  },
  'contact.error': {
    ar: 'حدث خطأ أثناء الإرسال',
    en: 'Error sending message',
    fr: 'Erreur lors de l\'envoi'
  },

  // Login Page
  'login.title': {
    ar: 'تسجيل الدخول',
    en: 'Login',
    fr: 'Connexion'
  },
  'login.email': {
    ar: 'البريد الإلكتروني',
    en: 'Email',
    fr: 'E-mail'
  },
  'login.password': {
    ar: 'كلمة المرور',
    en: 'Password',
    fr: 'Mot de passe'
  },
  'login.submit': {
    ar: 'دخول',
    en: 'Sign In',
    fr: 'Se connecter'
  },
  'login.loading': {
    ar: 'جاري تسجيل الدخول...',
    en: 'Signing in...',
    fr: 'Connexion en cours...'
  },
  'login.error': {
    ar: 'خطأ في تسجيل الدخول',
    en: 'Login error',
    fr: 'Erreur de connexion'
  },

  // Dashboard
  'dashboard.title': {
    ar: 'لوحة التحكم',
    en: 'Dashboard',
    fr: 'Tableau de bord'
  },
  'dashboard.welcome': {
    ar: 'مرحباً بك',
    en: 'Welcome',
    fr: 'Bienvenue'
  },
  'dashboard.stats': {
    ar: 'الإحصائيات',
    en: 'Statistics',
    fr: 'Statistiques'
  },
  'dashboard.apps': {
    ar: 'التطبيقات',
    en: 'Apps',
    fr: 'Applications'
  },
  'dashboard.users': {
    ar: 'المستخدمون',
    en: 'Users',
    fr: 'Utilisateurs'
  },
  'dashboard.messages': {
    ar: 'الرسائل',
    en: 'Messages',
    fr: 'Messages'
  },
  'dashboard.settings': {
    ar: 'الإعدادات',
    en: 'Settings',
    fr: 'Paramètres'
  },
  'dashboard.maintenance': {
    ar: 'وضع الصيانة',
    en: 'Maintenance Mode',
    fr: 'Mode maintenance'
  },
  'dashboard.analytics': {
    ar: 'التحليلات',
    en: 'Analytics',
    fr: 'Analyses'
  },
  'dashboard.logs': {
    ar: 'السجلات',
    en: 'Logs',
    fr: 'Journaux'
  },

  // Maintenance
  'maintenance.title': {
    ar: 'الموقع قيد الصيانة',
    en: 'Site Under Maintenance',
    fr: 'Site en maintenance'
  },
  'maintenance.subtitle': {
    ar: 'سنعود قريباً',
    en: 'We\'ll be back soon',
    fr: 'Nous reviendrons bientôt'
  },
  'maintenance.timeLeft': {
    ar: 'الوقت المتبقي',
    en: 'Time Remaining',
    fr: 'Temps restant'
  },
  'maintenance.days': {
    ar: 'أيام',
    en: 'Days',
    fr: 'Jours'
  },
  'maintenance.hours': {
    ar: 'ساعات',
    en: 'Hours',
    fr: 'Heures'
  },
  'maintenance.minutes': {
    ar: 'دقائق',
    en: 'Minutes',
    fr: 'Minutes'
  },
  'maintenance.seconds': {
    ar: 'ثواني',
    en: 'Seconds',
    fr: 'Secondes'
  },

  // Common
  'common.save': {
    ar: 'حفظ',
    en: 'Save',
    fr: 'Enregistrer'
  },
  'common.cancel': {
    ar: 'إلغاء',
    en: 'Cancel',
    fr: 'Annuler'
  },
  'common.delete': {
    ar: 'حذف',
    en: 'Delete',
    fr: 'Supprimer'
  },
  'common.edit': {
    ar: 'تعديل',
    en: 'Edit',
    fr: 'Modifier'
  },
  'common.add': {
    ar: 'إضافة',
    en: 'Add',
    fr: 'Ajouter'
  },
  'common.loading': {
    ar: 'جاري التحميل...',
    en: 'Loading...',
    fr: 'Chargement...'
  },
  'common.error': {
    ar: 'خطأ',
    en: 'Error',
    fr: 'Erreur'
  },
  'common.success': {
    ar: 'نجح',
    en: 'Success',
    fr: 'Succès'
  },
  'common.confirm': {
    ar: 'تأكيد',
    en: 'Confirm',
    fr: 'Confirmer'
  },
  'common.close': {
    ar: 'إغلاق',
    en: 'Close',
    fr: 'Fermer'
  },

  // Footer
  'footer.copyright': {
    ar: 'جميع الحقوق محفوظة',
    en: 'All rights reserved',
    fr: 'Tous droits réservés'
  },
  'footer.followUs': {
    ar: 'تابعنا',
    en: 'Follow Us',
    fr: 'Suivez-nous'
  },

  // Stats
  'stats.totalDownloads': {
    ar: 'إجمالي التحميلات',
    en: 'Total Downloads',
    fr: 'Téléchargements totaux'
  },
  'stats.totalVisitors': {
    ar: 'إجمالي الزوار',
    en: 'Total Visitors',
    fr: 'Visiteurs totaux'
  },
  'stats.thisMonth': {
    ar: 'هذا الشهر',
    en: 'This Month',
    fr: 'Ce mois'
  },
  'stats.lastMonth': {
    ar: 'الشهر الماضي',
    en: 'Last Month',
    fr: 'Le mois dernier'
  }
};

export const getTranslation = (key: string, locale: string): string => {
  return translations[key]?.[locale] || translations[key]?.['en'] || key;
};

export const getCurrentLanguage = (locale: string): Language => {
  return languages.find(lang => lang.code === locale) || languages[0];
};

export const isRTL = (locale: string): boolean => {
  const language = getCurrentLanguage(locale);
  return language.dir === 'rtl';
};

export const formatDate = (date: Date, locale: string): string => {
  return new Intl.DateTimeFormat(locale).format(date);
};

export const formatNumber = (number: number, locale: string): string => {
  return new Intl.NumberFormat(locale).format(number);
};