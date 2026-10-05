'use client'

import { FieldGroup } from '@/src/components/ui/field'
import { FormField } from '@/src/components/ui/form-field'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { EditorSection } from '@/src/features/admin/components/common/editor-section'
import { useProductSectionForm } from '@/src/features/admin/hooks/use-product-section-form'
import type { AdminProduct } from '@/src/types/api/admin-products'

type SeoValues = { seoTitle: string; seoDescription: string }

const TITLE_MAX = 70
const DESCRIPTION_MAX = 160

/** Title and description for Google. Empty = the store uses the product name and short description. */
export function SeoSection({ product }: { product: AdminProduct }) {
  const { form, dirty, pending, save, discard } = useProductSectionForm<SeoValues>({
    product,
    toValues: ({ seoTitle, seoDescription }) => ({ seoTitle: seoTitle ?? '', seoDescription: seoDescription ?? '' }),
    toInput: values => ({
      seoTitle: values.seoTitle.trim() || null,
      seoDescription: values.seoDescription.trim() || null,
    }),
  })
  const title = form.watch('seoTitle')
  const description = form.watch('seoDescription')

  return (
    <EditorSection
      title="Buscadores (SEO)"
      description="Opcional. Si lo dejás vacío se usan el nombre y la descripción corta."
      dirty={dirty}
      pending={pending}
      onSave={save}
      onDiscard={discard}
    >
      <FieldGroup className="gap-5">
        <FormField id="product-seo-title" label="Título" description={`${title.length}/${TITLE_MAX}`}>
          <Input
            id="product-seo-title"
            maxLength={TITLE_MAX}
            placeholder={product.name}
            {...form.register('seoTitle')}
          />
        </FormField>
        <FormField
          id="product-seo-description"
          label="Descripción"
          description={`${description.length}/${DESCRIPTION_MAX}`}
        >
          <Textarea
            id="product-seo-description"
            rows={3}
            maxLength={DESCRIPTION_MAX}
            placeholder={product.shortDescription ?? undefined}
            {...form.register('seoDescription')}
          />
        </FormField>
      </FieldGroup>
    </EditorSection>
  )
}
