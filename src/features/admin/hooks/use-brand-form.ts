'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useBrandMutations } from '@/src/features/admin/hooks/use-brand-mutations'
import {
  brandFormDefaults,
  brandFormSchema,
  type BrandFormValues,
  toBrandInput,
} from '@/src/features/admin/lib/brand-form'
import type { AdminBrand } from '@/src/types/api/admin-catalog'

/** Form state for the brand dialog: defaults, validation and save (create or update). */
export function useBrandForm(open: boolean, brand: AdminBrand | null, onSaved: () => void) {
  const { create, update } = useBrandMutations()
  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: brandFormDefaults(brand),
  })

  // The dialog stays mounted between openings: start from fresh values every time it opens.
  useEffect(() => {
    if (open) form.reset(brandFormDefaults(brand))
  }, [form, open, brand])

  const onSubmit = form.handleSubmit(values => {
    const input = toBrandInput(values)
    if (brand) update.mutate({ id: brand.id, input }, { onSuccess: onSaved })
    else create.mutate(input, { onSuccess: onSaved })
  })

  return { form, onSubmit, isSaving: create.isPending || update.isPending }
}
