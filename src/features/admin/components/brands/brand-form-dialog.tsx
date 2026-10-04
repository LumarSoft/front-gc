'use client'

import { Controller } from 'react-hook-form'
import { FieldGroup } from '@/src/components/ui/field'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import { SwitchField } from '@/src/components/ui/switch-field'
import { FormDialog } from '@/src/features/admin/components/common/form-dialog'
import { ImageUploadField } from '@/src/features/admin/components/common/image-upload-field'
import { SlugField } from '@/src/features/admin/components/common/slug-field'
import { useBrandForm } from '@/src/features/admin/hooks/use-brand-form'
import type { AdminBrand } from '@/src/types/api/admin-catalog'

type BrandFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Null when creating. */
  brand: AdminBrand | null
}

export function BrandFormDialog({ open, onOpenChange, brand }: BrandFormDialogProps) {
  const { form, onSubmit, isSaving } = useBrandForm(open, brand, () => onOpenChange(false))
  const { errors } = form.formState

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={brand ? `Editar «${brand.name}»` : 'Nueva marca'}
      description="Las marcas activas aparecen en los filtros de la tienda."
      submitLabel={brand ? 'Guardar cambios' : 'Crear marca'}
      pending={isSaving}
      onSubmit={onSubmit}
    >
      <FieldGroup className="gap-5">
        <FormField id="brand-name" label="Nombre" error={errors.name}>
          <Input id="brand-name" autoFocus aria-invalid={!!errors.name} {...form.register('name')} />
        </FormField>
        <SlugField
          id="brand-slug"
          registration={form.register('slug')}
          name={form.watch('name')}
          value={form.watch('slug')}
          error={errors.slug}
        />
        <Controller
          control={form.control}
          name="logo"
          render={({ field }) => (
            <ImageUploadField
              id="brand-logo"
              label="Logo"
              hint="Ideal: fondo transparente (PNG o WebP), hasta 5 MB."
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <SwitchField
              id="brand-active"
              label="Activa"
              description="Si la desactivás, deja de aparecer en los filtros. Sus productos no cambian."
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </FieldGroup>
    </FormDialog>
  )
}
