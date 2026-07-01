# SES Trading & Industries — Website + CMS

موقع تعريفي احترافي لشركة **SES Trading & Industries** (أنظمة إطفاء الحريق، إنذار الحريق، شبكات المياه، وأعمال MEP) — مع **لوحة تحكم (CMS)** كاملة لإدارة المحتوى والعملاء المحتملين (Leads).

المشروع عبارة عن **monorepo** يتكوّن من جزأين يعملان معًا:

| المجلد | الوصف | التقنيات |
|--------|-------|----------|
| [`ses-website`](ses-website/) | الموقع الأمامي (Frontend) — الموقع التعريفي العام | React 18 · Vite 5 · Tailwind CSS 3 · shadcn/ui · React Router 6 |
| [`ses-backend`](ses-backend/)  | الواجهة الخلفية (Backend) — API + لوحة تحكم | Laravel 13 · PHP 8.3 · SQLite · Blade |

---

## 🧭 كيف يعمل المشروع؟

```
┌─────────────────────┐        GET /api/content        ┌──────────────────────┐
│                     │ ─────────────────────────────► │                      │
│   ses-website       │                                │    ses-backend       │
│   (React / Vite)    │        POST /api/leads         │  (Laravel API + CMS) │
│                     │ ─────────────────────────────► │                      │
└─────────────────────┘                                └──────────┬───────────┘
        ▲                                                          │
        │  يعرض المحتوى للزوّار                                     │  SQLite DB
        │                                                          ▼
        └───────────  الأدمن يدير المحتوى من /admin  ◄──── لوحة تحكم Blade
```

- **الموقع الأمامي** يجلب كل محتواه من الـ API (`GET /api/content`). وإذا كان الـ backend غير متاح، يعمل الموقع تلقائيًا على محتوى مُضمّن (`siteData.js`) كنسخة احتياطية — فلا يتعطّل أبدًا.
- **فورم التواصل / طلب عرض السعر** يرسل البيانات إلى `POST /api/leads`، فتُحفظ في قاعدة البيانات ويصل إشعار بالبريد للشركة.
- **الأدمن** يدير كل المحتوى والعملاء المحتملين من لوحة تحكم على `/admin`.

---

## 📋 المتطلبات (Requirements)

- **Node.js** 18+ و **npm** (للـ frontend)
- **PHP** 8.3+ و **Composer 2** (للـ backend)
- لا حاجة لسيرفر قاعدة بيانات — المشروع يستخدم **SQLite**.

---

## 🚀 التشغيل (Getting Started)

### 1) الواجهة الخلفية (Backend)

```bash
cd ses-backend

composer install

# أنشئ ملف البيئة (لو لم يكن موجودًا)
cp .env.example .env

php artisan key:generate
php artisan migrate --seed      # ينشئ الجداول + مستخدم الأدمن + المحتوى الأولي
php artisan serve               # http://localhost:8000
```

بيانات دخول لوحة التحكم الافتراضية (يمكن تغييرها من `.env` عبر `ADMIN_EMAIL` / `ADMIN_PASSWORD` ثم إعادة الـ seed):

- **الرابط:** http://localhost:8000/admin/login
- **الإيميل:** `admin@sescoeg.com`
- **الباسورد:** `SesAdmin@123`

### 2) الواجهة الأمامية (Frontend)

```bash
cd ses-website

npm install
npm run dev                     # http://localhost:5173
```

> الموقع الأمامي يقرأ عنوان الـ API من متغير `VITE_API_URL` في `ses-website/.env` (الافتراضي `http://localhost:8000`).

### تشغيل الاثنين معًا (اختصار)
شغّل الـ backend في طرفية، والـ frontend في طرفية أخرى. أو استخدم أمر Laravel الجاهز داخل `ses-backend` الذي يشغّل السيرفر + الطابور + السجلات + Vite معًا:
```bash
cd ses-backend && composer dev
```

---

## 🗂️ بنية المشروع (Project Structure)

```
ses-website (1)/
├─ .gitignore                 # يستبعد node_modules / vendor / .env ...
├─ README.md                  # هذا الملف
│
├─ ses-website/               # ── الواجهة الأمامية (React) ──
│  ├─ index.html              # نقطة الدخول + Meta / SEO / Open Graph
│  ├─ vite.config.js          # إعداد Vite (alias @ → src, port 5173)
│  ├─ tailwind.config.js      # ألوان الهوية + الخطوط
│  ├─ components.json         # إعداد shadcn/ui
│  ├─ .env                    # VITE_API_URL
│  └─ src/
│     ├─ main.jsx             # تركيب React + Router + ContentProvider
│     ├─ App.jsx              # كل الـ Routes
│     ├─ index.css            # Tailwind + كلاسات مخصصة
│     ├─ context/
│     │  └─ ContentContext.jsx  # يجلب المحتوى من الـ API مع fallback محلي
│     ├─ data/
│     │  └─ siteData.js       # المحتوى الاحتياطي المُضمّن
│     ├─ components/          # مكوّنات مشتركة (Header, Footer, Hero, UI…)
│     ├─ pages/               # صفحات الموقع
│     ├─ lib/utils.js         # دوال مساعدة (cn…)
│     └─ utils/download.js    # تحميل الملفات
│
└─ ses-backend/               # ── الواجهة الخلفية (Laravel) ──
   ├─ app/
   │  ├─ Http/Controllers/
   │  │  ├─ Api/              # ContentController, LeadController
   │  │  └─ Admin/            # كنترولرات لوحة التحكم (CMS + Leads)
   │  ├─ Http/Requests/       # StoreLeadRequest (تحقق + honeypot)
   │  ├─ Mail/                # NewLeadMail (إشعار العميل الجديد)
   │  └─ Models/              # نماذج البيانات
   ├─ routes/
   │  ├─ api.php              # مسارات الـ API العامة
   │  └─ web.php              # مسارات لوحة التحكم /admin
   ├─ database/
   │  ├─ migrations/          # جداول: leads + جداول الـ CMS
   │  ├─ seeders/             # AdminUserSeeder + ContentSeeder
   │  └─ database.sqlite      # قاعدة البيانات
   ├─ resources/views/admin/  # واجهات لوحة التحكم (Blade)
   └─ .env                    # إعدادات البيئة (لا يُرفع على git)
```

---

## 🌐 صفحات الموقع الأمامي (Routes)

| المسار | الصفحة |
|--------|--------|
| `/` | الرئيسية (Home) |
| `/about` | من نحن |
| `/services` | الخدمات |
| `/services/:slug` | تفاصيل خدمة |
| `/products` | المنتجات (نظرة عامة) |
| `/products/:slug` | تفاصيل فئة منتجات (Fire Fighting, Fire Alarm, Water Network…) |
| `/projects` | المشاريع (مع فلترة) |
| `/downloads` | مركز التحميلات |
| `/contact` | اتصل بنا (فورم مربوط بالـ API) |
| `/privacy` · `/terms` | صفحات قانونية |
| `*` | صفحة 404 |

---

## 🔌 الـ API

عنوان الأساس: `http://localhost:8000/api`

| Method | Path | الوصف |
|--------|------|-------|
| `GET`  | `/api/content` | شجرة محتوى الموقع كاملة (تُستهلك من React) |
| `POST` | `/api/leads` | إنشاء عميل محتمل (فورم التواصل / طلب عرض سعر) |
| `GET`  | `/api/ping` | فحص صحة الخدمة (Health check) |

**مثال `POST /api/leads` (JSON):**
```json
{
  "type": "contact",                        // أو "quote" (اختياري، الافتراضي contact)
  "name": "Ahmed Ali",                      // مطلوب
  "company": "ACME",                        // اختياري
  "email": "a@example.com",                 // مطلوب
  "phone": "+20...",                        // اختياري
  "subject": "...",                         // اختياري
  "interested_in": "Fire Fighting Systems", // اختياري
  "message": "...",                         // مطلوب
  "website": ""                             // honeypot — يجب أن يكون فارغًا (مضاد للسبام)
}
```
الاستجابة: `201` مع `{ success, message, id }`، أو `422` مع أخطاء التحقق.

> **CORS:** مفتوح لعناوين تطوير Vite في `ses-backend/config/cors.php` — **أضف نطاق الإنتاج الخاص بك هناك قبل النشر.**

---

## 🛠️ لوحة التحكم (Admin CMS)

على `http://localhost:8000/admin` — تتيح إدارة كل شيء بدون لمس الكود:

- **Leads** — عرض/بحث/فلترة العملاء المحتملين، وتغيير الحالة (new → read → replied → archived)، والرد بالبريد، والحذف.
- **Product Categories / Groups / Featured Products** — فئات المنتجات وتفاصيلها.
- **Projects · Brands · Consultants · Services · Downloads** — إدارة المحتوى مع رفع الصور/الملفات.
- **Content Blocks** — محتوى قابل للتكرار (خدمات الرئيسية، الإحصائيات، الرؤية والرسالة، الشهادات…).
- **Settings** — بيانات الشركة، نصوص الصفحات، فلاتر المشاريع.

---

## 🗃️ نموذج البيانات (Database)

- **`leads`** — رسائل التواصل وطلبات عروض الأسعار (النوع، الحالة، بيانات المرسل).
- **`settings`** — إعدادات key/value (بيانات الشركة، نصوص الصفحات…).
- **`product_categories`** / **`product_groups`** / **`featured_products`** — كتالوج المنتجات.
- **`projects`** · **`brands`** · **`consultants`** · **`services`** · **`downloads`** — محتوى الموقع.
- **`content_blocks`** — محتوى عام قابل للتكرار مُجمّع بحقل `group`.
- **`users`** — مستخدمو لوحة التحكم.

---

## 📧 إشعارات البريد

عند وصول عميل محتمل جديد يُرسل إشعار إلى `LEAD_INBOX` (في `.env`).
الافتراضي `MAIL_MAILER=log` — أي أن الرسائل تُكتب في `storage/logs/laravel.log` بدل إرسالها فعليًا. لإرسال بريد حقيقي اضبط SMTP في `.env`:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.yourhost.com
MAIL_PORT=587
MAIL_USERNAME=...
MAIL_PASSWORD=...
MAIL_FROM_ADDRESS=no-reply@sescoeg.com
LEAD_INBOX=mallamy@sescoeg.com
```

---

## 🎨 الهوية البصرية

| العنصر | اللون |
|--------|-------|
| Navy أساسي | `#13294B` |
| برتقالي (CTA) | `#F47A20` |
| أزرق ملكي | `#2155CC` |
| الخط | Inter |

الألوان معرّفة في `ses-website/tailwind.config.js` — تُغيَّر من مكان واحد.

---

## 📦 أوامر مفيدة (Cheat Sheet)

```bash
# Frontend (داخل ses-website)
npm run dev            # سيرفر تطوير
npm run build          # بناء نسخة الإنتاج (dist/)
npm run preview        # معاينة نسخة الإنتاج محليًا

# Backend (داخل ses-backend)
php artisan serve                 # تشغيل السيرفر
php artisan migrate --seed        # الجداول + البيانات الأولية
php artisan migrate:fresh --seed  # إعادة بناء القاعدة من الصفر
php artisan test                  # الاختبارات
```

---

## ⚠️ ملاحظات النشر (Deployment)

1. **الأسرار:** ملفات `.env` **لا تُرفع** على git (محميّة بـ `.gitignore`). اضبط قيم الإنتاج على السيرفر مباشرة.
2. **CORS:** أضف نطاق الموقع في `ses-backend/config/cors.php`.
3. **VITE_API_URL:** غيّره في بيئة الـ frontend ليشير إلى نطاق الـ API الحقيقي، ثم `npm run build`.
4. **قاعدة البيانات:** SQLite مناسبة للبداية؛ للإنتاج الأكبر يمكن التحويل إلى MySQL بتغيير `DB_*` في `.env`.
5. **رفع الملفات:** شغّل `php artisan storage:link` ليظهر مجلد `storage` العام.

---

© 2024 **SES Trading & Industries**.
