'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ProductImagePlaceholder } from '@/src/features/catalog/components/product-image-placeholder'
import { cn } from '@/src/lib/utils'
import type { ProductImage } from '@/src/types/api/catalog'

type ProductGalleryProps = {
  images: ProductImage[]
  productName: string
  brandName?: string
}

/** Swipeable on phones (scroll snap), thumbnails on larger screens. */
export function ProductGallery({ images, productName, brandName }: ProductGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  if (images.length === 0) {
    return (
      <div className="aspect-square overflow-hidden rounded-3xl border">
        <ProductImagePlaceholder label={brandName ? `${brandName} · foto próximamente` : 'Foto próximamente'} />
      </div>
    )
  }

  const goTo = (index: number): void => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={event => {
            const track = event.currentTarget
            setActiveIndex(Math.round(track.scrollLeft / track.clientWidth))
          }}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-3xl border bg-white"
          aria-label={`Fotos de ${productName}`}
        >
          {images.map((image, index) => (
            <div key={image.url} className="relative aspect-square w-full shrink-0 snap-center">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : undefined}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-contain p-6"
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5 lg:hidden" aria-hidden>
            {images.map((image, index) => (
              <span
                key={image.url}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  index === activeIndex ? 'w-5 bg-foreground' : 'w-1.5 bg-foreground/25',
                )}
              />
            ))}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="hidden gap-3 lg:flex">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Ver foto ${index + 1}`}
              aria-current={index === activeIndex}
              className={cn(
                'relative size-20 overflow-hidden rounded-xl border bg-white transition-colors',
                index === activeIndex ? 'border-foreground' : 'hover:border-foreground/40',
              )}
            >
              <Image src={image.url} alt="" fill sizes="80px" className="object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
