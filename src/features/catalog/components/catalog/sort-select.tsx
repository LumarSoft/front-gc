'use client'

import { useRouter } from 'next/navigation'
import { CaretDownIcon } from '@phosphor-icons/react'
import { SORT_OPTIONS } from '@/src/features/catalog/lib/catalog-params'
import type { ProductSort } from '@/src/types/api/catalog'

type SortSelectProps = {
  value: ProductSort
  /** URL for each option, built on the server so it keeps every other filter. */
  hrefs: Record<ProductSort, string>
}

/** Native select: the most usable control on phones (opens the system picker). */
export function SortSelect({ value, hrefs }: SortSelectProps) {
  const router = useRouter()

  return (
    <label className="relative flex items-center">
      <span className="sr-only">Ordenar por</span>
      <select
        value={value}
        onChange={event => router.push(hrefs[event.target.value as ProductSort], { scroll: false })}
        className="h-11 appearance-none rounded-full border bg-background py-0 pr-10 pl-4 text-sm font-medium"
      >
        {SORT_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <CaretDownIcon weight="regular" className="pointer-events-none absolute right-4 size-4" aria-hidden />
    </label>
  )
}
