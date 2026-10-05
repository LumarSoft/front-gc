'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller } from 'react-hook-form'
import { FieldGroup } from '@/src/components/ui/field'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
import { SwitchField } from '@/src/components/ui/switch-field'
import { EditorSection } from '@/src/features/admin/components/common/editor-section'
import { VariantOptionsField } from '@/src/features/admin/components/products/variants/variant-options-field'
import { useSectionForm } from '@/src/features/admin/hooks/use-section-form'
import { useVariantMutations } from '@/src/features/admin/hooks/use-variant-mutations'
import { SALE_UNIT_LABELS } from '@/src/features/admin/lib/product-labels'
import {
  toVariantDetailsInput,
  variantDetailsSchema,
  variantDetailsValues,
} from '@/src/features/admin/lib/variant-details-form'
import type { AdminVariant } from '@/src/types/api/admin-products'

type VariantDetailsSectionProps = { productId: number; variant: AdminVariant }

/** SKU, name, options, barcode, sale unit and whether it is sold. */
export function VariantDetailsSection({ productId, variant }: VariantDetailsSectionProps) {
  const { update } = useVariantMutations(productId)
  const { form, dirty, pending, save, discard } = useSectionForm({
    values: variantDetailsValues(variant),
    resolver: zodResolver(variantDetailsSchema),
    onSave: values => update.mutate({ variantId: variant.id, input: toVariantDetailsInput(values) }),
    pending: update.isPending,
  })
  const { errors } = form.formState

  return (
    <EditorSection title="Datos" dirty={dirty} pending={pending} onSave={save} onDiscard={discard}>
      <FieldGroup className="gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="variant-sku" label="SKU" error={errors.sku}>
            <Input id="variant-sku" aria-invalid={!!errors.sku} {...form.register('sku')} />
          </FormField>
          <FormField id="variant-barcode" label="Código de barras" error={errors.barcode}>
            <Input id="variant-barcode" inputMode="numeric" {...form.register('barcode')} />
          </FormField>
        </div>
        <FormField
          id="variant-name"
          label="Nombre"
          error={errors.name}
          description="Opcional, ej.: Cyan 70 ml. Si lo dejás vacío se usan las opciones."
        >
          <Input id="variant-name" {...form.register('name')} />
        </FormField>
        <VariantOptionsField form={form} />
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="variant-sale-unit" label="Se vende por">
            <Controller
              control={form.control}
              name="saleUnit"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="variant-sale-unit" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SALE_UNIT_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
          <FormField
            id="variant-units"
            label="Unidades por venta"
            error={errors.unitsPerSaleUnit}
            description="Ej.: una caja de 10."
          >
            <Input id="variant-units" inputMode="numeric" {...form.register('unitsPerSaleUnit')} />
          </FormField>
        </div>
        <Controller
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <SwitchField
              id="variant-active"
              label="A la venta"
              description={
                variant.isDefault
                  ? 'Es la variante principal: para desactivarla elegí otra principal primero.'
                  : 'Si la desactivás, deja de ofrecerse en la tienda.'
              }
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </FieldGroup>
    </EditorSection>
  )
}
