'use client'

import { RotateCcwIcon } from 'lucide-react'
import { BulkActionBar, BulkActionButton } from '@/src/features/admin/components/common/bulk-action-bar'
import { BulkMoreMenu } from '@/src/features/admin/components/common/bulk-more-menu'
import type { RowSelection } from '@/src/features/admin/hooks/use-row-selection'
import type { QuestionStatus } from '@/src/types/api/admin-assistant'

type QuestionsBulkActionsProps = {
  selection: RowSelection
  pending: boolean
  onChange: (ids: number[], status: QuestionStatus, onDone?: () => void) => void
}

/** Bulk bar of the missing data: mark the selection completed or dismissed, or back to pending. All reversible. */
export function QuestionsBulkActions({ selection, pending, onChange }: QuestionsBulkActionsProps) {
  const change = (status: QuestionStatus) => () => onChange(selection.selectedIds, status, selection.clear)
  return (
    <BulkActionBar count={selection.selectedIds.length} onClear={selection.clear}>
      <BulkActionButton onClick={change('ANSWERED')} disabled={pending}>
        Marcar como completados
      </BulkActionButton>
      <BulkActionButton onClick={change('DISMISSED')} disabled={pending}>
        Descartar
      </BulkActionButton>
      <BulkMoreMenu
        disabled={pending}
        actions={[{ label: 'Volver a pendientes', icon: RotateCcwIcon, onSelect: change('OPEN') }]}
      />
    </BulkActionBar>
  )
}
