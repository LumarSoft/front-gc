import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/src/components/ui/button'
import { InkStroke } from '@/src/components/ui/print-marks'

// TODO(admin): hero image and copy will be managed from the admin panel (banners).
const HERO_IMAGE_SRC = '/images/banner.jpg'

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-navy-foreground">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-104 sm:h-3/4 lg:inset-0 lg:h-auto lg:overflow-hidden"
      >
        <Image
          src={HERO_IMAGE_SRC}
          alt=""
          fill
          preload
          quality={90}
          sizes="100vw"
          className="object-cover object-hero-focus lg:object-center lg:motion-safe:animate-ken-burns"
        />
        {/* Mobile: the solid navy end of this overlay reaches past the photo's bottom edge, so no seam can show. */}
        <div className="absolute inset-x-0 top-0 -bottom-6 bg-linear-to-t from-navy from-15% via-navy/60 via-45% to-navy/0 to-75% lg:hidden" />
        {/* Desktop: darken the left side behind the copy. */}
        <div className="absolute inset-0 hidden bg-linear-to-r from-navy via-navy/70 to-navy/0 lg:block" />
      </div>

      <div className="mx-auto flex max-w-7xl items-end px-4 pt-80 pb-16 sm:px-6 lg:min-h-150 lg:items-center lg:pt-16 lg:pb-32">
        <div className="max-w-xl motion-safe:animate-fade-up">
          <h1 className="text-4xl leading-none font-extrabold tracking-tight text-balance sm:text-6xl">
            Imprimí más.{' '}
            <span className="relative inline-block text-yellow">
              Gastá menos.
              <InkStroke className="absolute -bottom-2 left-0 text-magenta/80" />
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-base text-pretty text-navy-foreground/85 sm:mt-8 sm:text-lg">
            Impresoras EcoTank con tanques de tinta recargables: miles de páginas por botella y la tranquilidad de
            comprar con quienes asesoran hace más de 50 años.
          </p>
          <div className="mt-8 grid gap-3 sm:flex">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-white px-6 text-base font-bold text-primary hover:bg-white/90"
            >
              <Link href="/categorias/impresoras">
                Ver impresoras EcoTank
                <ArrowRightIcon weight="regular" className="size-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/30 bg-white/5 px-6 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
            >
              <Link href="/configurador">Ayudame a elegir</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
