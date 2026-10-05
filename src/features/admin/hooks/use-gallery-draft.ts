'use client'

import { useState } from 'react'
import { useProductMutations } from '@/src/features/admin/hooks/use-product-mutations'
import {
  type GalleryItem,
  moveItem,
  sameGallery,
  toGalleryItems,
  toImageInputs,
} from '@/src/features/admin/lib/gallery-draft'
import type { AdminProduct } from '@/src/types/api/admin-products'
import type { StoredFile } from '@/src/types/api/admin-files'

/** Local, unsaved version of the product gallery and the actions on it. Saved as a whole with one request. */
export function useGalleryDraft(product: AdminProduct) {
  const { replaceImages } = useProductMutations(product.id)
  const saved = toGalleryItems(product.images)
  const [items, setItems] = useState<GalleryItem[]>(saved)

  // After a save the product comes back with the stored gallery: start again from it.
  const [savedImages, setSavedImages] = useState(product.images)
  if (savedImages !== product.images) {
    setSavedImages(product.images)
    setItems(saved)
  }

  const update = (key: string, change: Partial<GalleryItem>): void =>
    setItems(current => current.map(item => (item.key === key ? { ...item, ...change } : item)))
  const indexOf = (key: string): number => items.findIndex(item => item.key === key)

  return {
    items,
    dirty: !sameGallery(items, saved),
    pending: replaceImages.isPending,
    add: (file: StoredFile) =>
      setItems(current => [
        ...current,
        {
          key: `new-${file.id}-${current.length}`,
          id: null,
          fileId: file.id,
          url: file.url,
          altText: '',
          variantId: null,
        },
      ]),
    remove: (key: string) => setItems(current => current.filter(item => item.key !== key)),
    move: (key: string, offset: number) => setItems(current => moveItem(current, indexOf(key), indexOf(key) + offset)),
    makeMain: (key: string) => setItems(current => moveItem(current, indexOf(key), 0)),
    setAltText: (key: string, altText: string) => update(key, { altText }),
    save: () => replaceImages.mutate(toImageInputs(items)),
    discard: () => setItems(saved),
  }
}
