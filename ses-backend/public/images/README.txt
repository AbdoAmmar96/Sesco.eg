==================================================================
  SES Trading & Industries — Image Guide / دليل الصور
==================================================================

الموقع شغال 100% من غير ما تحط أي صورة — في حالة غياب أي صورة بيظهر
Placeholder احترافي بلون الهوية + أيقونة القسم تلقائيًا (component: SmartImage).

عشان تحط الصور الحقيقية: حط الملفات هنا في public/images/ بنفس الأسماء
اللي تحت بالظبط (نفس الحروف الصغيرة والشرطات).

------------------------------------------------------------------
1) اللوجو (اختياري — حاليًا اللوجو متعمل SVG جوه الكود)
------------------------------------------------------------------
  logo.png            ← لو حطيته، افتح src/components/Logo.jsx واتبع التعليق لتفعيله

------------------------------------------------------------------
2) صور الـ Hero (أعلى كل صفحة) — مقاس مقترح: 1920×1080
------------------------------------------------------------------
  hero-home.jpg
  hero-about.jpg
  hero-products.jpg
  hero-services.jpg
  hero-projects.jpg
  hero-downloads.jpg
  hero-contact.jpg
  hero-fire-fighting.jpg
  hero-fire-alarm.jpg
  hero-water-network.jpg

------------------------------------------------------------------
3) صور كروت الأقسام الرئيسية (الهوم + صفحة المنتجات) — 800×600
------------------------------------------------------------------
  cat-fire-fighting.jpg
  cat-fire-alarm.jpg
  cat-water-network.jpg

------------------------------------------------------------------
4) صور الخدمات (صفحة Services) — 800×600
------------------------------------------------------------------
  service-fire-fighting-installation.jpg
  service-fire-alarm-systems.jpg
  service-mep-contracting.jpg
  service-plumbing-systems.jpg
  service-drainage-sewage.jpg
  service-pump-installation.jpg
  service-testing-commissioning.jpg
  service-maintenance.jpg

------------------------------------------------------------------
5) صورة قسم "Who We Are" في صفحة About — 800×600
------------------------------------------------------------------
  about-pumproom.jpg

------------------------------------------------------------------
6) صور المشاريع (صفحة Projects) — 800×600
------------------------------------------------------------------
  project-residential-compound.jpg
  project-commercial-tower.jpg
  project-industrial-facility.jpg
  project-hospital-project.jpg
  project-water-treatment-plant.jpg
  project-infrastructure-project.jpg

------------------------------------------------------------------
7) صور المنتجات (اختيارية تمامًا) — 400×400 مربعة
------------------------------------------------------------------
كل منتج في الموقع له صورة اختيارية بالاسم:  p-<اسم-المنتج>.jpg
طريقة التسمية: الاسم بالحروف الصغيرة، المسافات تتحول لشرطة (-)،
والرموز زي ° ² & ( ) / بتتشال.

أمثلة:
  "Gate Valves"            →  p-gate-valves.jpg
  "Fire Hydrants"          →  p-fire-hydrants.jpg
  "Diesel Fire Pumps"      →  p-diesel-fire-pumps.jpg
  "FM-200 Systems"         →  p-fm-200-systems.jpg
  "Upright Sprinkler KS.6 (68°C)"  →  p-upright-sprinkler-ks6-68c.jpg

لو الصورة مش موجودة بيظهر placeholder بالأيقونة — فمش لازم تكملهم كلهم.

==================================================================
كل الصيغ مدعومة (jpg / png / webp) — غيّر الامتداد في siteData.js لو لزم.
==================================================================
