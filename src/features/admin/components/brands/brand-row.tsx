'use client'

import {
  ArchiveIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilSimpleIcon,
  TrademarkIcon,
} from '@phosphor-icons/react'
import { ItemThumb } from '@/src/features/admin/components/common/item-thumb'
import { ListRow } from '@/src/features/admin/components/common/list-row'
import { ProductCount } from '@/src/features/admin/components/common/product-count'
import { RowActions } from '@/src/features/admin/components/common/row-actions'
import { StatusBadge } from '@/src/features/admin/components/common/status-badge'
import type { AdminBrand } from '@/src/types/api/admin-catalog'

export type BrandHandlers = {
  edit: (brand: AdminBrand) => void
  move: (brand: AdminBrand, direction: 'up' | 'down') => void
  toggleActive: (brand: AdminBrand) => void
  archive: (brand: AdminBrand) => void
}

type BrandRowProps = {
  brand: AdminBrand
  index: number
  total: number
  handlers: BrandHandlers
}

export function BrandRow({ brand, index, total, handlers }: BrandRowProps) {
  return (
    <ListRow
      leading={<ItemThumb url={brand.logoUrl} fallbackIcon={TrademarkIcon} />}
      title={
        <button
          type="button"
          onClick={() => handlers.edit(brand)}
          className="truncate text-left hover:underline focus-visible:underline focus-visible:outline-none"
        >
          {brand.name}
        </button>
      }
      meta={brand.slug}
      details={
        <>
          <ProductCount count={brand.productCount} />
          <StatusBadge active={brand.isActive} />
        </>
      }
      actions={
        <RowActions
          itemName={brand.name}
          actions={[
            { label: 'Editar', icon: PencilSimpleIcon, onSelect: () => handlers.edit(brand) },
            {
              label: 'Mover arriba',
              icon: ArrowUpIcon,
              onSelect: () => handlers.move(brand, 'up'),
              disabled: index === 0,
            },
            {
              label: 'Mover abajo',
              icon: ArrowDownIcon,
              onSelect: () => handlers.move(brand, 'down'),
              disabled: index === total - 1,
            },
            {
              label: brand.isActive ? 'Desactivar' : 'Activar',
              icon: brand.isActive ? EyeSlashIcon : EyeIcon,
              onSelect: () => handlers.toggleActive(brand),
            },
            { label: 'Archivar…', icon: ArchiveIcon, onSelect: () => handlers.archive(brand), destructive: true },
          ]}
        />
      }
      muted={!brand.isActive}
    />
  )
}
