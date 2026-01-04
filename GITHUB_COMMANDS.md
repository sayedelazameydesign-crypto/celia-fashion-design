# 🚀 أوامر رفع المشروع إلى GitHub

## ✅ تم إعداد Git محلياً

تم تهيئة Git repository وإضافة جميع الملفات بنجاح!

## 📋 الخطوات التالية

### 1. إنشاء Repository على GitHub

1. اذهب إلى: https://github.com/new
2. املأ:
   - **Repository name**: `celia-fashion-design`
   - **Description**: `AI-powered e-commerce platform for fashion`
   - **Visibility**: Public أو Private
   - **لا تضع علامة** على Initialize repository
3. اضغط **Create repository**

### 2. ربط المشروع ورفعه

بعد إنشاء Repository، انسخ هذه الأوامر في Terminal:

```bash
# إضافة remote (استبدل YOUR_USERNAME باسمك على GitHub)
git remote add origin https://github.com/YOUR_USERNAME/celia-fashion-design.git

# تغيير اسم branch إلى main
git branch -M main

# رفع المشروع
git push -u origin main
```

## 📝 مثال كامل

إذا كان اسم المستخدم على GitHub هو `sayedelazamey`:

```bash
git remote add origin https://github.com/sayedelazamey/celia-fashion-design.git
git branch -M main
git push -u origin main
```

## 🔐 إذا طلب GitHub Authentication

إذا طلب GitHub اسم المستخدم وكلمة المرور:

1. استخدم **Personal Access Token** بدلاً من كلمة المرور
2. إنشاء Token: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
3. اختر الصلاحيات: `repo` (كل الصلاحيات)
4. انسخ الـ Token واستخدمه ككلمة مرور

## ✅ التحقق من الرفع

بعد الرفع بنجاح:
- ✅ اذهب إلى: `https://github.com/YOUR_USERNAME/celia-fashion-design`
- ✅ تأكد من وجود جميع الملفات
- ✅ تأكد من عدم وجود ملفات حساسة (.env, node_modules)

---

**جاهز للرفع! 🚀**

