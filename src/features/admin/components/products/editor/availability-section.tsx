'use client'

import { Controller } from 'react-hook-form'
import { ProductEditorCard } from '@/src/features/admin/components/products/editor/product-editor-card'
import { useProductSectionForm } from '@/src/features/admin/hooks/use-product-section-form'
import { OUT_OF_STOCK_OPTIONS } from '@/src/features/admin/lib/product-labels'
import { cn } from '@/src/lib/utils'
import type { AdminProduct } from '@/src/types/api/admin-products'
import type { OutOfStockBehavior } from '@/src/types/api/catalog'

type AvailabilityValues = { outOfStockBehavior: OutOfStockBehavior }

/** What the store does when the product runs out of stock. */
export function AvailabilitySection({ product }: { product: AdminProduct }) {
  const { form, section } = useProductSectionForm<AvailabilityValues>({
    product,
    toValues: ({ outOfStockBehavior }) => ({ outOfStockBehavior }),
    toInput: values => values,
  })

  return (
    <ProductEditorCard title="Sin stock" description="Qué ve el cliente cuando se agota." section={section}>
      <Controller
        control={form.control}
        name="outOfStockBehavior"
        render={({ field }) => (
          <div role="radiogroup" aria-label="Comportamiento sin stock" className="flex flex-col gap-2">
            {OUT_OF_STOCK_OPTIONS.map(option => {
              const checked = field.value === option.value
              return (
                <label
                  key={option.value}
                  className={cn(
                    'flex cursor-pointer gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50',
                    checked && 'border-primary bg-accent/50',
                  )}
                >
                  <input
                    type="radio"
                    name="out-of-stock"
                    value={option.value}
                    checked={checked}
                    onChange={() => field.onChange(option.value)}
                    className="mt-0.5 size-4 accent-primary"
                  />
                  <span className="flex flex-col">
                    <span className="text-sm font-medium">{option.label}</span>
                    <span className="text-xs text-muted-foreground">{option.description}</span>
                  </span>
                </label>
              )
            })}
          </div>
        )}
      />
    </ProductEditorCard>
  )
}
