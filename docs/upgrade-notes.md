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

## 2026-10-06 — Offers and favorites

Needs the matching `api-gc` change (offers filter + `/favorites`): pull it and restart the API. `npm run doctor`
checks both. No new dependencies or environment variables.

`/ofertas` lists products with a lower price for the visitor's buyer profile. Signed-in customers save products with
the heart on cards and product pages and see them at `/favoritos` (also in the account menu); guests get a toast
offering to sign in. Store pages now mount the toaster (top center), so store toasts are visible again.

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
