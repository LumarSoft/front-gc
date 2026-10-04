'use client'

import { ArchiveIcon, PencilSimpleIcon, PlusIcon, TagIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { ListRow } from '@/src/features/admin/components/common/list-row'
import { ProductCount } from '@/src/features/admin/components/common/product-count'
import { RowActions } from '@/src/features/admin/components/common/row-actions'
import { groupLabel, type TagGroup } from '@/src/features/admin/lib/tag-form'
import type { AdminTag } from '@/src/types/api/admin-catalog'

type TagGroupCardProps = {
  group: TagGroup
  onAdd: (group: string | null) => void
  onEdit: (tag: AdminTag) => void
  onArchive: (tag: AdminTag) => void
}

/** One group of tags ("Uso") with its own "Agregar" action. */
export function TagGroupCard({ group, onAdd, onEdit, onArchive }: TagGroupCardProps) {
  return (
    <Card className="gap-0 pb-0 shadow-xs ring-foreground/8">
      <CardHeader className="border-b">
        <CardTitle>{groupLabel(group.group)}</CardTitle>
        <CardDescription>
          {group.tags.length} {group.tags.length === 1 ? 'etiqueta' : 'etiquetas'}
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm" onClick={() => onAdd(group.group)}>
            <PlusIcon />
            Agregar
          </Button>
        </CardAction>
      </CardHeader>
      <ul className="divide-y">
        {group.tags.map(tag => (
          <ListRow
            key={tag.id}
            leading={<TagIcon className="size-5 shrink-0 text-muted-foreground" />}
            title={
              <button
                type="button"
                onClick={() => onEdit(tag)}
                className="truncate text-left hover:underline focus-visible:underline focus-visible:outline-none"
              >
                {tag.name}
              </button>
            }
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
    </Card>
  )
}
