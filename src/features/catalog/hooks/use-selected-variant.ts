'use client'

import { useState } from 'react'
import { getAvailabilityLabel, type AvailabilityLabel } from '@/src/features/catalog/lib/availability'
import type { Money } from '@/src/types/api/money'
import type { ProductDetail, ProductImage, ProductVariant } from '@/src/types/api/catalog'

export type SelectedVariantState = {
  variant: ProductVariant | undefined
  selectVariant: (variantId: number) => void
  /** Photos of the selected variant plus the shared ones (all photos when variants have no own photos). */
  images: ProductImage[]
  price: Money | null
  compareAtPrice: Money | null
  availability: AvailabilityLabel | null
}

/** Everything on the product page that changes when the customer picks another variant (e.g. a color). */
export function useSelectedVariant(product: ProductDetail): SelectedVariantState {
  const [variantId, setVariantId] = useState(product.variants[0]?.id)
  const variant = product.variants.find(item => item.id === variantId)

  const hasVariantImages = product.images.some(image => image.variantId !== null)
  const images = hasVariantImages
    ? product.images.filter(image => image.variantId === null || image.variantId === variantId)
    : product.images

  return {
    variant,
    selectVariant: setVariantId,
    images,
    price: variant?.price ?? product.price,
    compareAtPrice: variant?.compareAtPrice ?? product.compareAtPrice,
    availability: getAvailabilityLabel(variant?.availability ?? product.availability, product.outOfStockBehavior),
  }
}
