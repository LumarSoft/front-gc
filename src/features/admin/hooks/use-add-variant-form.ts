'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useVariantMutations } from '@/src/features/admin/hooks/use-variant-mutations'
import type { AdminVariant } from '@/src/types/api/admin-products'

const SKU_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/
const schema = z.object({
  sku: z
    .string()
    .trim()
    .min(1, 'Escribí el SKU.')
    .max(60, 'Hasta 60 caracteres.')
    .regex(SKU_PATTERN, 'Solo letras, números, puntos y guiones.'),
  name: z.string().trim().max(150, 'Hasta 150 caracteres.'),
})
type AddVariantValues = z.infer<typeof schema>
const DEFAULTS: AddVariantValues = { sku: '', name: '' }

/** "Agregar variante": SKU and name; then the new variant opens for prices and stock. */
export function useAddVariantForm(productId: number, open: boolean, onCreated: (variant: AdminVariant) => void) {
  const { create } = useVariantMutations(productId)
  const form = useForm<AddVariantValues>({ resolver: zodResolver(schema), defaultValues: DEFAULTS })

  useEffect(() => {
    if (open) form.reset(DEFAULTS)
  }, [form, open])

  const onSubmit = form.handleSubmit(values =>
    create.mutate(
      { sku: values.sku, name: values.name || null },
      {
        onSuccess: product => {
          const created = product.variants.find(variant => variant.sku === values.sku)
          if (created) onCreated(created)
        },
      },
    ),
  )
  return { form, onSubmit, isSaving: create.isPending }
}
