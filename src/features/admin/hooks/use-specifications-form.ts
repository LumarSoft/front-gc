'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProductMutations } from '@/src/features/admin/hooks/use-product-mutations'
import {
  EMPTY_SPECIFICATION,
  specificationsSchema,
  type SpecificationsValues,
  specificationsValues,
  toSpecificationInputs,
} from '@/src/features/admin/lib/specifications-form'
import type { AdminProduct } from '@/src/types/api/admin-products'

/** The technical sheet as editable rows; saved as a whole, ordered list. */
export function useSpecificationsForm(product: AdminProduct) {
  const { replaceSpecifications } = useProductMutations(product.id)
  const values = specificationsValues(product)
  const form = useForm<SpecificationsValues>({
    resolver: zodResolver(specificationsSchema),
    defaultValues: values,
    values,
  })
  const rows = useFieldArray({ control: form.control, name: 'rows' })

  return {
    form,
    rows,
    addRow: () => rows.append(EMPTY_SPECIFICATION, { shouldFocus: true }),
    dirty: form.formState.isDirty,
    pending: replaceSpecifications.isPending,
    save: form.handleSubmit(formValues => replaceSpecifications.mutate(toSpecificationInputs(formValues))),
    discard: () => form.reset(values),
  }
}
