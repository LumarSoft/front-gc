'use client'

import { EllipsisIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'

export type RowAction = {
  label: string
  icon: LucideIcon
  onSelect: () => void
  disabled?: boolean
  /** Destructive actions go last, after a separator, in red. */
  destructive?: boolean
}

type RowActionsProps = {
  /** Name of the row, for the screen-reader label ("Acciones de Impresoras"). */
  itemName: string
  actions: RowAction[]
}

/** The "…" menu at the end of a list row. */
export function RowActions({ itemName, actions }: RowActionsProps) {
  const regular = actions.filter(action => !action.destructive)
  const destructive = actions.filter(action => action.destructive)
  const renderItem = ({ label, icon: LucideIcon, onSelect, disabled, destructive: isDestructive }: RowAction) => (
    <DropdownMenuItem
      key={label}
      disabled={disabled}
      variant={isDestructive ? 'destructive' : 'default'}
      onSelect={onSelect}
    >
      <LucideIcon />
      {label}
    </DropdownMenuItem>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Acciones de ${itemName}`}>
          <EllipsisIcon strokeWidth={2.5} className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {regular.map(renderItem)}
        {destructive.length > 0 && regular.length > 0 && <DropdownMenuSeparator />}
        {destructive.map(renderItem)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
