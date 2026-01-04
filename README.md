# 👗 Celia Fashion Design - منصة تجارة إلكترونية متكاملة

**Celia Fashion Design (celia_fashion_design)** هو منصة تجارة إلكترونية متكاملة للموضة تعتمد على تقنيات الذكاء الاصطناعي (Google Gemini API)، قاعدة بيانات Supabase/PostgreSQL، وخوادم Express API.

**معلومات الاتصال:**
- 📧 البريد الإلكتروني: sayedelazameydesign@gmail.com
- 📱 الواتساب: 01126212452

## 🚀 الميزات الرئيسية

- **الكونسيرج الذكي (AI Stylist)**: محادثة فورية مع "سيليا" المنسقة الافتراضية للحصول على نصائح موضة مبنية على المخزون الحالي
- **قاعدة بيانات Supabase/PostgreSQL**: إدارة كاملة للمنتجات والمستخدمين والطلبات والشركاء
- **API Layer (Express)**: طبقة API كاملة للواجهة الأمامية
- **الاستيراد الدولي الذكي**: تكامل مع Amazon/AliExpress APIs مع إضافة تلقائية لهامش ربح **15%**
- **البحث بالرؤية (Visual Search)**: رفع صورة لأي ملابس لتحليلها بواسطة الذكاء الاصطناعي وإيجاد قطع مشابهة
- **نظام الشركاء (Affiliate Program)**: لوحة تحكم متكاملة للمسوقين لمتابعة الأرباح والنقرات
- **الدفع عبر فودافون كاش**: تكامل محلي للدفع السريع في مصر

## 🛠 التكنولوجيا المستخدمة

### Frontend
- **React 19** + **TypeScript**
- **Tailwind CSS** (تصميم Glassmorphism 2026)
- **Vite** (Build tool)

### Backend
- **Express.js** (API Server)
- **Supabase/PostgreSQL** (Database)
- **TypeScript**

### AI & APIs
- **Google Gemini 2.0 Flash** للدردشة وتحليل الصور
- **Amazon Product Advertising API** (قابل للتكامل)
- **AliExpress Open Platform API** (قابل للتكامل)

### Analytics & Charts
- **Recharts** للرسوم البيانية في لوحة التحكم

## 📦 الإعداد والتشغيل

### 1. متطلبات النظام

- Node.js 18+ 
- npm أو yarn
- حساب Supabase (مجاني)
- Google Gemini API Key

### 2. تثبيت المكتبات

```bash
npm install
```

### 3. إعداد قاعدة البيانات

1. أنشئ مشروع جديد على [Supabase](https://supabase.com)
2. افتح SQL Editor في Supabase Dashboard
3. قم بتشغيل ملف `database/schema.sql` لإنشاء الجداول
4. احصل على:
   - Project URL
   - Anon Key
   - Service Role Key

### 4. إعداد متغيرات البيئة

انسخ ملف `env.example` إلى `.env` واملأ القيم:

```bash
# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Contact Information
STORE_NAME=celia_fashion_design
STORE_EMAIL=sayedelazameydesign@gmail.com
WHATSAPP_NUMBER=01126212452

# Vodafone Cash / Payment
VODAFONE_CASH_NUMBER=01065217834

# Server Configuration
PORT=5000
NODE_ENV=development

# External APIs (Optional)
AMAZON_API_KEY=your_amazon_api_key
AMAZON_SECRET_KEY=your_amazon_secret_key
AMAZON_ASSOCIATE_TAG=your_associate_tag

ALIEXPRESS_API_KEY=your_aliexpress_api_key
ALIEXPRESS_SECRET_KEY=your_aliexpress_secret_key

# Profit Margin
PROFIT_MARGIN=0.15
```

### 5. تشغيل المشروع

#### تشغيل الخادم (API Server)

في terminal منفصل:

```bash
npm run server
# أو للتطوير مع auto-reload
npm run dev:server
```

الخادم سيعمل على: `http://localhost:5000`

#### تشغيل الواجهة الأمامية

```bash
npm run dev
```

الواجهة الأمامية ستعمل على: `http://localhost:3000`

### 6. إعداد Vite Environment (للإنتاج)

أنشئ ملف `.env.local` في الجذر:

```bash
VITE_API_URL=http://localhost:5000/api
```

للإنتاج، غير إلى URL الخادم الحقيقي.

## 🗄 بنية قاعدة البيانات

قاعدة البيانات تحتوي على الجداول التالية:

- **users**: معلومات المستخدمين
- **products**: المنتجات (مع حالات pending/approved/rejected)
- **orders**: الطلبات
- **order_items**: عناصر الطلبات
- **affiliates**: معلومات الشركاء
- **affiliate_clicks**: نقرات الشركاء
- **affiliate_commissions**: عمولات الشركاء
- **carts**: سلات التسوق (للحفظ الدائم)

## 📡 API Endpoints

### المنتجات
- `GET /api/products` - جلب جميع المنتجات
- `GET /api/products/:id` - جلب منتج محدد
- `POST /api/products` - إنشاء منتج (Admin)
- `PUT /api/products/:id` - تحديث منتج (Admin)
- `DELETE /api/products/:id` - حذف منتج (Admin)
- `PATCH /api/products/:id/approve` - الموافقة على منتج
- `PATCH /api/products/:id/reject` - رفض منتج

### المستخدمون
- `GET /api/users` - جلب جميع المستخدمين
- `GET /api/users/:id` - جلب مستخدم محدد
- `POST /api/users` - إنشاء مستخدم
- `PUT /api/users/:id` - تحديث مستخدم

### الطلبات
- `GET /api/orders` - جلب جميع الطلبات
- `GET /api/orders/:id` - جلب طلب محدد
- `POST /api/orders` - إنشاء طلب جديد
- `PATCH /api/orders/:id/status` - تحديث حالة الطلب

### الشركاء (Affiliates)
- `GET /api/affiliates` - جلب جميع الشركاء
- `GET /api/affiliates/code/:code` - جلب شريك برمز محدد
- `GET /api/affiliates/:id/dashboard` - لوحة تحكم الشريك
- `POST /api/affiliates` - إنشاء شريك جديد
- `POST /api/affiliates/:code/click` - تسجيل نقرة شريك

### الذكاء الاصطناعي
- `POST /api/ai/advice` - الحصول على نصائح موضة
- `POST /api/ai/complete-look` - إكمال الإطلالة
- `POST /api/ai/visual-search` - البحث بالصورة

### APIs الخارجية
- `POST /api/external/amazon/search` - البحث في Amazon
- `POST /api/external/aliexpress/search` - البحث في AliExpress
- `POST /api/external/import` - استيراد منتج مع هامش ربح
- `POST /api/external/scrape` - استخراج بيانات منتج من URL

## 💰 نموذج الربح (Business Model)

1. **Dropshipping**: يتم عرض منتجات من موردين عالميين
2. **Profit Margin**: يتم ضرب سعر المنتج الأصلي في `1.15` لإضافة ربح 15% يغطي الشحن والعمولة
3. **Affiliate**: تخصيص جزء من الربح للمسوقين لزيادة المبيعات بدون تكلفة إعلانية

## 🔧 بنية المشروع

```
celia-global-fashion-2026/
├── server/                 # Backend API
│   ├── config/            # إعدادات قاعدة البيانات
│   ├── routes/            # API Routes
│   │   ├── products.ts
│   │   ├── users.ts
│   │   ├── orders.ts
│   │   ├── affiliates.ts
│   │   ├── ai.ts
│   │   └── external.ts
│   └── index.ts           # نقطة بدء الخادم
├── components/            # React Components
├── lib/                   # Utilities & API Client
│   └── api.ts            # API Client للواجهة الأمامية
├── services/              # Services
│   ├── gemini.ts         # Gemini AI (Legacy - يستخدم API الآن)
│   └── api.ts            # Re-export API client
├── database/              # Database Schema
│   └── schema.sql        # SQL Schema لـ Supabase
├── App.tsx               # الملف الرئيسي
└── package.json
```

## 📝 ملاحظات مهمة

1. **White-label**: يمكن تغيير العلامة التجارية والألوان من `constants.tsx` و `index.html`
2. **Environment Variables**: تأكد من إعداد جميع المفاتيح في ملف `.env`
3. **Supabase Security**: استخدم Service Role Key فقط في الخادم، و Anon Key في الواجهة الأمامية
4. **Amazon/AliExpress APIs**: التكامل مع هذه APIs يتطلب اعتماد خاص وتكوين إضافي

## 🚀 النشر

### Frontend (Vite)
- **Vercel**: اربط المشروع واختر Vite preset
- **Netlify**: اربط المشروع واختر Vite preset
- **Cloudflare Pages**: اربط المشروع واختر Vite preset

### Backend (Express)
- **Railway**: ارفع مجلد `server/` وحدد `npm run server`
- **Render**: ارفع المشروع وحدد خادم Express
- **Heroku**: استخدم buildpack Node.js

### Database
- **Supabase**: قاعدة البيانات موجودة على Supabase Cloud

## 📄 الرخصة

هذا المشروع مصمم كـ White-label ويمكن استخدامه وتعديله حسب الحاجة.

---

**تم البناء بـ ❤️ للموضة المستقبلية**
