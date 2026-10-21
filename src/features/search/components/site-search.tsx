'use client'

import { useSearchParams } from 'next/navigation'
import { DesktopSearch } from '@/src/features/search/components/desktop-search'
import { MobileSearch } from '@/src/features/search/components/mobile-search'

type SiteSearchProps = {
  variant: 'desktop' | 'mobile'
  className?: string
}

/**
 * The header search with what the page searched for (`?q=`). It starts over when that changes, so the field shows
 * the search of the page the customer is on. Reads the URL, so the header renders it inside `<Suspense>`.
 */
export function SiteSearch({ variant, className }: SiteSearchProps) {
  const query = useSearchParams().get('q')?.trim() ?? ''
  return variant === 'desktop' ? (
    <DesktopSearch key={query} initialQuery={query} className={className} />
  ) : (
    <MobileSearch key={query} initialQuery={query} className={className} />
  )
}
