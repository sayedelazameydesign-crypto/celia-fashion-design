# ⚡ البدء السريع - Celia Global Fashion 2026

## 🎯 الخطوات الأساسية (5 دقائق)

### 1. تثبيت المكتبات
```bash
npm install
```

### 2. إعداد Supabase

1. أنشئ مشروع على [supabase.com](https://supabase.com)
2. افتح SQL Editor
3. انسخ `database/schema.sql` والصقه
4. اضغط Run
5. احصل على URL و Keys من Settings → API

### 3. إنشاء ملف .env

أنشئ `.env` في الجذر:

```env
GEMINI_API_KEY=your_key_here
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key
# Contact Information
STORE_NAME=celia_fashion_design
STORE_EMAIL=sayedelazameydesign@gmail.com
WHATSAPP_NUMBER=01126212452

# Payment
VODAFONE_CASH_NUMBER=01126212452
PORT=5000
PROFIT_MARGIN=0.15
VITE_API_URL=http://localhost:5000/api
```

### 4. تشغيل المشروع

**Terminal 1** (الخادم):
```bash
npm run server
```

**Terminal 2** (الواجهة):
```bash
npm run dev
```

### 5. افتح المتصفح

- الواجهة: http://localhost:3000
- API: http://localhost:5000/api/health

## ✅ التحقق من الإعداد

### اختبار API
```bash
curl http://localhost:5000/api/health
# يجب أن ترى: {"status":"ok",...}
```

### إضافة منتج تجريبي

في Supabase Dashboard → Table Editor → `products`:

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

### اختبار جلب المنتجات
```bash
curl http://localhost:5000/api/products
```

## 📚 الخطوات التالية

1. ✅ اقرأ `README.md` للتفاصيل الكاملة
2. ✅ راجع `SETUP.md` للإعداد المفصل
3. ✅ استكشف `ARCHITECTURE.md` لفهم البنية
4. ✅ ابدأ التطوير!

---

**تم البناء بـ ❤️**

