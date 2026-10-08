'use client'

import { CheckIcon } from 'lucide-react'
import Link from 'next/link'
import { ProductEditorCard } from '@/src/features/admin/components/products/editor/product-editor-card'
import { useAdminTags } from '@/src/features/admin/hooks/use-admin-tags'
import { useTagsDraft } from '@/src/features/admin/hooks/use-tags-draft'
import { groupLabel, groupTags } from '@/src/features/admin/lib/tag-form'
import { cn } from '@/src/lib/utils'
import type { AdminProduct } from '@/src/types/api/admin-products'

/** Tags as toggle chips, by group ("Uso" drives the store's use filters). */
export function TagsSection({ product }: { product: AdminProduct }) {
  const { data: tags = [] } = useAdminTags()
  const draft = useTagsDraft(product)

  return (
    <ProductEditorCard title="Etiquetas" section={draft.section}>
      {tags.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No hay etiquetas. Crealas en{' '}
          <Link href="/admin/etiquetas" className="text-primary hover:underline">
            Etiquetas
          </Link>
          .
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {groupTags(tags).map(group => (
            <fieldset key={group.group ?? 'none'}>
              <legend className="mb-2 text-xs font-medium text-muted-foreground">{groupLabel(group.group)}</legend>
              <div className="flex flex-wrap gap-2">
                {group.tags.map(tag => {
                  const checked = draft.selected.includes(tag.id)
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      role="checkbox"
                      aria-checked={checked}
                      onClick={() => draft.toggle(tag.id)}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors hover:bg-muted',
                        checked && 'border-primary bg-accent text-primary hover:bg-accent',
                      )}
                    >
                      {checked && <CheckIcon strokeWidth={3} className="size-3.5" />}
                      {tag.name}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ))}
        </div>
      )}
    </ProductEditorCard>
  )
}
