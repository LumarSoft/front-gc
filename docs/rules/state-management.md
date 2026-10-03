# State management

## Decision rules

- `useState`: local UI state only (open/close modal, form input value, toggle)
- `useReducer`: complex local state with multiple transitions (e.g. configurator steps)
- TanStack Query: all server/async state — do not duplicate server data in global state
- Zustand (or Context): shared client state that multiple components need (e.g. cart drawer open, current user)
- URL search params: catalog filters, sorting and pagination — so results are shareable and survive a reload

## Prop drilling

- Maximum 2 levels of prop passing — if you need a third, lift to Context or global state
- Prefer TanStack Query's cache over passing server data through props

## Global state rules

- Global state holds data only — no business logic, no API calls inside stores
- Keep stores small and scoped by domain (e.g. `useCartUiStore`, `useAuthStore`)
- The cart's source of truth is the API; local state only mirrors it for instant UI feedback
