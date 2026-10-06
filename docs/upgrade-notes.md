# Upgrade notes

Manual steps needed after pulling. **Newest first.** `npm run doctor` checks most of them automatically.

Every PR that needs a manual step (new env var, new package, a backend change you must pull too…) adds an entry here
**and**, when possible, a check in `scripts/doctor.mjs`.

## Always, after every pull

```bash
npm install
npm run doctor     # tells you if anything else is missing
```

The store needs the API running: keep `api-gc` up to date too (its own `npm run doctor`).

---

## 2026-10-05 — API hosted on Linux with a same-origin session proxy

1. Add the optional `API_UPSTREAM_URL` from `.env.example` (leave it empty for direct local API access).
2. On Vercel set `NEXT_PUBLIC_API_URL=/api` and `API_UPSTREAM_URL=https://api-cg.lumarsoft.com`, then redeploy.
   Server requests and image optimization use the upstream directly; browser requests use the `/api` rewrite.
3. The upstream must leave `COOKIE_DOMAIN` empty and set `COOKIE_SECURE=true`. Its Nginx proxy must translate
   the refresh cookie path with `proxy_cookie_path /auth /api/auth;`. The access cookie keeps its `/` path,
   allowing Server Components to read the browser's session without sharing cookies across unrelated domains.

## 2026-10-05 — Variants, prices and exchange rate (LumarSoft/front-gc#12)

1. Needs `api-gc` with LumarSoft/api-gc#12: pull it and restart its `npm run dev`.

## 2026-10-05 — Admin products (LumarSoft/front-gc#11)

1. Needs `api-gc` with LumarSoft/api-gc#11 (admin products): pull it and restart its `npm run dev`.

## 2026-10-04 — Admin panel shell (LumarSoft/front-gc#7)

1. Needs `api-gc` with the admin endpoints (LumarSoft/api-gc#6 and #7): pull it and **restart** its `npm run dev`.
2. `/admin` only opens for users with role `ADMIN`. Create yours in `api-gc`:
   ```bash
   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='YourPass123' npm run admin:create
   ```

## 2026-10-04 — Store connected to the catalog (LumarSoft/front-gc#4)

1. Needs `api-gc` up to date with the catalog (LumarSoft/api-gc#3) **and its seed loaded**
   (`npm run db:seed` in `api-gc`), otherwise the store shows no products.
2. Restart `npm run dev` after pulling: `next.config.ts` changed (product images come from the API).

## 2026-10-03 — Setup doctor (LumarSoft/front-gc#3)

1. Create `.env.local` if you do not have it: `cp .env.example .env.local`.

## 2026-10-03 — Login and account (LumarSoft/front-gc#2)

1. `npm install` (new packages: `@tanstack/react-query`, `react-hook-form`, `zod`, `@hookform/resolvers`).
2. `.env.local` must have `NEXT_PUBLIC_API_URL=http://localhost:3001`.
3. Needs `api-gc` with LumarSoft/api-gc#2 (authentication).

## 2026-10-03 — Home page (LumarSoft/front-gc#1)

1. `npm install` (shadcn/ui and `@phosphor-icons/react`).
