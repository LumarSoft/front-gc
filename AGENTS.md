<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Guidance for AI coding agents (Claude Code, Cursor, Codex, Copilot…) and humans working in this repository.
**Read this file and every file in `docs/rules/` before writing code.** The block above is managed by Next.js — do
not edit or remove it.

## Start of every session (humans and AI agents)

1. Run `npm run doctor`. It checks Node, dependencies, `.env.local` and that the API answers, and prints the exact
   command to fix each problem. (Claude Code runs it automatically on session start through `.claude/settings.json`.)
2. If it reports problems, fix them **before** any other work, using `docs/upgrade-notes.md` for context. The API has
   its own doctor: if the API is the problem, run it in `../api-gc`.
3. When your change requires a manual step from the other developers, add an entry at the top of
   `docs/upgrade-notes.md` and a check in `scripts/doctor.mjs` in the same PR.

## Project

E-commerce for **Comunicaciones Gráficas SRL**, a print shop in Rosario (Argentina) and official Epson reseller. Today
they sell over WhatsApp; the store must let customers learn, choose and buy on their own, and reduce manual work for
the company.

This repo is the **frontend** (`front-gc`). The backend lives in a separate repo (`api-gc`) built with NestJS +
Prisma + MySQL. **The front never talks to the database** — everything goes through the API.

What the front will have:

- **Store**: catalog by category and brand, search, filters, favorites, product comparison, cart and checkout
  (Mercado Pago or bank transfer). Free in-store pickup, Rosario delivery, shipping quotes for the rest of the country.
- **Two buyer profiles**: retail customers and **wholesale** companies. Wholesalers fill a company sign-up form
  (CUIT, legal name, tax status, documents); once approved they see wholesale prices and their **current account**
  (balance, due dates, payments).
- **My account**: orders and tracking, addresses, invoices, repeat a previous purchase.
- **AI assistant** embedded in the store that advises customers and leads them to the cart, and a **guided
  configurator** ("build your setup", basic / PRO mode) that asks questions and recommends the right product.
- **Admin panel**: products, prices, stock, wholesalers, orders, CRM and stats.

**Visual identity**: clean, minimal and warm, with a modern, dynamic touch. Main reference: **epson.com.ar** (then
eco3 and Agfa). The client is an **official Epson distributor**, so Epson images, logos and assets can be used; the
store's own identity stays Comunicaciones Gráficas. Less corporate, more human and creative. Mobile first: a lot of
traffic will come from phones and Instagram. Details in @docs/rules/ui-and-styling.md.

## Commands

```bash
npm run dev       # Start dev server (Turbopack, http://localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Local setup

When asked to set up or run the project locally, follow the **Installation** section of `README.md`:

1. `npm install` (also installs the Husky hook).
2. `npm run dev` and verify `http://localhost:3000` shows the page.
3. If the task needs the API, it must be running from the sibling repo `../api-gc` (see its `AGENTS.md` → Local
   setup). Do not mock or hardcode API responses to work around a missing backend unless the user asks for it.

If a step fails, check the **Troubleshooting** table in `README.md` before trying anything else.

## Stack

- **Framework**: Next.js 16 App Router, React 19
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript (strict mode)
- **UI base**: shadcn/ui (add components with `npx shadcn@latest add <component>` when first needed)
- **API communication**: native `fetch` to the NestJS backend through `src/services/`
- **State management**: TanStack Query for server state, `useState`/`useReducer` for local state

## Architecture

Routes live under `app/`. Everything else lives under `src/`:

```
app/
  (shop)/            # public store: home, catalog, product, cart, checkout
  (account)/         # logged-in customer area
  (wholesale)/       # wholesale portal (application, current account)
  admin/             # admin panel
src/
  components/ui/     # generic reusable components (shadcn + our own)
  features/<domain>/ # domain modules: components/, hooks/, lib/ (catalog, cart, checkout, assistant, configurator…)
  hooks/             # shared custom hooks
  services/          # API calls (fetch wrappers), one file per domain
  lib/               # utils, helpers, formatters, query keys
  types/             # shared types (API request/response types in types/api/)
```

Path alias `@/*` resolves to the repo root (`@/src/components/ui/button`).

Current state: the store reads the **real catalog** from the API: home featured products, `/productos` (all products +
search `?q=`), `/categorias/[slug]` and `/productos/[slug]`. Catalog data is fetched on the server through
`src/services/catalog.service.ts` → `serverApiRequest` (`src/lib/server-api.ts`), which forwards the visitor's
session so prices match their buyer profile; render `<SessionRefresh when={sessionExpired} />` on pages that use it.
Filters live in the URL (`src/features/catalog/lib/catalog-params.ts`). **Auth is live**: `app/(auth)/`,
`/mi-cuenta`, the header account menu; browser calls go through `apiRequest` (`src/lib/api-client.ts`). **Admin panel** lives in `app/admin/` +
`src/features/admin/`: the layout checks the role on the server (`getServerSession`, `src/services/session.server.ts`;
customers get a 404, expired sessions are renewed in the browser) and admin pages load data client-side with TanStack
Query through `src/services/admin-*.service.ts`. Each admin section adds itself to `ADMIN_NAV`
(`src/features/admin/lib/admin-nav.ts`). The admin has its own dense theme (`app/admin-theme.css`, switched on by `data-admin-shell`
for the whole document, portals included; the store is untouched) and shared list pieces in
`src/features/admin/components/common/` (`IndexFilters`, `ViewTabs`, `FilterPill`, `SortMenu`, `IndexTable`,
`ToneBadge`): new admin screens build on them. ⌘K opens the search palette (`components/search/`). **Cart is live**: `/carrito` + `src/features/cart/`, browser-only calls through
`src/services/cart.service.ts`. Guests use an httpOnly API cookie; after login the API combines their cart with the
user's cart. TanStack Query keys separate carts by session; the API computes every subtotal and validates stock.
The header and successful product additions open a lazy-loaded right-side cart drawer, controlled by
`CartDrawerProvider` in the shop layout; `/carrito` remains available as a standalone page. Both surfaces reuse
`CartView` and the same API-backed controls. **Checkout preparation** lives at `/finalizar-compra` +
`src/features/checkout/`, with `/cart/checkout` and `/cart/checkout/preview` through `checkout.service.ts`.
Contact details and delivery are validated before a server-calculated review. Guest confirmation now creates a pending manual-payment order and reserves stock through `/cart/checkout/orders`.
`src/features/orders/` renders private fragment-link tracking at `/pedidos/[number]`, with a paste-link entry page
at `/pedidos`. Admin orders at `/admin/pedidos` (`src/features/admin/components/orders/`) list by stage with search and live counters (nav badge), and each order shows contextual next steps (mark paid with explicit verification, prepare, ready/shipped, delivered), cancellation with an internal reason and a staff history. No external providers
or order emails are enabled. The provisional reservation window comes from the API (default 24 hours). **Frequent customers** ("clientes frecuentes", `wholesale` in code): `src/features/wholesale/` holds
the application form and status (`/clientes-frecuentes/alta`) and shared labels; staff review at
`/admin/clientes-frecuentes`. **Offers and favorites**: `/ofertas` reuses `CatalogView`
with `onSale`; `src/features/favorites/` holds the heart button (cards and product page) and `/favoritos`, for
signed-in customers only (browser calls through `favorites.service.ts`). Linked
sections that are not ready (legal, help, about/contact, assistant, configurator, frequent customers) render
`UpcomingPage` with copy from `src/features/content/lib/upcoming-pages.ts` (noindex); replace each page when its real
content or feature lands — never put invented policies or company data there. Create folders as they are needed,
following this structure.

## Code conventions

- Functional components only, no class components
- Custom hooks for logic extraction — no business logic inside components
- `src/services/` makes every API call; components never `fetch` directly
- No prop drilling deeper than 2 levels — use Context or TanStack Query
- Files: `kebab-case`. Components: `PascalCase`. Functions/variables: `camelCase`
- Always type with TypeScript, `any` is forbidden
- Code and comments in English; **user-facing text in Spanish (Argentina)**

## Formatting

Prettier is enforced on every commit via Husky + lint-staged (config in `.prettierrc`). Never fix formatting by hand —
let Prettier handle it.

## Next.js 16 breaking changes

- **Async Request APIs** — `cookies()`, `headers()`, `params`, `searchParams` are Promises. Always `await` them.
- **`middleware` → `proxy`** — use `proxy.ts`, with the export named `proxy`.
- **Turbopack is the default** — no flag needed.
- **Parallel route slots** — every `@slot` directory requires an explicit `default.js`.
- **`next lint` removed** — use `eslint` directly.
- When in doubt, read the guide in `node_modules/next/dist/docs/` before using an API.

## Tailwind CSS v4

Use `@import "tailwindcss"`. Theme tokens go inside `@theme inline { ... }` in `app/globals.css`. There is no
`tailwind.config` file.

## ESLint

Flat config only (`eslint.config.mjs`). No `.eslintrc.*` files.

## Development rules

- @docs/rules/code-style.md
- @docs/rules/components.md
- @docs/rules/ui-and-styling.md
- @docs/rules/state-management.md
- @docs/rules/data-fetching.md
- @docs/rules/commerce.md
- @docs/rules/error-handling.md
- @docs/rules/performance.md
- @docs/rules/git.md

## Rules for AI agents

1. **Scope**: do only what was asked. Do not refactor, rename or redesign unrelated code — mention it at the end.
2. **Do not invent business data** (prices, shipping policies, legal texts, company data). Use sample data clearly
   marked as such, or ask.
3. **Reuse before creating**: check `src/components/ui/`, shadcn/ui and `src/features/` before writing a new
   component. Do not duplicate styles.
4. **Dependencies**: do not add packages without justifying it in your final summary.
5. **Do not touch** the Next.js block above, TypeScript/ESLint config to silence errors, or `package-lock.json` by
   hand. No `eslint-disable` / `@ts-ignore` without a comment explaining why.
6. **Verify before finishing**: `npm run lint` passes, and `npm run build` passes if you touched routes, layouts or
   config.
7. **Final summary**: what you changed, what you could not verify, and any decision you made on your own.
