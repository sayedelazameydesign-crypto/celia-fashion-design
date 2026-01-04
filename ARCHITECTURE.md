# 🏗️ بنية المشروع - Celia Fashion Design (celia_fashion_design)

## نظرة عامة على البنية

تم بناء المشروع كمنصة متكاملة تتكون من:

1. **Frontend (React + Vite)**: واجهة المستخدم
2. **Backend API (Express)**: خادم API
3. **Database (Supabase/PostgreSQL)**: قاعدة البيانات
4. **AI Services (Google Gemini)**: خدمات الذكاء الاصطناعي

## 📁 هيكل الملفات

```
celia-global-fashion-2026/
│
├── 📂 server/                    # Backend API Server
│   ├── config/
│   │   └── database.ts          # إعدادات Supabase
│   ├── routes/                  # API Routes
│   │   ├── products.ts          # إدارة المنتجات
│   │   ├── users.ts             # إدارة المستخدمين
│   │   ├── orders.ts            # إدارة الطلبات
│   │   ├── affiliates.ts        # نظام الشركاء
│   │   ├── ai.ts                # خدمات AI (Gemini)
│   │   └── external.ts          # APIs خارجية (Amazon/AliExpress)
│   ├── index.ts                 # نقطة بدء الخادم
│   └── tsconfig.json            # TypeScript config للخادم
│
├── 📂 components/               # React Components
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── Cart.tsx
│   ├── StylistAI.tsx
│   ├── VisualSearch.tsx
│   ├── AdminDashboard.tsx
│   ├── AffiliateDashboard.tsx
│   └── ...
│
├── 📂 lib/                      # Utilities & API Client
│   └── api.ts                   # API Client للواجهة الأمامية
│
├── 📂 services/                 # Services
│   ├── api.ts                   # Re-export API client
│   └── gemini.ts                # Gemini AI (Legacy - يستخدم API الآن)
│
├── 📂 database/                 # Database Schema
│   └── schema.sql               # SQL Schema لـ Supabase
│
├── 📄 App.tsx                   # المكون الرئيسي
├── 📄 types.ts                  # TypeScript Types
├── 📄 constants.tsx             # الثوابت والبيانات
├── 📄 vite.config.ts            # Vite Configuration
├── 📄 package.json              # Dependencies
├── 📄 env.example               # مثال متغيرات البيئة
├── 📄 README.md                 # التوثيق الرئيسي
├── 📄 SETUP.md                  # دليل الإعداد السريع
└── 📄 ARCHITECTURE.md           # هذا الملف
```

## 🔄 تدفق البيانات

### 1. جلب المنتجات

```
Frontend (React)
  ↓ fetch
lib/api.ts (API Client)
  ↓ HTTP Request
Express Server (server/routes/products.ts)
  ↓ Query
Supabase Database (products table)
  ↓ Response
Express Server
  ↓ JSON Response
Frontend
  ↓ Render
React Components
```

### 2. إنشاء طلب

```
User Action (Checkout)
  ↓
Cart Items
  ↓ POST /api/orders
Express Server (server/routes/orders.ts)
  ↓ Calculate Total
  ↓ Create Order
  ↓ Create Order Items
Supabase (orders, order_items tables)
  ↓ Response
Frontend
  ↓ Update UI
```

### 3. الذكاء الاصطناعي (AI Stylist)

```
User Query
  ↓ POST /api/ai/advice
Express Server (server/routes/ai.ts)
  ↓ Get Products from DB
  ↓ Call Gemini API
Google Gemini API
  ↓ Response
Express Server
  ↓ Format Response
Frontend
  ↓ Display
StylistAI Component
```

## 🗄️ قاعدة البيانات

### الجداول الرئيسية

1. **users**: معلومات المستخدمين
2. **products**: المنتجات (مع status: pending/approved/rejected)
3. **orders**: الطلبات
4. **order_items**: عناصر الطلبات
5. **affiliates**: معلومات الشركاء
6. **affiliate_clicks**: نقرات الشركاء
7. **affiliate_commissions**: عمولات الشركاء
8. **carts**: سلات التسوق

### العلاقات

- `orders.user_id` → `users.id`
- `orders.id` → `order_items.order_id`
- `order_items.product_id` → `products.id`
- `affiliates.user_id` → `users.id`
- `affiliate_clicks.affiliate_id` → `affiliates.id`
- `carts.user_id` → `users.id`

## 🔌 API Endpoints

### Products
- `GET /api/products` - جلب جميع المنتجات
- `GET /api/products/:id` - جلب منتج محدد
- `POST /api/products` - إنشاء منتج
- `PUT /api/products/:id` - تحديث منتج
- `DELETE /api/products/:id` - حذف منتج
- `PATCH /api/products/:id/approve` - الموافقة على منتج
- `PATCH /api/products/:id/reject` - رفض منتج

### Users
- `GET /api/users` - جلب جميع المستخدمين
- `GET /api/users/:id` - جلب مستخدم
- `POST /api/users` - إنشاء مستخدم
- `PUT /api/users/:id` - تحديث مستخدم

### Orders
- `GET /api/orders` - جلب الطلبات
- `GET /api/orders/:id` - جلب طلب
- `POST /api/orders` - إنشاء طلب
- `PATCH /api/orders/:id/status` - تحديث حالة الطلب

### Affiliates
- `GET /api/affiliates` - جلب الشركاء
- `GET /api/affiliates/code/:code` - جلب شريك برمز
- `GET /api/affiliates/:id/dashboard` - لوحة تحكم
- `POST /api/affiliates` - إنشاء شريك
- `POST /api/affiliates/:code/click` - تسجيل نقرة

### AI
- `POST /api/ai/advice` - نصائح موضة
- `POST /api/ai/complete-look` - إكمال الإطلالة
- `POST /api/ai/visual-search` - البحث بالصورة

### External
- `POST /api/external/amazon/search` - البحث في Amazon
- `POST /api/external/aliexpress/search` - البحث في AliExpress
- `POST /api/external/import` - استيراد منتج
- `POST /api/external/scrape` - استخراج بيانات من URL

## 🔐 الأمان

### Environment Variables

- **Frontend**: يستخدم `VITE_API_URL` فقط
- **Backend**: يستخدم جميع المفاتيح من `.env`
  - `SUPABASE_SERVICE_ROLE_KEY`: للعمليات الإدارية فقط
  - `GEMINI_API_KEY`: لخدمات AI

### قاعدة البيانات

- Supabase يوفر Row Level Security (RLS)
- Service Role Key: للخادم فقط (صلاحيات كاملة)
- Anon Key: للواجهة الأمامية (صلاحيات محدودة)

## 🚀 التشغيل

### Development

```bash
# Terminal 1: Backend Server
npm run server

# Terminal 2: Frontend
npm run dev
```

### Production

```bash
# Build Frontend
npm run build

# Run Server
npm run server
```

## 📊 Profit Margin System

هامش الربح (15%) يُطبق تلقائياً:

1. عند إنشاء منتج: `final_price = original_price * 1.15`
2. عند استيراد منتج: نفس الحساب
3. في الطلبات: استخدام `final_price` من المنتج

## 🔄 التكامل المستقبلي

### Amazon Product Advertising API
- يحتاج: Access Key, Secret Key, Associate Tag
- موجود في `server/routes/external.ts` (قابل للتطوير)

### AliExpress Open Platform API
- يحتاج: App Key, App Secret
- موجود في `server/routes/external.ts` (قابل للتطوير)

---

**تم البناء بـ ❤️ للموضة المستقبلية**

