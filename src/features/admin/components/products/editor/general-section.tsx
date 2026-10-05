'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FieldGroup } from '@/src/components/ui/field'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { EditorSection } from '@/src/features/admin/components/common/editor-section'
import { useProductSectionForm } from '@/src/features/admin/hooks/use-product-section-form'
import {
  productGeneralSchema,
  productGeneralValues,
  toGeneralInput,
} from '@/src/features/admin/lib/product-general-form'
import type { AdminProduct } from '@/src/types/api/admin-products'

/** Name, URL, descriptions and warranty. */
export function GeneralSection({ product }: { product: AdminProduct }) {
  const { form, dirty, pending, save, discard } = useProductSectionForm({
    product,
    resolver: zodResolver(productGeneralSchema),
    toValues: productGeneralValues,
    toInput: toGeneralInput,
  })
  const { errors } = form.formState

  return (
    <EditorSection title="Información" dirty={dirty} pending={pending} onSave={save} onDiscard={discard}>
      <FieldGroup className="gap-5">
        <FormField id="product-name" label="Nombre" error={errors.name}>
          <Input id="product-name" aria-invalid={!!errors.name} {...form.register('name')} />
        </FormField>
        <FormField
          id="product-slug"
          label="Identificador en la URL"
          error={errors.slug}
          description={
            <>
              La ficha queda en <span className="font-mono text-foreground">/productos/{form.watch('slug')}</span>.
              Cambiarlo rompe los links que ya se compartieron.
            </>
          }
        >
          <Input id="product-slug" aria-invalid={!!errors.slug} {...form.register('slug')} />
        </FormField>
        <FormField
          id="product-short"
          label="Descripción corta"
          error={errors.shortDescription}
          description={`Aparece en las tarjetas del catálogo. ${form.watch('shortDescription').length}/500`}
        >
          <Textarea id="product-short" rows={2} {...form.register('shortDescription')} />
        </FormField>
        <FormField id="product-description" label="Descripción" error={errors.description}>
          <Textarea id="product-description" rows={8} {...form.register('description')} />
        </FormField>
        <FormField
          id="product-warranty"
          label="Garantía (meses)"
          error={errors.warrantyMonths}
          description="Dejalo vacío si no corresponde."
        >
          <Input id="product-warranty" inputMode="numeric" className="sm:w-32" {...form.register('warrantyMonths')} />
        </FormField>
      </FieldGroup>
    </EditorSection>
  )
}
