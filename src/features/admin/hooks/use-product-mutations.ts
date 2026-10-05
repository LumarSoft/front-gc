'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useAdminMutation } from '@/src/features/admin/hooks/use-admin-mutation'
import { PRODUCT_STATUS_LABELS } from '@/src/features/admin/lib/product-labels'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import {
  archiveProduct,
  duplicateProduct,
  replaceProductImages,
  replaceProductSpecifications,
  replaceProductTags,
  setProductStatus,
  updateProduct,
} from '@/src/services/admin-products.service'
import type {
  AdminProduct,
  ProductImageInput,
  ProductStatus,
  SpecificationInput,
  UpdateProductInput,
} from '@/src/types/api/admin-products'

const invalidate = [QUERY_KEYS.admin.productLists, QUERY_KEYS.admin.categories, QUERY_KEYS.admin.tags]

/** Every change to one product. Each answer is the updated product, stored in the cache so the editor refreshes at once. */
export function useProductMutations(productId: number) {
  const queryClient = useQueryClient()
  const store = (product: AdminProduct): void => {
    queryClient.setQueryData(QUERY_KEYS.admin.product(product.id), product)
  }
  const saved = { invalidate, onSuccess: store }

  return {
    update: useAdminMutation({
      mutationFn: (input: UpdateProductInput) => updateProduct(productId, input),
      successMessage: 'Cambios guardados.',
      ...saved,
    }),
    setStatus: useAdminMutation({
      mutationFn: (status: ProductStatus) => setProductStatus(productId, status),
      successMessage: product => `Estado: ${PRODUCT_STATUS_LABELS[product.status].toLowerCase()}.`,
      ...saved,
    }),
    replaceImages: useAdminMutation({
      mutationFn: (images: ProductImageInput[]) => replaceProductImages(productId, images),
      successMessage: 'Imágenes guardadas.',
      ...saved,
    }),
    replaceSpecifications: useAdminMutation({
      mutationFn: (specifications: SpecificationInput[]) => replaceProductSpecifications(productId, specifications),
      successMessage: 'Especificaciones guardadas.',
      ...saved,
    }),
    replaceTags: useAdminMutation({
      mutationFn: (tagIds: number[]) => replaceProductTags(productId, tagIds),
      successMessage: 'Etiquetas guardadas.',
      ...saved,
    }),
    duplicate: useAdminMutation({
      mutationFn: () => duplicateProduct(productId),
      successMessage: copy => `Creaste «${copy.name}» como borrador.`,
      ...saved,
    }),
    archive: useAdminMutation({
      mutationFn: () => archiveProduct(productId),
      successMessage: 'Producto archivado.',
      invalidate,
    }),
  }
}
