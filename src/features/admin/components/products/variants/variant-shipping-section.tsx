'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller } from 'react-hook-form'
import { FieldGroup } from '@/src/components/ui/field'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import { SwitchField } from '@/src/components/ui/switch-field'
import { EditorSection } from '@/src/features/admin/components/common/editor-section'
import { useSectionForm } from '@/src/features/admin/hooks/use-section-form'
import { useVariantMutations } from '@/src/features/admin/hooks/use-variant-mutations'
import {
  toShippingInput,
  variantShippingSchema,
  variantShippingValues,
} from '@/src/features/admin/lib/variant-shipping-form'
import type { AdminVariant } from '@/src/types/api/admin-products'

type VariantShippingSectionProps = { productId: number; variant: AdminVariant }

const DIMENSIONS = [
  { name: 'lengthMm', label: 'Largo' },
  { name: 'widthMm', label: 'Ancho' },
  { name: 'heightMm', label: 'Alto' },
] as const

/** Package weight and size, used to quote shipping to the rest of the country. */
export function VariantShippingSection({ productId, variant }: VariantShippingSectionProps) {
  const { update } = useVariantMutations(productId)
  const { form, dirty, pending, save, discard } = useSectionForm({
    values: variantShippingValues(variant),
    resolver: zodResolver(variantShippingSchema),
    onSave: values => update.mutate({ variantId: variant.id, input: toShippingInput(values) }),
    pending: update.isPending,
  })
  const { errors } = form.formState

  return (
    <EditorSection
      title="Envío"
      description="Con el paquete armado. Se usa para cotizar envíos al interior."
      dirty={dirty}
      pending={pending}
      onSave={save}
      onDiscard={discard}
    >
      <FieldGroup className="gap-5">
        <FormField id="variant-weight" label="Peso (gramos)" error={errors.weightGrams}>
          <Input
            id="variant-weight"
            inputMode="numeric"
            className="tabular-nums sm:w-40"
            {...form.register('weightGrams')}
          />
        </FormField>
        <div className="grid grid-cols-3 gap-3">
          {DIMENSIONS.map(dimension => (
            <FormField
              key={dimension.name}
              id={`variant-${dimension.name}`}
              label={`${dimension.label} (mm)`}
              error={errors[dimension.name]}
            >
              <Input
                id={`variant-${dimension.name}`}
                inputMode="numeric"
                className="tabular-nums"
                {...form.register(dimension.name)}
              />
            </FormField>
          ))}
        </div>
        <Controller
          control={form.control}
          name="isBulky"
          render={({ field }) => (
            <SwitchField
              id="variant-bulky"
              label="Voluminoso"
              description="Máquinas y bultos grandes: tienen reglas de envío especiales."
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </FieldGroup>
    </EditorSection>
  )
}
