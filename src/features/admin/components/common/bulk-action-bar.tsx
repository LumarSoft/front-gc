'use client'

import { useState } from 'react'
import { XIcon } from '@phosphor-icons/react'
import { usePresence } from '@/src/features/admin/hooks/use-presence'

type BulkActionBarProps = {
  count: number
  onClear: () => void
  /** Main actions (BulkActionButton) and a BulkMoreMenu for the rest. */
  children: React.ReactNode
}

/** Dark bar that rises from the bottom while rows are selected: how many, the actions, and a way out. */
export function BulkActionBar({ count, onClear, children }: BulkActionBarProps) {
  const presence = usePresence(count > 0)
  // While it slides away the selection is already empty: keep showing the last count instead of "0".
  const [shownCount, setShownCount] = useState(count)
  if (count > 0 && count !== shownCount) setShownCount(count)

  if (!presence.mounted) return null
  return (
    <div
      role="toolbar"
      aria-label="Acciones sobre la selección"
      data-state={presence.state}
      inert={count === 0}
      className="fixed inset-x-3 bottom-20 z-40 mx-auto flex max-w-fit items-center gap-1 rounded-xl bg-frame-raised p-1.5 text-white shadow-2xl ring-1 ring-white/10 duration-200 motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=closed]:fade-out-0 motion-safe:data-[state=closed]:slide-out-to-bottom-3 motion-safe:data-[state=open]:animate-in motion-safe:data-[state=open]:fade-in-0 motion-safe:data-[state=open]:slide-in-from-bottom-3 data-[state=closed]:fill-mode-forwards lg:bottom-6"
    >
      <span className="shrink-0 px-2.5 text-sm font-medium tabular-nums" aria-live="polite">
        {/* Phones show just the number so the bar fits; the full wording is still read out. */}
        <span aria-hidden className="sm:hidden">
          {shownCount}
        </span>
        <span className="max-sm:sr-only">
          {shownCount} {shownCount === 1 ? 'seleccionado' : 'seleccionados'}
        </span>
      </span>
      <span aria-hidden className="mx-1 h-5 w-px shrink-0 bg-white/15" />
      {children}
      <button
        type="button"
        onClick={onClear}
        aria-label="Quitar la selección"
        className="grid size-8 shrink-0 place-items-center rounded-lg text-frame-muted transition-colors hover:bg-frame-accent hover:text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <XIcon className="size-4" />
      </button>
    </div>
  )
}

type BulkActionButtonProps = {
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}

export function BulkActionButton({ onClick, disabled, children }: BulkActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="h-8 shrink-0 rounded-lg px-3 text-sm font-medium transition-colors hover:bg-frame-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-50"
    >
      {children}
    </button>
  )
}
