# Hi‑Tech Fabrication — Starter

Industrial, cinematic landing site laid out like the structure we discussed (hero → services → projects → badges → testimonials → CTA), powered by **Next.js (App Router) + Tailwind** with content in **Supabase**. Deploy on **Vercel**. Keep **Cloudflare** as **DNS‑only** (no proxy/CDN).

---

## Quick start

```bash
# 1) Install deps
npm i

# 2) Copy env
cp .env.example .env.local

# 3) Start dev
npm run dev
```

---

## Configure Supabase

1. Create a new project at https://supabase.com/ and grab:
   - Project URL
   - Anon public key
   - Service role key (server-only)

2. In **Storage**, create a bucket `media` (public). Upload images if desired (paths mirror `/public/media/*`).

3. Open the **SQL editor** and run the contents of `supabase.sql` to create tables and RLS policies.

4. Put these in `.env.local` (and Vercel → Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - (optional) `SITE_URL`

> Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser. It is only used in server routes (`app/api/lead/route.ts`).

---

## GitHub → Vercel → Cloudflare (DNS‑only)

### 1) GitHub
- Create a repository (e.g., `hi-tech-fabrication`) and push this folder as the initial commit.

### 2) Vercel
- Import the repo in Vercel.
- Set the environment variables in **Project → Settings → Environment Variables**.
- First deploy will create a preview + production deployment.
- Add your custom domain in **Project → Settings → Domains** (Vercel shows the exact DNS target you must use).

### 3) Cloudflare (DNS only, no proxy)
- In your Cloudflare zone:
  - Create an **A** record for the apex (`@`) to the **A value Vercel shows** for your project (historically `76.76.21.21`, but use the exact value shown in Vercel).
  - Create a **CNAME** for `www` to the **target Vercel shows** (historically `cname.vercel-dns.com` or a newer project‑specific target).
  - Make sure both records are **DNS‑only (grey cloud)**, not proxied.
- Remove any old Cloudflare Pages/Workers used to host the site so the domain is only served by Vercel.

> Tip: You can verify DNS with `dig A yourdomain.tld +short` and `dig CNAME www.yourdomain.tld +short`.

---

## Layout & sections

- **Header** — sticky/glassy, logo left, nav center/right, CTA button “Request a quote”.
- **Hero** — full‑bleed media w/ dark gradient overlay, large condensed headline, subheadline, primary CTA.
- **Services** — 3‑up grid of capabilities (icons + title + short blurb).
- **Featured Projects** — image cards linking to details; `/projects/[slug]` supports Markdown body.
- **Badges/Certifications** — inline strip with 3+ logos.
- **Testimonials** — stacked cards (simple and trustworthy).
- **CTA band** — strong ask with route to `/contact`.

All content tables can be edited in Supabase; pages revalidate every 60s.

---

## Local development

- `npm run dev` → http://localhost:3000
- Update `.env.local` so server‑side `/api/lead` can insert into `leads`.
- Replace placeholder images in `/public/media/*` or use Supabase Storage public URLs.

---

## Deploy

- Push to `main` → Vercel automatically builds and deploys production.
- Pull Requests → preview URLs.

---

## Troubleshooting

- If domain verification fails on Vercel, double‑check you used the **exact** A/CNAME values Vercel shows for your project.
- If you had Cloudflare proxy (orange cloud) on those records, switch them to **DNS‑only (grey cloud)**.
- If old Cloudflare Pages projects exist, delete the *project* (not just deployments) so it no longer serves your domain.

---

## License

MIT — customize freely.
