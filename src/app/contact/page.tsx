'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useLanguage } from '../../contexts/LanguageContext';
import { ContactMessage } from '../../types';
import toast from 'react-hot-toast';
import { 
  FiMail, 
  FiUser, 
  FiMessageSquare, 
  FiSend,
  FiPhone,
  FiMapPin,
  FiClock,
  FiCheckCircle
} from 'react-icons/fi';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const { t, locale } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'فريق الدعم',
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID || 'your_user_id'
      );

      // Save message to Firestore
      const messageData: Omit<ContactMessage, 'id'> = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        isRead: false,
        isReplied: false,
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'messages'), {
        ...messageData,
        createdAt: serverTimestamp(),
      });

      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(true);
      
      toast.success(t('contact.success'), {
        duration: 5000,
        icon: '✅',
      });

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(t('contact.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: 'البريد الإلكتروني',
      value: 'support@appstore.com',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: FiPhone,
      title: 'الهاتف',
      value: '+1 (555) 123-4567',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: FiMapPin,
      title: 'العنوان',
      value: 'الدار البيضاء، المغرب',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: FiClock,
      title: 'ساعات العمل',
      value: '24/7 دعم مستمر',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-6 rounded-2xl ${info.bgColor} border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300`}
              >
                <div className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                  <info.icon className={`w-6 h-6 ${info.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {info.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Form */}
              <div className="p-8 lg:p-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                    أرسل لنا رسالة
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    سنعود إليك في أقرب وقت ممكن
                  </p>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiCheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        تم إرسال رسالتك بنجاح!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        سنقوم بالرد عليك خلال 24 ساعة
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        إرسال رسالة أخرى
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Field */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('contact.name')} *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiUser className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="input-field pl-10"
                            placeholder="اسمك الكامل"
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('contact.email')} *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiMail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="input-field pl-10"
                            placeholder="example@email.com"
                          />
                        </div>
                      </div>

                      {/* Message Field */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('contact.message')} *
                        </label>
                        <div className="relative">
                          <div className="absolute top-3 left-3 pointer-events-none">
                            <FiMessageSquare className="h-5 w-5 text-gray-400" />
                          </div>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            className="input-field pl-10 resize-none"
                            placeholder="اكتب رسالتك هنا..."
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                          isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-lg hover:shadow-xl'
                        } text-white`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>{t('contact.sending')}</span>
                          </>
                        ) : (
                          <>
                            <FiSend className="w-5 h-5" />
                            <span>{t('contact.send')}</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                  )}
                </motion.div>
              </div>

              {/* Side Panel */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-500 p-8 lg:p-12 text-white">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="h-full flex flex-col justify-center"
                >
                  <h3 className="text-2xl font-display font-bold mb-6">
                    تواصل معنا مباشرة
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiMail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold">البريد الإلكتروني</p>
                        <p className="text-primary-100">support@appstore.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiPhone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold">الهاتف</p>
                        <p className="text-primary-100">+212 6XX XXX XXX</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiClock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold">وقت الاستجابة</p>
                        <p className="text-primary-100">خلال 24 ساعة</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/20">
                    <p className="text-primary-100 text-sm leading-relaxed">
                      نحن ملتزمون بتقديم أفضل خدمة دعم. سنعود إليك بأسرع وقت ممكن للإجابة على جميع استفساراتك.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              الأسئلة الشائعة
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              إجابات سريعة للأسئلة الأكثر شيوعاً
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: 'كيف يمكنني تحميل التطبيقات؟',
                answer: 'يمكنك تحميل التطبيقات مباشرة من الصفحة الرئيسية بالضغط على زر التحميل'
              },
              {
                question: 'هل التطبيقات آمنة؟',
                answer: 'نعم، جميع التطبيقات مفحوصة ومختبرة للتأكد من خلوها من البرمجيات الضارة'
              },
              {
                question: 'كيف أتواصل مع الدعم؟',
                answer: 'يمكنك التواصل معنا عبر النموذج أعلاه أو البريد الإلكتروني المذكور'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}