'use client'

import { ConfirmDialog } from '@/src/components/ui/confirm-dialog'

type ArchiveConfirmDialogProps = {
  /** Name of the record to archive; null closes the dialog. */
  name: string | null
  /** Reason it cannot be archived yet; the dialog then only explains. */
  blocker: string | null
  /** What archiving changes for the customer, e.g. "Deja de aparecer en la tienda." */
  consequence: string
  onConfirm: () => void
  onDismiss: () => void
}

export function ArchiveConfirmDialog({ name, blocker, consequence, onConfirm, onDismiss }: ArchiveConfirmDialogProps) {
  return (
    <ConfirmDialog
      open={name !== null}
      onOpenChange={open => !open && onDismiss()}
      title={blocker ? `Todavía no podés archivar «${name}»` : `¿Archivar «${name}»?`}
      description={
        blocker ??
        `${consequence} Queda guardado en el historial y se puede recuperar creándolo de nuevo con el mismo identificador.`
      }
      confirmLabel="Archivar"
      destructive
      onConfirm={
        blocker
          ? undefined
          : () => {
              onConfirm()
              onDismiss()
            }
      }
    />
  )
}
