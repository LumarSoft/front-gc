import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HeroBadges } from '@/src/features/home/components/hero-badges'

// TODO(admin): hero copy will be managed from the admin panel (banners).

/** Hero text: the page's h1, badges and the two calls to action. */
export function HeroCopy() {
  return (
    <div className="max-w-md">
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
      <p className="mt-5 text-base text-pretty text-navy-foreground/85 lg:text-lg">
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
  )
}
