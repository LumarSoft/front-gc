'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
import { NO_PARENT } from '@/src/features/admin/lib/category-form'
import type { AdminCategory } from '@/src/types/api/admin-catalog'

type CategoryParentSelectProps = {
  id: string
  value: string
  onChange: (value: string) => void
  /** Top-level categories. The one being edited is left out (it cannot be its own parent). */
  options: AdminCategory[]
  disabled?: boolean
}

export function CategoryParentSelect({ id, value, onChange, options, disabled }: CategoryParentSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={NO_PARENT}>Ninguna: es una categoría principal</SelectItem>
        {options.map(option => (
          <SelectItem key={option.id} value={String(option.id)}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
