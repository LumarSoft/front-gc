# Components

## General

- Functional components only — no class components
- Separate logic from rendering: extract business logic into custom hooks
- No business logic inside a component's JSX — the component should only render

## Server and Client Components

- **Server Components by default.** Add `'use client'` only when the component needs state, effects, event
  handlers or browser APIs.
- Push `'use client'` as far down the tree as possible (the interactive leaf, not the whole page).
- Never import server-only code (secrets, server env vars) into a Client Component.

## shadcn/ui

- Use shadcn/ui components as the UI base whenever a suitable component exists
- Do not rebuild from scratch what shadcn already provides (Button, Input, Dialog, Sheet, etc.)
- Customize via Tailwind classes or CSS variables, never by modifying shadcn source files directly

## Reusability

- If a component is used in more than one place, it lives in `src/components/ui/`
- If a component is specific to a business domain, it lives in `src/features/<domain>/components/`
- A component used by a single route can live in a private `_components/` folder inside that route

## components/ui vs features

- `src/components/ui/`: generic, reusable, domain-agnostic (e.g. `PageHeader`, `EmptyState`, `PriceTag`)
- `src/features/`: specific to the business (e.g. `ProductCard`, `CartSummary`, `WholesaleStatusBadge`)
- Never import from `features/` inside `components/ui/` — the dependency goes one way only

## Hooks

- Custom hooks live in `src/hooks/` (shared) or `src/features/<domain>/hooks/` (domain-specific)
- A hook that is only used by one component can live next to that component, but must be in its own file
- Never define a hook inside a component file
