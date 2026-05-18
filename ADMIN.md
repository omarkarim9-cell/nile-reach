# Admin Panel — Image Manager

A simple password-protected page at `/admin` lets non-technical users replace product images without touching code.

## What it does

- Lists all products with their current images
- Click **Replace** on any product → upload a new JPG/PNG/WebP → it's live on the site within seconds
- Click **Reset** to revert to the default image from `src/lib/products.ts`
- Shows a "Custom" badge on products that have an override

## Setup (one-time)

### 1. Vercel Blob (image storage)

1. In your Vercel project → **Storage** tab → **Create Database** → **Blob**
2. Name it `nile-reach-images`
3. Vercel automatically adds `BLOB_READ_WRITE_TOKEN` to your project env vars

### 2. Neon Postgres (image-to-product mapping)

1. In Vercel → **Storage** → **Create Database** → **Neon**
2. Name it `nile-reach-db`
3. Vercel automatically adds `DATABASE_URL`
4. The table is created automatically on first use — no migration needed

### 3. Admin password & session secret

In Vercel → **Settings → Environment Variables**, add:

| Name | Example value | Notes |
|---|---|---|
| `ADMIN_PASSWORD` | your-strong-password | What you type at `/admin/login` |
| `SESSION_SECRET` | 32+ random characters | Used to encrypt the session cookie. **Must be 32+ chars.** Generate one with: `openssl rand -base64 32` |

After adding, redeploy (Deployments → "..." → Redeploy).

## Usage

1. Visit `https://nile-reach.com/admin`
2. Enter the password
3. Click **Replace** on any product, choose a file, done
4. Refresh the main site — new image appears

**Image specs that work best:**
- Format: JPG, PNG, or WebP
- Max size: 10 MB
- Aspect ratio: 4:3 or square (the site crops to fit)
- Resolution: at least 1200×900 px for crisp display on large screens

## Resetting an image

Click **Reset** on a product to remove the override — the site falls back to the default image shipped with the code. Useful if you uploaded the wrong thing.

## Local development

Locally (with no env vars set), the admin page will tell you what's missing. To test locally with real uploads:
1. Copy your production `BLOB_READ_WRITE_TOKEN` and `DATABASE_URL` to `.env.local`
2. Add `ADMIN_PASSWORD` and `SESSION_SECRET` to `.env.local`
3. `npm run dev`

## Costs

- **Vercel Blob:** ~$0.15/GB/month storage. For 20 product images × 500 KB each = 10 MB total = ~$0.0015/month.
- **Neon Postgres:** Free tier covers this (table has at most a few dozen rows).
- **Total:** essentially free.
