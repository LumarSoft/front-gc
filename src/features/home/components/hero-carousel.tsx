'use client'

import type { ReactNode } from 'react'
import { useCarouselIndex } from '@/src/features/home/hooks/use-carousel-index'
import { cn } from '@/src/lib/utils'

type HeroCarouselProps = {
  /** One server-rendered node per slide. */
  slides: ReactNode[]
  labels: string[]
}

const AUTOPLAY_MS = 7000

/** Crossfading slides stacked in one grid cell: the tallest slide sets the height, so nothing jumps. */
export function HeroCarousel({ slides, labels }: HeroCarouselProps) {
  const { index, goTo, setPaused } = useCarouselIndex(slides.length, AUTOPLAY_MS)

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Novedades"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="flex flex-col gap-4"
    >
      <div className="grid">
        {slides.map((slide, slideIndex) => (
          <div
            key={labels[slideIndex]}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${slideIndex + 1} de ${slides.length}`}
            inert={slideIndex !== index}
            className={cn(
              'col-start-1 row-start-1 transition-opacity duration-700 motion-reduce:transition-none',
              slideIndex === index ? 'opacity-100' : 'opacity-0',
            )}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="flex gap-2 sm:justify-center lg:justify-start">
        {labels.map((label, dotIndex) => (
          <button
            key={label}
            type="button"
            onClick={() => goTo(dotIndex)}
            aria-label={`Ver: ${label}`}
            aria-current={dotIndex === index}
            className="group grid h-6 place-items-center"
          >
            <span
              className={cn(
                'block h-1.5 rounded-full transition-all',
                dotIndex === index
                  ? 'w-6 bg-navy-foreground'
                  : 'w-1.5 bg-navy-foreground/40 group-hover:bg-navy-foreground/70',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
