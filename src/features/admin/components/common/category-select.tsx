'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
import { useAdminCategories } from '@/src/features/admin/hooks/use-admin-categories'
import { categoryOptions } from '@/src/features/admin/lib/category-options'
import { cn } from '@/src/lib/utils'

type CategorySelectProps = {
  id?: string
  value: number | undefined
  onChange: (id: number | undefined) => void
  /** Label of the "no category" option (e.g. "Todas las categorías"); omit to require a category. */
  emptyLabel?: string
  placeholder?: string
  className?: string
}

const NONE = 'none'

/** Category picker with subcategories indented under their parent. */
export function CategorySelect({ id, value, onChange, emptyLabel, placeholder, className }: CategorySelectProps) {
  const { data = [] } = useAdminCategories()
  return (
    <Select
      value={value ? String(value) : emptyLabel ? NONE : ''}
      onValueChange={next => onChange(next === NONE ? undefined : Number(next))}
    >
      <SelectTrigger id={id} className={cn('w-full', className)}>
        <SelectValue placeholder={placeholder ?? 'Elegí una categoría'} />
      </SelectTrigger>
      <SelectContent>
        {emptyLabel && <SelectItem value={NONE}>{emptyLabel}</SelectItem>}
        {categoryOptions(data).map(option => (
          <SelectItem key={option.id} value={String(option.id)} className={cn(option.isChild && 'pl-6')}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
