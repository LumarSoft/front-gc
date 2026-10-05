'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAdminMutation } from '@/src/features/admin/hooks/use-admin-mutation'
import {
  PRODUCT_CREATE_DEFAULTS,
  productCreateSchema,
  type ProductCreateValues,
  toCreateProductInput,
} from '@/src/features/admin/lib/product-create-form'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { createProduct } from '@/src/services/admin-products.service'

/** "Nuevo producto": the minimum to create a draft, then straight to its editor. */
export function useCreateProductForm(open: boolean) {
  const router = useRouter()
  const form = useForm<ProductCreateValues>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: PRODUCT_CREATE_DEFAULTS,
  })
  const create = useAdminMutation({
    mutationFn: createProduct,
    invalidate: [QUERY_KEYS.admin.productLists, QUERY_KEYS.admin.categories],
    successMessage: product => `Creaste «${product.name}» como borrador. Completalo y publicalo.`,
    onSuccess: product => router.push(`/admin/productos/${product.id}`),
  })

  useEffect(() => {
    if (open) form.reset(PRODUCT_CREATE_DEFAULTS)
  }, [form, open])

  const onSubmit = form.handleSubmit(values => create.mutate(toCreateProductInput(values)))
  return { form, onSubmit, isSaving: create.isPending }
}
