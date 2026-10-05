'use client'

import { Controller } from 'react-hook-form'
import { FieldGroup } from '@/src/components/ui/field'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import { BrandSelect } from '@/src/features/admin/components/common/brand-select'
import { CategorySelect } from '@/src/features/admin/components/common/category-select'
import { FormDialog } from '@/src/features/admin/components/common/form-dialog'
import { useCreateProductForm } from '@/src/features/admin/hooks/use-create-product-form'

type CreateProductDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateProductDialog({ open, onOpenChange }: CreateProductDialogProps) {
  const { form, onSubmit, isSaving } = useCreateProductForm(open)
  const { errors } = form.formState

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Nuevo producto"
      description="Se crea como borrador. Después cargás fotos, precio y detalles, y lo publicás."
      submitLabel="Crear y continuar"
      pending={isSaving}
      onSubmit={onSubmit}
    >
      <FieldGroup className="gap-5">
        <FormField id="product-name" label="Nombre" error={errors.name}>
          <Input id="product-name" autoFocus aria-invalid={!!errors.name} {...form.register('name')} />
        </FormField>
        <FormField id="product-category" label="Categoría" error={errors.categoryId}>
          <Controller
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <CategorySelect
                id="product-category"
                value={field.value || undefined}
                onChange={id => field.onChange(id ?? 0)}
              />
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
        <FormField
          id="product-sku"
          label="SKU"
          error={errors.sku}
          description="Código del artículo (el mismo que en Tango, si existe). Es la variante principal."
        >
          <Input id="product-sku" autoCapitalize="characters" aria-invalid={!!errors.sku} {...form.register('sku')} />
        </FormField>
      </FieldGroup>
    </FormDialog>
  )
}
