import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HeroBadges } from '@/src/features/home/components/hero-badges'

// TODO(admin): hero copy and photo will be managed from the admin panel (banners).

/** Home hero: full-width photo with the copy over its empty left side. The page's h1 and its LCP image. */
export function HeroBanner() {
  return (
    <div className="relative isolate flex flex-col overflow-hidden bg-navy text-navy-foreground xl:block">
      {/* Up to xl the photo goes under the copy (it would sit behind the text). From xl it fills the hero, capped at 8xl with its edges faded. */}
      <div className="relative order-last aspect-4/3 sm:aspect-video lg:aspect-21/9 xl:absolute xl:inset-y-0 xl:left-1/2 xl:-z-10 xl:aspect-auto xl:w-full xl:max-w-8xl xl:-translate-x-1/2">
        <Image
          src="/images/home/hero-ecotank-l5590.webp"
          alt="Impresora Epson EcoTank L5590 imprimiendo una ilustración a todo color"
          fill
          preload
          quality={90}
          sizes="(min-width: 1536px) 1536px, 100vw"
          className="object-cover object-center"
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
      {/* Keeps the copy legible where the photo's blue backdrop gets lighter. */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 hidden w-1/2 bg-linear-to-r from-navy/70 to-transparent xl:block"
      />

      <div className="mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:pt-14 xl:flex xl:min-h-136 xl:items-center xl:pb-28">
        <div className="max-w-xl">
          <p className="flex items-center gap-2.5 text-xs font-semibold tracking-widest text-navy-foreground/80 uppercase">
            Distribuidor oficial
            <Image
              src="/images/epson/epson-logo.png"
              alt="Epson"
              width={84}
              height={20}
              className="h-4 w-auto brightness-0 invert"
            />
          </p>
          <h1 className="mt-4 text-5xl leading-none font-extrabold tracking-tight sm:text-6xl xl:text-7xl">
            <span className="block">Imprimí</span>
            <span className="block text-highlight-soft">tus ideas.</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-pretty text-navy-foreground/85 lg:text-lg">
            Equipos, insumos y asesoramiento para que tu impresión siempre sea un paso más grande.
          </p>
          <HeroBadges className="mt-6" />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/productos"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-background px-6 text-base font-bold text-primary transition-colors hover:bg-accent"
            >
              Ver productos
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href="/configurador"
              className="inline-flex h-12 items-center rounded-full border border-navy-foreground/40 bg-navy/30 px-6 text-base font-semibold backdrop-blur-sm transition-colors hover:bg-navy-foreground/15"
            >
              Ayudame a elegir
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
