'use client'

import {
  ArchiveIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  EyeOffIcon,
  FolderIcon,
  FolderPlusIcon,
  PencilIcon,
} from 'lucide-react'
import { ItemThumb } from '@/src/features/admin/components/common/item-thumb'
import { ListRow, ListRowButton } from '@/src/features/admin/components/common/list-row'
import { ProductCount } from '@/src/features/admin/components/common/product-count'
import { type RowAction, RowActions } from '@/src/features/admin/components/common/row-actions'
import { StatusBadge } from '@/src/features/admin/components/common/status-badge'
import type { AdminCategory } from '@/src/types/api/admin-catalog'

export type CategoryHandlers = {
  edit: (category: AdminCategory) => void
  addChild: (parent: AdminCategory) => void
  move: (category: AdminCategory, direction: 'up' | 'down') => void
  toggleActive: (category: AdminCategory) => void
  archive: (category: AdminCategory) => void
}

type CategoryRowProps = {
  category: AdminCategory
  /** Position among its siblings, to enable "Mover arriba/abajo". */
  index: number
  siblingCount: number
  /** Off while the list is filtered: positions among the shown rows are not the real ones. */
  reorderable: boolean
  handlers: CategoryHandlers
}

export function CategoryRow({ category, index, siblingCount, reorderable, handlers }: CategoryRowProps) {
  const isTopLevel = category.parentId === null
  const totalProducts = category.productCount + category.children.reduce((sum, child) => sum + child.productCount, 0)
  const actions: RowAction[] = [
    { label: 'Editar', icon: PencilIcon, onSelect: () => handlers.edit(category) },
    ...(isTopLevel
      ? [{ label: 'Agregar subcategoría', icon: FolderPlusIcon, onSelect: () => handlers.addChild(category) }]
      : []),
    {
      label: 'Mover arriba',
      icon: ArrowUpIcon,
      onSelect: () => handlers.move(category, 'up'),
      disabled: !reorderable || index === 0,
    },
    {
      label: 'Mover abajo',
      icon: ArrowDownIcon,
      onSelect: () => handlers.move(category, 'down'),
      disabled: !reorderable || index === siblingCount - 1,
    },
    {
      label: category.isActive ? 'Ocultar de la tienda' : 'Mostrar en la tienda',
      icon: category.isActive ? EyeOffIcon : EyeIcon,
      onSelect: () => handlers.toggleActive(category),
    },
    { label: 'Archivar…', icon: ArchiveIcon, onSelect: () => handlers.archive(category), destructive: true },
  ]

  return (
    <ListRow
      leading={<ItemThumb url={category.imageUrl} fallbackIcon={FolderIcon} />}
      title={<ListRowButton onClick={() => handlers.edit(category)}>{category.name}</ListRowButton>}
      meta={`/categorias/${category.slug}`}
      details={
        <>
          <ProductCount count={totalProducts} suffix={category.children.length > 0 ? 'con subcategorías' : undefined} />
          <StatusBadge active={category.isActive} activeLabel="Visible" inactiveLabel="Oculta" />
        </>
      }
      actions={<RowActions itemName={category.name} actions={actions} />}
      muted={!category.isActive}
    />
  )
}
