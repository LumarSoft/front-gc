'use client'

import { XIcon } from '@phosphor-icons/react'

type BulkActionBarProps = {
  count: number
  onClear: () => void
  /** Main actions (BulkActionButton) and a BulkMoreMenu for the rest. */
  children: React.ReactNode
}

/** Dark bar that rises from the bottom while rows are selected: how many, the actions, and a way out. */
export function BulkActionBar({ count, onClear, children }: BulkActionBarProps) {
  if (count === 0) return null
  return (
    <div
      role="toolbar"
      aria-label="Acciones sobre la selección"
      className="fixed inset-x-3 bottom-20 z-40 mx-auto flex max-w-fit items-center gap-1 rounded-xl bg-frame p-1.5 text-white shadow-2xl motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 lg:bottom-6"
    >
      <span className="shrink-0 px-2.5 text-sm font-medium tabular-nums" aria-live="polite">
        {/* Phones show just the number so the bar fits; the full wording is still read out. */}
        <span aria-hidden className="sm:hidden">
          {count}
        </span>
        <span className="max-sm:sr-only">
          {count} {count === 1 ? 'seleccionado' : 'seleccionados'}
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
