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

## 2026-10-08 — Frequent customers in the admin

Pull `api-gc` too (LumarSoft/api-gc#23: `GET /admin/wholesale-applications?q=` and `/counts`) and restart it. With an
older API the status counters and the "Clientes frecuentes" badge stay empty and the search is ignored (`npm run
doctor` cannot tell: both API versions answer 401 without a session).

---

## 2026-10-08 — Period picker on the admin home

Pull `api-gc` too (LumarSoft/api-gc#22: `GET /admin/dashboard?from=&to=`) and restart it. With an older API the home
ignores the chosen period (it always shows the last 30 days).

---

## 2026-10-08 — Admin settings

Pull `api-gc` too (LumarSoft/api-gc#21: `/admin/settings`) and restart it. "Configuración" moved to the bottom of the
sidebar; "Cotización del dólar" now lives under it (same URL, `/admin/cotizacion`). Rosario delivery stays off until
someone sets its rate there — the client has to provide the real rate and free-shipping amount.

---

## 2026-10-08 — Admin home

Pull `api-gc` too (LumarSoft/api-gc#20: `GET /admin/dashboard`) and restart it. With an older API the admin home shows
"No pudimos cargar el resumen" with a retry button; the rest of the panel works.

---

## 2026-10-07 — Bulk actions in the admin product list

Pull `api-gc` too (LumarSoft/api-gc#19: `POST /admin/products/bulk`) and restart it. With an older API the selection bar
shows an error toast when an action is run; nothing else changes.

---

## 2026-10-07 — Admin orders views, search and counters

Pull `api-gc` too (LumarSoft/api-gc#18: `GET /admin/orders?stage=&q=` and `GET /admin/orders/counts`) and restart it.
With an older API, choosing a view or searching shows an error (it rejects the new parameters) and the "Pedidos"
counter stays hidden. No doctor
check: every `/admin` route answers 401 without a session, old or new, so the version cannot be told apart.

---

## 2026-10-06 — Frequent customers

Needs the matching `api-gc` change (`/wholesale-applications`): pull it and restart the API. `npm run doctor` checks
it. No new dependencies or environment variables.

`/clientes-frecuentes` explains the program and `/clientes-frecuentes/alta` lets a signed-in customer apply (CUIT
check digit validated in the browser too) and see their status; "Mi cuenta" links there. Staff review applications
at `/admin/clientes-frecuentes` (Ventas): approve, reject or pause with a reason the customer sees, resume.
No documents are requested yet.

## 2026-10-06 — Offers and favorites

Needs the matching `api-gc` change (offers filter + `/favorites`): pull it and restart the API. `npm run doctor`
checks both. No new dependencies or environment variables.

`/ofertas` lists products with a lower price for the visitor's buyer profile. Signed-in customers save products with
the heart on cards and product pages and see them at `/favoritos` (also in the account menu); guests get a toast
offering to sign in. Store pages now mount the toaster (top center), so store toasts are visible again.

## 2026-10-05 — API hosted on Linux with a same-origin session proxy

1. Add the optional `API_UPSTREAM_URL` from `.env.example` (leave it empty for direct local API access).
2. On Vercel set `NEXT_PUBLIC_API_URL=/api` and `API_UPSTREAM_URL=https://api-cg.lumarsoft.com`, then redeploy.
   Server requests and image optimization use the upstream directly; browser requests use the `/api` rewrite.
3. The upstream must leave `COOKIE_DOMAIN` empty and set `COOKIE_SECURE=true`. Its Nginx proxy must translate
   the refresh cookie path with `proxy_cookie_path /auth /api/auth;`, and the guest cart
   cookie (path `/cart`, added with the cart) with `proxy_cookie_path /cart /api/cart;`. The access cookie keeps its `/` path,
   allowing Server Components to read the browser's session without sharing cookies across unrelated domains.

## 2026-10-05 — Guest order confirmation and private tracking

Apply the guest-orders migration in `api-gc`, regenerate Prisma and restart both apps. Frontend doctor checks admin
orders, safe token validation on `/orders/recover` and the preview's new fields. No frontend dependencies or env vars.

The customer confirms a MANUAL pending-payment order, without registration or external providers. `reviewToken`
detects stale reviews; the browser generates/persists a secure attempt token before POST so retries are idempotent.
A lost response can be recovered from checkout using that token. Tracking lives at `/pedidos/[number]#acceso=<token>`;
only the browser reads the fragment and sends it in a POST body, with no shared caching/indexing/referrers. The buyer
must bookmark/copy the private link: this stage sends no emails. Tokens are bearer capabilities and contain no PII;
never add them to logs/analytics or share links publicly. New navigation uses `/pedidos` as a paste-link entry point.

`/admin/pedidos` lists/filters/pages orders, and each detail permits the next backend-approved states. Manual payment
confirmation requires staff to explicitly check receipt of the full amount. Paid refunds/cancellation, carrier tracking,
current-account charging and invoices remain future work. An API warning flags failed/stuck stock expiration.

Manual reservation uses the provisional API window (default 24 hours, configurable via `Setting.reservation.manualHours`).
Marketing claims about Mercado Pago/automatic carrier quoting/sample free-shipping thresholds were removed to match
this scope. Other sample company/legal/wholesale content still requires the client's real information.

## 2026-10-05 — Checkout preparation

Needs the matching `api-gc` checkout change: restart the backend after pulling. `npm run doctor` checks
`/cart/checkout`. No new dependencies, environment variables or migrations.

The cart links to `/finalizar-compra`: contact details, delivery options and a server-calculated review. Payment,
order creation and stock reservations are not enabled yet; payment credentials and guest-order policy remain pending.
Local delivery reads existing `ShippingMethod` configuration; missing tariffs and carrier quotes stay unavailable.

## 2026-10-05 — Cart

Needs the matching `api-gc` cart change: pull the backend and restart it. `npm run doctor` checks `/cart`.
No new dependencies or environment variables. `/carrito` supports guests and users; checkout is still pending.

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
