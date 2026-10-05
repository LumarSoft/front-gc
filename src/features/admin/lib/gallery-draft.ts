import type { AdminProductImage, ProductImageInput } from '@/src/types/api/admin-products'

/** One image in the gallery being edited. `key` is stable for React; `id` is null until the gallery is saved. */
export type GalleryItem = {
  key: string
  id: number | null
  fileId: number
  url: string
  altText: string
  variantId: number | null
}

export function toGalleryItems(images: AdminProductImage[]): GalleryItem[] {
  return images.map(image => ({
    key: `saved-${image.id}`,
    id: image.id,
    fileId: image.fileId,
    url: image.url,
    altText: image.altText ?? '',
    variantId: image.variantId,
  }))
}

export function toImageInputs(items: GalleryItem[]): ProductImageInput[] {
  return items.map(item => ({
    ...(item.id ? { id: item.id } : {}),
    fileId: item.fileId,
    altText: item.altText.trim() || null,
    variantId: item.variantId,
  }))
}

/** Same images, same order, same texts: nothing to save. */
export function sameGallery(a: GalleryItem[], b: GalleryItem[]): boolean {
  return JSON.stringify(toImageInputs(a)) === JSON.stringify(toImageInputs(b))
}

/** Moves the item at `from` to `to` (bounded), returning a new array. */
export function moveItem<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length || from === to) return items
  const next = [...items]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}
