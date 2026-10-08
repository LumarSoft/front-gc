'use client'

import { ArchiveIcon, PencilSimpleIcon, PlusIcon, TagIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { ListRow, ListRowButton } from '@/src/features/admin/components/common/list-row'
import { ProductCount } from '@/src/features/admin/components/common/product-count'
import { RowActions } from '@/src/features/admin/components/common/row-actions'
import { groupLabel, type TagGroup } from '@/src/features/admin/lib/tag-form'
import type { AdminTag } from '@/src/types/api/admin-catalog'

type TagGroupSectionProps = {
  group: TagGroup
  onAdd: (group: string | null) => void
  onEdit: (tag: AdminTag) => void
  onArchive: (tag: AdminTag) => void
}

/** One group of tags ("Uso") inside the list card: a gray header with its own "Agregar", then its rows. */
export function TagGroupSection({ group, onAdd, onEdit, onArchive }: TagGroupSectionProps) {
  const title = groupLabel(group.group)
  return (
    <section aria-label={title}>
      <div className="flex h-10 items-center gap-2 border-b bg-table-head px-4">
        <h2 className="text-xs font-semibold">{title}</h2>
        <span className="text-xs text-muted-foreground tabular-nums">
          {group.tags.length} {group.tags.length === 1 ? 'etiqueta' : 'etiquetas'}
        </span>
        <Button variant="ghost" size="sm" className="ml-auto -mr-2" onClick={() => onAdd(group.group)}>
          <PlusIcon />
          Agregar
        </Button>
      </div>
      <ul className="divide-y">
        {group.tags.map(tag => (
          <ListRow
            key={tag.id}
            leading={<TagIcon className="size-5 shrink-0 text-muted-foreground" />}
            title={<ListRowButton onClick={() => onEdit(tag)}>{tag.name}</ListRowButton>}
            meta={tag.slug}
            details={<ProductCount count={tag.productCount} />}
            actions={
              <RowActions
                itemName={tag.name}
                actions={[
                  { label: 'Editar', icon: PencilSimpleIcon, onSelect: () => onEdit(tag) },
                  { label: 'Archivar…', icon: ArchiveIcon, onSelect: () => onArchive(tag), destructive: true },
                ]}
              />
            }
          />
        ))}
      </ul>
    </section>
  )
}
