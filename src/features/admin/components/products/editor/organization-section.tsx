'use client'

import { Controller } from 'react-hook-form'
import { FieldGroup } from '@/src/components/ui/field'
import { FormField } from '@/src/components/ui/form-field'
import { SwitchField } from '@/src/components/ui/switch-field'
import { BrandSelect } from '@/src/features/admin/components/common/brand-select'
import { CategorySelect } from '@/src/features/admin/components/common/category-select'
import { ProductEditorCard } from '@/src/features/admin/components/products/editor/product-editor-card'
import { useProductSectionForm } from '@/src/features/admin/hooks/use-product-section-form'
import type { AdminProduct } from '@/src/types/api/admin-products'

type OrganizationValues = { categoryId: number; brandId: number | null; isFeatured: boolean }

/** Where the product lives in the store: category, brand and the home highlight. */
export function OrganizationSection({ product }: { product: AdminProduct }) {
  const { form, section } = useProductSectionForm<OrganizationValues>({
    product,
    toValues: ({ categoryId, brandId, isFeatured }) => ({ categoryId, brandId, isFeatured }),
    toInput: values => values,
  })

  return (
    <ProductEditorCard title="Organización" section={section}>
      <FieldGroup className="gap-5">
        <FormField id="product-category" label="Categoría">
          <Controller
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <CategorySelect id="product-category" value={field.value} onChange={id => id && field.onChange(id)} />
            )}
          />
        </FormField>
        <FormField id="product-brand" label="Marca">
          <Controller
            control={form.control}
            name="brandId"
            render={({ field }) => (
              <BrandSelect id="product-brand" value={field.value} onChange={field.onChange} emptyLabel="Sin marca" />
            )}
          />
        </FormField>
        <Controller
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <SwitchField
              id="product-featured"
              label="Destacado"
              description="Aparece en el inicio de la tienda y primero en el catálogo."
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </FieldGroup>
    </ProductEditorCard>
  )
}
