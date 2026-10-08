'use client'

import { ProductEditorCard } from '@/src/features/admin/components/products/editor/product-editor-card'
import { GalleryDropzone } from '@/src/features/admin/components/products/editor/gallery-dropzone'
import { GalleryTile } from '@/src/features/admin/components/products/editor/gallery-tile'
import { useGalleryDraft } from '@/src/features/admin/hooks/use-gallery-draft'
import { useMultiImageUpload } from '@/src/features/admin/hooks/use-multi-image-upload'
import type { AdminProduct } from '@/src/types/api/admin-products'

/** Product photos: upload, order (the first is the main one), alt texts. Saved together. */
export function GallerySection({ product }: { product: AdminProduct }) {
  const gallery = useGalleryDraft(product)
  const uploader = useMultiImageUpload(gallery.add)

  return (
    <ProductEditorCard
      title="Imágenes"
      description="La primera es la principal. JPG, PNG, WebP o AVIF de hasta 5 MB."
      section={{
        ...gallery.section,
        prepare: () =>
          uploader.isUploading
            ? Promise.resolve('Esperá a que terminen de subir las fotos.')
            : gallery.section.prepare(),
      }}
    >
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {gallery.items.map((item, index) => (
          <GalleryTile
            key={item.key}
            item={item}
            index={index}
            total={gallery.items.length}
            onMove={offset => gallery.move(item.key, offset)}
            onMakeMain={() => gallery.makeMain(item.key)}
            onRemove={() => gallery.remove(item.key)}
            onAltText={text => gallery.setAltText(item.key, text)}
          />
        ))}
        <GalleryDropzone onFiles={uploader.upload} uploading={uploader.isUploading} remaining={uploader.remaining} />
      </ul>
      {uploader.errors.length > 0 && (
        <ul role="alert" className="mt-3 flex flex-col gap-1 text-sm text-destructive">
          {uploader.errors.map(error => (
            <li key={error}>No se pudo subir {error}</li>
          ))}
        </ul>
      )}
    </ProductEditorCard>
  )
}
