# Performance

## Memoization

- Do not use `React.memo`, `useMemo`, or `useCallback` by default
- Add them only after measuring a real performance problem (React DevTools Profiler)
- Premature memoization adds complexity without benefit

## Code splitting

- Lazy-load heavy client components that are not needed on first render (assistant chat, configurator, modals,
  charts) with `next/dynamic`
- Keep `'use client'` boundaries small so less JavaScript ships to the browser

## Store-specific

- Catalog and product pages must be fast and indexable: render them on the server
- Optimize product images with `next/image` (correct `sizes`, priority only for the above-the-fold image)
- Watch Core Web Vitals (LCP, CLS, INP) — mobile users on slow connections are the baseline

## Re-renders

- Identify hook dependencies carefully — an incorrect dependency array causes silent bugs
- Prefer stable references for callbacks passed to child components when those children are memoized
