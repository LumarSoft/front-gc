'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/**
 * A list's filters and page, kept in the URL with the list's own `parse` / `serialize`. Any change but the page goes
 * back to page 1.
 */
export function useSystemListParams<Q extends { page?: number }>(
  parse: (params: URLSearchParams) => Q,
  serialize: (query: Q) => string,
) {
  const router = useRouter()
  const pathname = usePathname()
  const query = parse(new URLSearchParams(useSearchParams().toString()))

  const update = (changes: Partial<Q>): void => {
    const next = { ...query, ...('page' in changes ? {} : { page: undefined }), ...changes }
    router.replace(`${pathname}${serialize(next)}`, { scroll: false })
  }

  return { query, update }
}
