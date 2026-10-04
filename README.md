# RideGrin — متجر منتج واحد (دروب شوبينق + Stripe)

## التشغيل
```bash
cp .env.example .env.local   # حط مفاتيح Stripe
npm install
npm run dev                  # http://localhost:3000
```

## تعديل المتجر
كل شي في ملف واحد: `src/lib/product.ts`
- اسم المتجر، المنتج، التصاميم، المميزات، الأسئلة
- الباقات (1/2/3) والأسعار بالسنت (2999 = ‎$29.99)
- الإضافات (الضمان، الشحن السريع، حماية الشحنة)
- الدول اللي تشحن لها
- الصور: حطها في `public/products/` وعدّل `images`

## Stripe
1. **المفتاح:** Dashboard ← Developers ← API keys ← انسخ `sk_test_...` إلى `STRIPE_SECRET_KEY`.
2. **الويب هوك (عشان توصلك الطلبات):**
   - محلياً: `stripe listen --forward-to localhost:3000/api/webhooks/stripe` وانسخ `whsec_...`
   - بعد النشر: Developers ← Webhooks ← أضف `https://دومينك/api/webhooks/stripe` واختر حدث `checkout.session.completed`.
3. جرّب بالبطاقة التجريبية `4242 4242 4242 4242`، وبعدها بدّل إلى `sk_live_...`.

## دورة الطلب (دروب شوبينق)
1. العميل يختار الباقة والتصاميم ويدفع في صفحة Stripe (يدخل عنوانه وجواله).
2. Stripe يرسل للويب هوك ← المتجر يجهّز "طلب تنفيذ" فيه: الاسم، العنوان، الجوال، التصاميم، الإضافات.
3. لو حطيت `ORDER_WEBHOOK_URL` (Zapier / Make) ينرسل الطلب هناك تلقائياً، مثلاً لسطر في Google Sheets أو رسالة.
4. تطلب المنتج من المورّد (CJdropshipping / AliExpress) بعنوان العميل، وترسل له رقم التتبع.

> كل الطلبات موجودة كذلك في Stripe ← Payments، ومعها التفاصيل في Metadata.

## النشر
```bash
npm i -g vercel && vercel
```
وأضف نفس متغيرات `.env.local` في إعدادات المشروع على Vercel.

## المورّد (AliExpress)
الصور في `public/products` مأخوذة من إعلانات هالموردين لنفس المنتج. افتح الروابط، قارن السعر والتقييم ومدة الشحن، واطلب عينة قبل البيع:
- https://www.aliexpress.us/item/3256813108925921.html (الثلاث تصاميم)
- https://www.aliexpress.us/item/3256813129593583.html
- https://www.aliexpress.us/item/3256813127944382.html
- https://www.aliexpress.us/item/3256813137552037.html
- https://www.aliexpress.us/item/3256813129266143.html
