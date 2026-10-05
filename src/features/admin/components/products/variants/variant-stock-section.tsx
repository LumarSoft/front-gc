'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldGroup } from '@/src/components/ui/field'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import { EditorSection } from '@/src/features/admin/components/common/editor-section'
import { ProvisionalNotice } from '@/src/features/admin/components/feedback/provisional-notice'
import { useSectionForm } from '@/src/features/admin/hooks/use-section-form'
import { useVariantMutations } from '@/src/features/admin/hooks/use-variant-mutations'
import { toStockInput, variantStockSchema, variantStockValues } from '@/src/features/admin/lib/variant-stock-form'
import type { AdminVariant } from '@/src/types/api/admin-products'

type VariantStockSectionProps = { productId: number; variant: AdminVariant }

/** Counted stock and the "pocas unidades" threshold. Provisional until stock comes from Tango. */
export function VariantStockSection({ productId, variant }: VariantStockSectionProps) {
  const { adjustStock } = useVariantMutations(productId)
  const { form, dirty, pending, save, discard } = useSectionForm({
    values: variantStockValues(variant),
    resolver: zodResolver(variantStockSchema),
    onSave: values => adjustStock.mutate({ variantId: variant.id, input: toStockInput(values) }),
    pending: adjustStock.isPending,
  })
  const { errors } = form.formState
  const reserved = variant.stock?.reserved ?? 0

  return (
    <EditorSection title="Stock" dirty={dirty} pending={pending} onSave={save} onDiscard={discard}>
      <div className="flex flex-col gap-5">
        <ProvisionalNotice>
          <strong className="font-medium">Carga manual provisoria.</strong> Cuando se conecte Tango, el stock se va a
          actualizar solo desde ahí. Cada cambio queda registrado como un ajuste.
        </ProvisionalNotice>
        <FieldGroup className="gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              id="variant-on-hand"
              label="Unidades en el local"
              error={errors.onHand}
              description={reserved > 0 ? `${reserved} reservadas por pedidos en curso.` : 'Lo que hay físicamente.'}
            >
              <Input
                id="variant-on-hand"
                inputMode="numeric"
                className="tabular-nums"
                aria-invalid={!!errors.onHand}
                {...form.register('onHand')}
              />
            </FormField>
            <FormField
              id="variant-threshold"
              label="Avisar con pocas unidades desde"
              error={errors.lowStockThreshold}
              description="Vacío = 3 unidades."
            >
              <Input
                id="variant-threshold"
                inputMode="numeric"
                className="tabular-nums"
                {...form.register('lowStockThreshold')}
              />
            </FormField>
          </div>
          <FormField
            id="variant-stock-note"
            label="Motivo del ajuste"
            error={errors.note}
            description="Opcional, ej.: conteo del 5/10."
          >
            <Input id="variant-stock-note" {...form.register('note')} />
          </FormField>
        </FieldGroup>
      </div>
    </EditorSection>
  )
}
