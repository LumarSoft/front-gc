# Error handling

## Async

- Always wrap async calls in try/catch or handle with `.catch()` / TanStack Query's `onError` — no unhandled promise
  rejections
- Surface errors to the user with a clear message in Spanish — never swallow errors silently

## Routes

- Every route segment with data has a `loading.tsx` and an `error.tsx`
- `not-found.tsx` for missing products/categories (call `notFound()` when the API returns 404)

## React

- Use Error Boundaries around route segments and heavy feature areas (assistant, configurator, checkout)
- Provide a fallback UI in every Error Boundary — never show a blank screen

## Logging

- No `console.log` in committed code
- `console.error` is allowed temporarily during development but must not be committed
