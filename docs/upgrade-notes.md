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

## 2026-10-03 — Session checks (this change)

1. Create `.env.local` if you do not have it: `cp .env.example .env.local`.

## 2026-10-03 — Login and account (LumarSoft/front-gc#2)

1. `npm install` (new packages: `@tanstack/react-query`, `react-hook-form`, `zod`, `@hookform/resolvers`).
2. `.env.local` must have `NEXT_PUBLIC_API_URL=http://localhost:3001`.
3. Needs `api-gc` with LumarSoft/api-gc#2 (authentication).

## 2026-10-03 — Home page (LumarSoft/front-gc#1)

1. `npm install` (shadcn/ui and `@phosphor-icons/react`).
