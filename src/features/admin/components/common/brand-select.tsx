'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
import { useAdminBrands } from '@/src/features/admin/hooks/use-admin-brands'
import { cn } from '@/src/lib/utils'

type BrandSelectProps = {
  id?: string
  value: number | null | undefined
  onChange: (id: number | null) => void
  /** Label of the "no brand" option: "Todas las marcas" in filters, "Sin marca" in forms. */
  emptyLabel: string
  className?: string
}

const NONE = 'none'

export function BrandSelect({ id, value, onChange, emptyLabel, className }: BrandSelectProps) {
  const { data = [] } = useAdminBrands()
  return (
    <Select value={value ? String(value) : NONE} onValueChange={next => onChange(next === NONE ? null : Number(next))}>
      <SelectTrigger id={id} className={cn('w-full', className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={NONE}>{emptyLabel}</SelectItem>
        {data.map(brand => (
          <SelectItem key={brand.id} value={String(brand.id)}>
            {brand.name}
            {!brand.isActive && ' (inactiva)'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
