# Nile Reach Global

Marketing site for Nile Reach Global — Sudanese agricultural commodities and livestock exporter.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · next-intl · Resend · Vercel

---

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000` — it will auto-redirect to `/en`.

## Locales

Six languages with locale-prefixed routing:

- `/en` — English (default)
- `/ar` — Arabic (RTL)
- `/fr` — French
- `/es` — Spanish
- `/de` — German
- `/zh` — Chinese (Simplified)

Translations live in `messages/{locale}.json`. The English file is the master copy — translate from there.

> **Note:** I translated the messages to give you a working preview. Please have a native speaker review the Arabic / French / Spanish / German / Chinese copy before launch.

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root (passes through)
│   └── [locale]/
│       ├── layout.tsx          # Locale layout (fonts, RTL, header, footer)
│       ├── page.tsx            # Homepage
│       ├── about/page.tsx      # Stub — Phase 2
│       ├── contact/page.tsx    # Stub — Phase 3 (form)
│       ├── quality/page.tsx    # Stub — Phase 2
│       ├── sustainability/page.tsx
│       └── products/
│           ├── page.tsx
│           ├── livestock/page.tsx
│           ├── crops/page.tsx
│           └── processed/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Logo.tsx                # SVG vector version of the brand mark
│   └── LanguageSwitcher.tsx
├── i18n/
│   ├── config.ts               # Locale list & RTL settings
│   ├── routing.ts              # next-intl routing
│   └── request.ts              # Server-side locale loading
└── middleware.ts               # Locale detection / redirect

messages/                       # Translation JSON files
public/
├── images/                     # Logo + photo assets
└── videos/                     # Video assets
```

## Brand

- **Primary:** Deep Nile `#0E2A47`
- **Accent:** Warm gold `#B8893E` / `#C9A961`
- **Earth:** `#4A7C5F`
- **Background:** Warm off-white `#FAF7F2`

- **Display font:** Fraunces (variable serif)
- **Body font:** Manrope
- **Arabic font:** Cairo

## Deploy to Vercel

1. Push to GitHub
2. Import repo on Vercel
3. Framework Preset: **Next.js**
4. Set environment variables (when contact form is added in Phase 3):
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` (e.g. `trade@nile-reach.com`)
5. Add custom domain `nile-reach.com`

## What's built (Phase 1 — updated)

✅ Project scaffold with i18n for 6 languages (RTL for Arabic)
✅ Header with language switcher and mobile menu
✅ Footer with company info
✅ Homepage: hero, stats, category cards, **product gallery (9 items with photos)**, about, quality, CTA
✅ SVG vector logo component (scales crisply at any size)
✅ Stub pages for all nav routes (so the build succeeds)
✅ **Real Unsplash photos for all products** (sesame, peanuts, wheat, sorghum/dura, sunflower, berseem, cattle, goats)

## Note on images

Product photos pull from Unsplash CDN (free for commercial use, no attribution required). All image URLs live in **`src/lib/products.ts`** — swap any one with your own photo:
1. Put your photo in `/public/images/your-photo.jpg`
2. Change the `image` field in `products.ts` to `/images/your-photo.jpg`
3. Done — no other code changes needed.

## What's next

**Phase 2:** Full product pages (livestock, crops, processed) · About page · Quality & Processing page (where the slaughterhouse/halal photos go)
**Phase 3:** Contact + inquiry form wired to Resend
**Phase 4:** SEO polish, sitemap, robots.txt, Vercel deploy

## Asset replacements needed

The homepage currently uses the live-sheep photo as the hero background. For Phase 2 you'll need:

- [ ] Cattle photos (live cows)
- [ ] Goat photos
- [ ] Sesame photos
- [ ] Berseem photos
- [ ] Peanut photos
- [ ] Wheat photos
- [ ] Dura (sorghum) photos
- [ ] Sunflower photos

The slaughterhouse photos are wired up to be used on the Quality & Processing page in Phase 2 (not on the homepage).
