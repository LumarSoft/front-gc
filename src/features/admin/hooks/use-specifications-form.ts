'use client'

import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProductMutations } from '@/src/features/admin/hooks/use-product-mutations'
import { prepareForm } from '@/src/features/admin/lib/form-submit'
import {
  EMPTY_SPECIFICATION,
  specificationsSchema,
  type SpecificationsValues,
  specificationsValues,
  toSpecificationInputs,
} from '@/src/features/admin/lib/specifications-form'
import type { AdminProduct } from '@/src/types/api/admin-products'

/** The technical sheet as editable rows; saved as a whole, ordered list, through the page's save bar. */
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
    section: {
      dirty: form.formState.isDirty,
      prepare: () =>
        prepareForm(form, formValues => replaceSpecifications.mutateAsync(toSpecificationInputs(formValues))),
      discard: () => form.reset(values),
    },
  }
}
