'use client'

import { ArchiveIcon, PencilSimpleLineIcon } from '@phosphor-icons/react'
import { ConfirmDialog } from '@/src/components/ui/confirm-dialog'
import { BulkActionBar, BulkActionButton } from '@/src/features/admin/components/common/bulk-action-bar'
import { BulkMoreMenu } from '@/src/features/admin/components/common/bulk-more-menu'
import { useBulkProductAction } from '@/src/features/admin/hooks/use-bulk-product-action'
import type { RowSelection } from '@/src/features/admin/hooks/use-row-selection'

/** Bulk bar of the product list and the confirmation before archiving. */
export function ProductsBulkActions({ selection }: { selection: RowSelection }) {
  const count = selection.selectedIds.length
  const bulk = useBulkProductAction(selection.selectedIds, selection.clear)

  return (
    <>
      <BulkActionBar count={count} onClear={selection.clear}>
        <BulkActionButton onClick={() => bulk.run('PUBLISH')} disabled={bulk.pending}>
          Publicar
        </BulkActionButton>
        <BulkActionButton onClick={() => bulk.run('HIDE')} disabled={bulk.pending}>
          Ocultar
        </BulkActionButton>
        <BulkMoreMenu
          disabled={bulk.pending}
          actions={[
            { label: 'Pasar a borrador', icon: PencilSimpleLineIcon, onSelect: () => bulk.run('DRAFT') },
            { label: 'Archivar', icon: ArchiveIcon, onSelect: () => bulk.run('ARCHIVE'), destructive: true },
          ]}
        />
      </BulkActionBar>
      <ConfirmDialog
        open={bulk.confirmingArchive}
        onOpenChange={bulk.setConfirmingArchive}
        title={`¿Archivar ${count} ${count === 1 ? 'producto' : 'productos'}?`}
        description="Desaparecen de la tienda y de esta lista. Los pedidos que ya los incluyen no cambian."
        confirmLabel="Archivar"
        destructive
        onConfirm={bulk.archive}
      />
    </>
  )
}
