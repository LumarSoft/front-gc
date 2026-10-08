'use client'

import { ListBulletsIcon, PlusIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { EmptyState } from '@/src/components/ui/empty-state'
import { ProductEditorCard } from '@/src/features/admin/components/products/editor/product-editor-card'
import { SpecificationRowFields } from '@/src/features/admin/components/products/editor/specification-row'
import { useSpecificationsForm } from '@/src/features/admin/hooks/use-specifications-form'
import type { AdminProduct } from '@/src/types/api/admin-products'

/** Technical sheet: shown on the product page, used for comparisons and by the assistant. */
export function SpecificationsSection({ product }: { product: AdminProduct }) {
  const { form, rows, addRow, section } = useSpecificationsForm(product)
  const addButton = (
    <Button type="button" variant="outline" size="sm" onClick={addRow}>
      <PlusIcon />
      Agregar fila
    </Button>
  )

  return (
    <ProductEditorCard
      title="Especificaciones"
      description="Ficha técnica. El grupo (ej.: Impresión, Conectividad) arma las secciones de la ficha."
      action={rows.fields.length > 0 ? addButton : undefined}
      section={section}
    >
      {rows.fields.length === 0 ? (
        <EmptyState
          icon={<ListBulletsIcon />}
          title="Sin especificaciones"
          description="Agregá datos técnicos como velocidad, conectividad o rendimiento."
          action={addButton}
        />
      ) : (
        <ul className="flex flex-col gap-2">
          {rows.fields.map((field, index) => (
            <SpecificationRowFields
              key={field.id}
              form={form}
              index={index}
              total={rows.fields.length}
              onMove={to => rows.move(index, to)}
              onRemove={() => rows.remove(index)}
            />
          ))}
        </ul>
      )}
    </ProductEditorCard>
  )
}
