'use client'

import { type DefaultValues, type FieldValues, type Resolver, useForm } from 'react-hook-form'
import { useProductMutations } from '@/src/features/admin/hooks/use-product-mutations'
import { prepareForm } from '@/src/features/admin/lib/form-submit'
import type { AdminProduct, UpdateProductInput } from '@/src/types/api/admin-products'

type UseProductSectionFormOptions<TValues extends FieldValues> = {
  product: AdminProduct
  resolver?: Resolver<TValues>
  /** The section's values, read from the saved product. */
  toValues: (product: AdminProduct) => TValues
  /** What the section sends to PATCH /admin/products/:id. */
  toInput: (values: TValues) => UpdateProductInput
}

/**
 * A product editor section backed by the general PATCH, saved through the page's save bar. The form follows the saved
 * product (`values`), so after a save it is clean again; other sections' saves do not touch its unsaved edits (their
 * values are unchanged).
 */
export function useProductSectionForm<TValues extends FieldValues>({
  product,
  resolver,
  toValues,
  toInput,
}: UseProductSectionFormOptions<TValues>) {
  const { update } = useProductMutations(product.id)
  const values = toValues(product)
  const form = useForm<TValues>({ resolver, defaultValues: values as DefaultValues<TValues>, values })

  return {
    form,
    section: {
      dirty: form.formState.isDirty,
      prepare: () => prepareForm(form, formValues => update.mutateAsync(toInput(formValues))),
      discard: () => form.reset(values),
    },
  }
}
