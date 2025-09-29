# 🚀 App Store Platform | متجر التطبيقات

منصة حديثة لتوزيع التطبيقات المحمولة مع تقنيات متقدمة وتصميم عصري يشبه متاجر كبرى مثل Apple Store و Play Store.

## ✨ المميزات الرئيسية

### 🏠 الواجهة الأمامية
- **صفحة رئيسية** مع بطاقات التطبيقات المتحركة وتأثيرات Hover + Ripple
- **صفحة حولنا** مع محتوى قابل للتعديل من لوحة التحكم
- **صفحة الاتصال** مع نموذج دعم متكامل مع EmailJS
- **نافبار** مع تأثير Glassmorphism وتبديل اللغات
- **فوتر** شامل مع روابط التواصل الاجتماعي

### 🔐 نظام المصادقة
- **تسجيل دخول آمن** عبر Firebase Authentication
- **أدوار المستخدمين** (Admin/User)
- **حماية الصفحات** الحساسة

### 🎛️ لوحة التحكم الشاملة
- **إحصائيات متقدمة** مع رسوم بيانية تفاعلية
- **إدارة التطبيقات** (إضافة، تعديل، حذف)
- **إدارة الرسائل** من نموذج الاتصال
- **وضع الصيانة** مع عداد تنازلي
- **إعدادات الموقع** الشاملة
- **إدارة المستخدمين** والأدمن
- **سجل الأنشطة** لتتبع العمليات
- **مركز الإشعارات**

### 🛠️ وضع الصيانة
- **عداد تنازلي حي** بالوقت الحقيقي
- **شريط التقدم المتحرك** 
- **رسائل مخصصة** متعددة اللغات
- **تحكم كامل** من لوحة التحكم

### 🌍 دعم اللغات المتعددة
- **3 لغات مدعومة**: العربية، الإنجليزية، الفرنسية
- **تبديل فوري** للغة
- **دعم RTL** للعربية
- **نصوص محفوظة** في نظام i18n

### 🎨 التصميم والحركات
- **تصميم حديث** مع Tailwind CSS
- **وضع داكن/فاتح** قابل للتبديل
- **حركات سلسة** مع Framer Motion
- **تأثيرات متقدمة**: Glassmorphism, Ripple Effects
- **استجابة كاملة** لجميع الأجهزة

## 🛠️ التقنيات المستخدمة

### Frontend
- **Next.js 14** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications

### Backend & Database
- **Firebase Auth** - Authentication
- **Firestore** - Database
- **Firebase Storage** - File Storage
- **EmailJS** - Email Service

### Charts & Analytics
- **Chart.js** - Data Visualization
- **React Chart.js 2** - React Integration

## 🚀 التثبيت والإعداد

### 1. نسخ المشروع
```bash
git clone <repository-url>
cd app-store-platform
```

### 2. تثبيت الحزم
```bash
npm install
```

### 3. إعداد Firebase
1. أنشئ مشروع Firebase جديد
2. فعّل Authentication (Email/Password)
3. فعّل Firestore Database
4. فعّل Storage
5. انسخ إعدادات Firebase إلى `.env.local`

### 4. إعداد البيئة
أنشئ ملف `.env.local`:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id

# App Configuration
NEXT_PUBLIC_APP_NAME=App Store Platform
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 5. تطبيق قواعد الأمان
```bash
# Firestore Rules
firebase deploy --only firestore:rules

# Storage Rules
firebase deploy --only storage
```

### 6. إنشاء أدمن
في Firebase Console:
1. اذهب إلى Authentication
2. أضف مستخدم جديد
3. في Firestore، أضف document في collection `users`:
```json
{
  "uid": "user_uid_here",
  "email": "admin@example.com",
  "role": "admin",
  "displayName": "Admin",
  "createdAt": "current_timestamp",
  "lastLogin": "current_timestamp"
}
```

### 7. تشغيل المشروع
```bash
npm run dev
```

## 📱 كيفية الاستخدام

### للمستخدمين العاديين
1. **تصفح التطبيقات** من الصفحة الرئيسية
2. **تحميل التطبيقات** بنقرة واحدة مع تأثيرات بصرية
3. **قراءة المعلومات** في صفحة حولنا
4. **التواصل** عبر نموذج الاتصال

### للمدير (Admin)
1. **تسجيل الدخول** من `/login`
2. **الوصول للوحة التحكم** من `/dashboard`
3. **إدارة التطبيقات** - إضافة/تعديل/حذف
4. **مراجعة الرسائل** من نموذج الاتصال
5. **تفعيل وضع الصيانة** مع تحديد الأوقات
6. **مراقبة الإحصائيات** والتحليلات
7. **إدارة إعدادات الموقع** العامة

## 🔧 البنية التقنية

```
src/
├── app/                 # Next.js App Router
│   ├── page.tsx         # الصفحة الرئيسية
│   ├── about/           # صفحة حولنا  
│   ├── contact/         # صفحة الاتصال
│   ├── login/           # صفحة تسجيل الدخول
│   ├── dashboard/       # لوحة التحكم
│   └── maintenance/     # صفحة الصيانة
├── components/          # المكونات القابلة لإعادة الاستخدام
│   ├── dashboard/       # مكونات لوحة التحكم
│   ├── Navbar.tsx       # شريط التنقل
│   ├── Footer.tsx       # التذييل
│   └── ...
├── contexts/            # React Contexts
│   ├── AuthContext.tsx  # سياق المصادقة
│   └── LanguageContext.tsx # سياق اللغات
├── lib/                 # المكتبات والأدوات
│   ├── firebase.ts      # إعدادات Firebase
│   └── i18n.ts         # نظام اللغات
├── types/               # أنواع TypeScript
└── styles/              # ملفات التنسيق
```

## 🛡️ الأمان

### قواعد Firestore
- **القراءة العامة**: التطبيقات وإعدادات الموقع
- **الكتابة للأدمن فقط**: جميع البيانات الحساسة
- **رسائل الاتصال**: إنشاء عام، قراءة للأدمن فقط
- **منع الحذف**: الرسائل وسجلات الأنشطة

### قواعد Storage
- **القراءة العامة**: صور التطبيقات وأصول الموقع
- **الكتابة للأدمن فقط**: جميع الملفات

## 🎯 المميزات المتقدمة

### التحليلات
- **إحصائيات في الوقت الحقيقي**
- **رسوم بيانية تفاعلية**
- **تتبع التحميلات والزيارات**

### تجربة المستخدم
- **تحميل سريع** مع Lazy Loading
- **انتقالات سلسة** بين الصفحات
- **إشعارات تفاعلية**
- **تأثيرات بصرية متقدمة**

### SEO
- **Meta Tags ديناميكية**
- **Open Graph** دعم كامل
- **Sitemap تلقائي**
- **تحسين للمحركات البحث**

## 🚀 النشر

### Vercel (موصى به)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# ارفع مجلد out/
```

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

## 🔄 التحديثات المستقبلية

- [ ] نظام التقييمات والمراجعات
- [ ] دعم التحميل المباشر للملفات
- [ ] إشعارات Push
- [ ] نظام الاشتراكات
- [ ] تطبيق محمول مصاحب
- [ ] دعم المدفوعات
- [ ] نظام التعليقات

## 📞 الدعم والمساعدة

للحصول على الدعم:
- 📧 **البريد الإلكتروني**: support@appstore.com
- 🌐 **الموقع**: [الرابط]
- 📱 **واتساب**: +212 6XX XXX XXX

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف LICENSE للتفاصيل.

---

صُنع بـ ❤️ في المغرب | Made with ❤️ in Morocco
"# ilyass.tv.app" 
