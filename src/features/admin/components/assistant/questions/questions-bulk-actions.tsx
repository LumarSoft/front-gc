'use client'

import { RotateCcwIcon } from 'lucide-react'
import { BulkActionBar, BulkActionButton } from '@/src/features/admin/components/common/bulk-action-bar'
import { BulkMoreMenu } from '@/src/features/admin/components/common/bulk-more-menu'
import type { RowSelection } from '@/src/features/admin/hooks/use-row-selection'
import type { QuestionStatus } from '@/src/types/api/admin-assistant'

type QuestionsBulkActionsProps = {
  selection: RowSelection
  pending: boolean
  onChange: (ids: number[], status: QuestionStatus) => void
}

/** Bulk bar of the questions: mark the selection answered or dismissed, or back to waiting. All reversible. */
export function QuestionsBulkActions({ selection, pending, onChange }: QuestionsBulkActionsProps) {
  const change = (status: QuestionStatus) => () => onChange(selection.selectedIds, status)
  return (
    <BulkActionBar count={selection.selectedIds.length} onClear={selection.clear}>
      <BulkActionButton onClick={change('ANSWERED')} disabled={pending}>
        Marcar respondidas
      </BulkActionButton>
      <BulkActionButton onClick={change('DISMISSED')} disabled={pending}>
        Descartar
      </BulkActionButton>
      <BulkMoreMenu
        disabled={pending}
        actions={[{ label: 'Volver a sin responder', icon: RotateCcwIcon, onSelect: change('OPEN') }]}
      />
    </BulkActionBar>
  )
}
