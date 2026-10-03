# Data fetching

## Where to fetch

- Server Components fetch through `src/services/` for initial page data (catalog, product page) — good for SEO.
- Client-side, use TanStack Query (React Query) for all server state — no `useEffect + fetch` for data loading.
- Define query keys as constants in `src/lib/query-keys.ts`.
- Mutations use `useMutation` with `onSuccess` / `onError` callbacks and invalidate the affected queries.

## Services layer

- All API calls live in `src/services/` — components and hooks never call `fetch` directly
- One file per domain: `src/services/products.service.ts`, `src/services/orders.service.ts`
- Every service function must have typed request params and typed return value
- The API base URL comes from an environment variable (`NEXT_PUBLIC_API_URL`), never hardcoded
- Nothing secret goes in a `NEXT_PUBLIC_*` variable — those reach the browser

## Typing

- Define request and response types in `src/types/api/`, matching `api-gc/docs/endpoints.md`
- Never trust the API response as `any` — always parse and type it
- Money comes from the API as decimal strings (`"1234.50"`) — see `commerce.md`
