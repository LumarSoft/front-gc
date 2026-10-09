import Image from 'next/image'
import { cn } from '@/src/lib/utils'

type HeroPhotoProps = {
  className?: string
}

// TODO(admin): the hero photo will be managed from the admin panel (banners).

/**
 * Hero photo: empty blue on the left (copy), the printer in the middle, empty room on the right (shortcuts).
 * Up to xl it is a block under the copy; from xl it fills the hero, capped at 8xl with its edges faded into navy.
 * The hero is shorter than the photo on desktop: anchoring it to the bottom keeps the printed sheet in frame.
 */
export function HeroPhoto({ className }: HeroPhotoProps) {
  return (
    <div className={cn('relative overflow-hidden bg-navy', className)}>
      <div className="relative aspect-4/3 sm:aspect-video lg:aspect-21/9 xl:absolute xl:inset-y-0 xl:left-1/2 xl:aspect-auto xl:w-full xl:max-w-8xl xl:-translate-x-1/2">
        <Image
          src="/images/home/hero-home.webp"
          alt="Impresora Epson EcoTank L5590 imprimiendo una ilustración a todo color"
          fill
          preload
          quality={90}
          sizes="(min-width: 1536px) 1536px, 100vw"
          className="object-cover object-center xl:object-bottom"
        />
        <div aria-hidden className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-navy to-transparent xl:hidden" />
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 hidden w-24 bg-linear-to-r from-navy to-transparent 2xl:block"
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 hidden w-24 bg-linear-to-l from-navy to-transparent 2xl:block"
        />
      </div>
    </div>
  )
}
