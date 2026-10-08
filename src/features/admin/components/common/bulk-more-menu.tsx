'use client'

import { EllipsisIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import type { RowAction } from '@/src/features/admin/components/common/row-actions'

type BulkMoreMenuProps = {
  actions: RowAction[]
  disabled?: boolean
}

/** Secondary bulk actions behind "…", so the bar fits on a phone. Destructive ones go last, in red. */
export function BulkMoreMenu({ actions, disabled }: BulkMoreMenuProps) {
  const regular = actions.filter(action => !action.destructive)
  const destructive = actions.filter(action => action.destructive)
  const item = ({ label, icon: Icon, onSelect, destructive: isDestructive }: RowAction) => (
    <DropdownMenuItem key={label} variant={isDestructive ? 'destructive' : 'default'} onSelect={onSelect}>
      <Icon />
      {label}
    </DropdownMenuItem>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={disabled}
        aria-label="Más acciones"
        className="grid size-8 shrink-0 place-items-center rounded-lg transition-colors hover:bg-frame-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-50 aria-expanded:bg-frame-accent"
      >
        <EllipsisIcon strokeWidth={2.5} className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="end" className="w-52">
        {regular.map(item)}
        {regular.length > 0 && destructive.length > 0 && <DropdownMenuSeparator />}
        {destructive.map(item)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
