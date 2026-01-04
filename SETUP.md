# 🚀 دليل الإعداد السريع - Celia Global Fashion 2026

## خطوات الإعداد السريعة

### 1️⃣ إعداد Supabase

1. اذهب إلى [supabase.com](https://supabase.com) وأنشئ حساب مجاني
2. أنشئ مشروع جديد
3. افتح **SQL Editor** من القائمة الجانبية
4. انسخ محتوى ملف `database/schema.sql` والصقه في SQL Editor
5. اضغط **Run** لإنشاء الجداول
6. من **Settings → API**، احصل على:
   - **Project URL**
   - **anon/public key**
   - **service_role key** (مهم: احتفظ به سراً!)

### 2️⃣ إعداد Google Gemini API

1. اذهب إلى [Google AI Studio](https://makersuite.google.com/app/apikey)
2. أنشئ API Key جديد
3. انسخ المفتاح

### 3️⃣ إعداد ملف .env

في الجذر، أنشئ ملف `.env` (انسخ من `env.example`):

```env
# Gemini API
GEMINI_API_KEY=your_key_here

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Contact Information
STORE_NAME=celia_fashion_design
STORE_EMAIL=sayedelazameydesign@gmail.com
WHATSAPP_NUMBER=01126212452

# Vodafone Cash / Payment
VODAFONE_CASH_NUMBER=01126212452

# Server
PORT=5000
NODE_ENV=development

# Profit Margin
PROFIT_MARGIN=0.15
```

### 4️⃣ تثبيت المكتبات

```bash
npm install
```

### 5️⃣ تشغيل الخادم

في terminal منفصل:

```bash
npm run server
```

يجب أن ترى:
```
🚀 Server running on http://localhost:5000
📦 Environment: development
```

### 6️⃣ تشغيل الواجهة الأمامية

في terminal آخر:

```bash
npm run dev
```

يجب أن ترى:
```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
```

### 7️⃣ اختبار API

افتح المتصفح واذهب إلى:
- `http://localhost:5000/api/health` - يجب أن ترى `{"status":"ok"}`

## 🔍 التحقق من الإعداد

### اختبار قاعدة البيانات

1. اذهب إلى Supabase Dashboard → **Table Editor**
2. يجب أن ترى الجداول: `users`, `products`, `orders`, `affiliates`, إلخ

### إضافة منتج تجريبي

في Supabase → Table Editor → `products`:

1. اضغط **Insert** → **Insert row**
2. املأ البيانات:
   ```json
   {
     "name": "منتج تجريبي",
     "original_price": 100,
     "final_price": 115,
     "category": "شباب GEN-Z",
     "image": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000",
     "status": "approved"
   }
   ```
3. احفظ

### اختبار API

```bash
# جلب المنتجات
curl http://localhost:5000/api/products

# يجب أن ترى المنتج الذي أضفته
```

## ⚠️ استكشاف الأخطاء

### خطأ: "Supabase credentials not found"
- تأكد من وجود ملف `.env` في الجذر
- تأكد من صحة المفاتيح

### خطأ: "GEMINI_API_KEY not configured"
- أضف `GEMINI_API_KEY` في ملف `.env`

### خطأ: Port already in use
- غير `PORT` في `.env` إلى رقم آخر (مثلاً 5001)

### خطأ: Cannot connect to Supabase
- تأكد من صحة `SUPABASE_URL`
- تأكد من أن المشروع نشط في Supabase

## 📚 الخطوات التالية

1. اقرأ `README.md` للتفاصيل الكاملة
2. راجع `database/schema.sql` لفهم بنية البيانات
3. استكشف `server/routes/` لفهم API endpoints

---

**تم البناء بـ ❤️**

