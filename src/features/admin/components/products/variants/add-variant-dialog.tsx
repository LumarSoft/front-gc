'use client'

import { FieldGroup } from '@/src/components/ui/field'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import { FormDialog } from '@/src/features/admin/components/common/form-dialog'
import { useAddVariantForm } from '@/src/features/admin/hooks/use-add-variant-form'
import type { AdminVariant } from '@/src/types/api/admin-products'

type AddVariantDialogProps = {
  productId: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: (variant: AdminVariant) => void
}

export function AddVariantDialog({ productId, open, onOpenChange, onCreated }: AddVariantDialogProps) {
  const { form, onSubmit, isSaving } = useAddVariantForm(productId, open, variant => {
    onOpenChange(false)
    onCreated(variant)
  })
  const { errors } = form.formState

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Agregar variante"
      description="Después cargás sus precios, stock y opciones."
      submitLabel="Agregar"
      pending={isSaving}
      onSubmit={onSubmit}
    >
      <FieldGroup className="gap-5">
        <FormField
          id="new-variant-sku"
          label="SKU"
          error={errors.sku}
          description="Código del artículo (el de Tango, si existe)."
        >
          <Input
            id="new-variant-sku"
            autoFocus
            autoCapitalize="characters"
            aria-invalid={!!errors.sku}
            {...form.register('sku')}
          />
        </FormField>
        <FormField id="new-variant-name" label="Nombre" error={errors.name} description="Opcional, ej.: Cyan 70 ml.">
          <Input id="new-variant-name" {...form.register('name')} />
        </FormField>
      </FieldGroup>
    </FormDialog>
  )
}
