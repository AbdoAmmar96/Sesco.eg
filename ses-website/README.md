# SES Trading & Industries — موقع الشركة

موقع تعريفي احترافي لشركة **SES Trading & Industries** (أنظمة إطفاء الحريق، إنذار الحريق، شبكات المياه، أعمال MEP) — متبني بـ **React + Vite + Tailwind CSS**، Multi-page، Responsive بالكامل، ومتطابق مع تصميم الـ PDF المعتمد.

---

## 🚀 التشغيل

```bash
# 1) تثبيت الباكدجات
npm install

# 2) تشغيل سيرفر التطوير
npm run dev
# يفتح على http://localhost:5173

# 3) بناء نسخة الإنتاج
npm run build

# 4) معاينة نسخة الإنتاج محليًا
npm run preview
```

> المتطلبات: Node.js 18+ و npm.

---

## 🗂️ هيكل المشروع

```
ses-website/
├─ index.html              # نقطة الدخول + ميتا/SEO
├─ public/
│  ├─ favicon.svg
│  └─ images/
│     └─ README.txt        # دليل أسماء الصور المطلوبة
└─ src/
   ├─ main.jsx             # تركيب React + Router
   ├─ App.jsx              # كل الـ Routes
   ├─ index.css            # Tailwind + كلاسات الأزرار/الكروت
   ├─ data/
   │  └─ siteData.js       # 👈 كل محتوى الموقع في ملف واحد
   ├─ components/          # مكونات مشتركة (Header, Footer, Hero…)
   └─ pages/               # صفحات الموقع
```

### الصفحات (11 صفحة)
- `/` — الرئيسية
- `/about` — من نحن
- `/services` — الخدمات
- `/products` — المنتجات (نظرة عامة)
- `/products/fire-fighting` — أنظمة إطفاء الحريق
- `/products/fire-alarm` — أنظمة إنذار الحريق
- `/products/water-network` — منتجات شبكات المياه
- `/projects` — المشاريع (مع فلترة)
- `/downloads` — مركز التحميلات
- `/contact` — اتصل بنا (فورم شغّال)
- صفحة 404

---

## ✏️ تعديل المحتوى

كل النصوص والبيانات في ملف واحد:

```
src/data/siteData.js
```

غيّر منه: بيانات الشركة (`company`)، الخدمات، المنتجات، المشاريع، التحميلات… والموقع كله بيتحدّث تلقائيًا.

---

## 🖼️ الصور

الموقع شغّال من غير أي صور — بيظهر **placeholder** احترافي بلون الهوية + أيقونة القسم.
لإضافة الصور الحقيقية: حط الملفات في `public/images/` بنفس الأسماء الموجودة في:

```
public/images/README.txt
```

---

## 🎨 الهوية البصرية

| العنصر | اللون |
|--------|-------|
| Navy أساسي | `#13294B` |
| برتقالي (CTA) | `#F47A20` |
| أزرق ملكي | `#2155CC` |
| خط | Inter |

الألوان معرّفة في `tailwind.config.js` (تقدر تغيّرها من مكان واحد).

---

## 📌 ملاحظات

- فورم "اتصل بنا" حاليًا Front-end فقط (بيعرض رسالة نجاح). لربطه بسيرفر/إيميل، عدّل `handleSubmit` في `src/pages/Contact.jsx`.
- خريطة جوجل مضمّنة عبر `company.mapEmbed` في `siteData.js`.
- نسخة عربية / Bilingual ممكن نضيفها كخطوة تالية.

---

© 2024 SES Trading & Industries.
تطوير: **Business Partner for Information Technology**.
