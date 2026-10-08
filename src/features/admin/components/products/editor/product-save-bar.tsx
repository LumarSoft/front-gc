'use client'

import { CircleNotchIcon, WarningCircleIcon } from '@phosphor-icons/react'
import { ConfirmDialog } from '@/src/components/ui/confirm-dialog'
import { useHotkey } from '@/src/features/admin/hooks/use-hotkey'
import { useIsMac } from '@/src/features/admin/hooks/use-is-mac'
import { useNavigationGuard } from '@/src/hooks/use-navigation-guard'
import { useUnsavedChangesWarning } from '@/src/hooks/use-unsaved-changes-warning'

type ProductSaveBarProps = {
  dirty: boolean
  saving: boolean
  onSave: () => void
  onDiscard: () => void
}

/**
 * Dark bar that drops in at the top while the page has unsaved changes. ⌘S / Ctrl+S saves; leaving the page (links,
 * ⌘K, reload or close) asks first.
 */
export function ProductSaveBar({ dirty, saving, onSave, onDiscard }: ProductSaveBarProps) {
  const isMac = useIsMac()
  useUnsavedChangesWarning(dirty)
  const leave = useNavigationGuard(dirty)
  useHotkey('s', () => dirty && onSave())

  return (
    <>
      {dirty && <SaveBar saving={saving} saveHint={isMac ? '⌘S' : 'Ctrl+S'} onSave={onSave} onDiscard={onDiscard} />}
      <ConfirmDialog
        open={leave.pending}
        onOpenChange={open => !open && leave.cancel()}
        title="¿Salir sin guardar?"
        description="Si salís ahora, se pierden los cambios que todavía no guardaste."
        confirmLabel="Descartar cambios"
        cancelLabel="Seguir editando"
        destructive
        onConfirm={leave.confirm}
      />
    </>
  )
}

type SaveBarProps = Omit<ProductSaveBarProps, 'dirty'> & { saveHint: string }

function SaveBar({ saving, saveHint, onSave, onDiscard }: SaveBarProps) {
  return (
    <div
      role="region"
      aria-label="Cambios sin guardar"
      className="fixed inset-x-3 top-2 z-50 mx-auto flex max-w-2xl items-center gap-2 rounded-xl bg-frame py-2 pr-2 pl-4 text-white shadow-2xl motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-4 lg:left-60"
    >
      <WarningCircleIcon className="size-4.5 shrink-0 text-frame-muted max-sm:hidden" />
      <p className="min-w-0 flex-1 truncate text-sm font-medium" role="status">
        <span className="sm:hidden">Sin guardar</span>
        <span className="max-sm:hidden">Cambios sin guardar</span>
      </p>
      <button
        type="button"
        onClick={onDiscard}
        disabled={saving}
        className="h-8 shrink-0 rounded-lg px-3 text-sm font-medium transition-colors hover:bg-frame-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-50"
      >
        Descartar
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        title={saveHint}
        className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-white px-3 text-sm font-medium text-frame transition-colors hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-70"
      >
        {saving && <CircleNotchIcon className="size-4 animate-spin" />}
        Guardar
      </button>
    </div>
  )
}
