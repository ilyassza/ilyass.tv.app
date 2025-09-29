import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import '@/styles/globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import { PageTransition } from '@/components/PageTransition';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({ 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'App Store Platform | متجر التطبيقات',
    template: '%s | App Store Platform'
  },
  description: 'Modern app store platform with cutting-edge technology | منصة حديثة لتوزيع التطبيقات',
  keywords: ['apps', 'download', 'mobile', 'تطبيقات', 'تحميل'],
  authors: [{ name: 'App Store Platform' }],
  creator: 'App Store Platform',
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: ['en_US', 'fr_FR'],
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://appstore.example.com',
    title: 'App Store Platform | متجر التطبيقات',
    description: 'Modern app store platform with cutting-edge technology',
    siteName: 'App Store Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'App Store Platform | متجر التطبيقات',
    description: 'Modern app store platform with cutting-edge technology',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <LanguageProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <Navbar />
              <main className="flex-grow">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>
              <Footer />
            </div>
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '16px',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}