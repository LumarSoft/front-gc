'use client'

import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import { useOpenAdminSearch } from '@/src/features/admin/components/search/admin-search-provider'
import { useIsMac } from '@/src/features/admin/hooks/use-is-mac'

type AdminSearchTriggerProps = {
  /** Icon only (phone top bar). */
  compact?: boolean
}

/** Looks like a search box on the dark frame; opens the search palette. */
export function AdminSearchTrigger({ compact = false }: AdminSearchTriggerProps) {
  const openSearch = useOpenAdminSearch()
  const isMac = useIsMac()

  if (compact) {
    return (
      <button
        type="button"
        onClick={openSearch}
        aria-label="Buscar"
        className="grid size-9 place-items-center rounded-lg text-frame-foreground transition-colors hover:bg-frame-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <MagnifyingGlassIcon className="size-5" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={openSearch}
      className="flex h-8 w-full items-center gap-2 rounded-lg bg-frame-accent px-2.5 text-sm text-frame-muted ring-1 ring-white/5 transition-colors hover:bg-white/15 hover:text-frame-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <MagnifyingGlassIcon className="size-4 shrink-0" />
      <span className="flex-1 text-left">Buscar</span>
      <kbd className="font-sans text-xs text-frame-muted">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
    </button>
  )
}
