import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// TODO(admin): hero copy will be managed from the admin panel (banners).

/** Hero text: the page's h1 and the two calls to action. */
export function HeroCopy() {
  return (
    <div className="max-w-md">
      <p className="flex items-center gap-2.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        Distribuidor oficial
        <Image src="/images/epson/epson-logo.png" alt="Epson" width={84} height={20} className="h-4 w-auto" />
      </p>
      <h1 className="mt-3 text-5xl leading-none font-extrabold tracking-tight text-navy sm:text-6xl xl:text-7xl">
        <span className="block">Imprimí</span>
        <span className="block text-highlight">tus ideas.</span>
      </h1>
      <p className="mt-4 text-base text-pretty text-muted-foreground lg:text-lg">
        Equipos, insumos y asesoramiento para que tu impresión siempre sea un paso más grande.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/productos"
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-base font-bold text-primary-foreground transition-colors hover:bg-navy"
        >
          Ver productos
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
        <Link
          href="/configurador"
          className="inline-flex h-12 items-center rounded-full border border-primary/30 px-6 text-base font-semibold text-primary transition-colors hover:bg-accent"
        >
          Ayudame a elegir
        </Link>
      </div>
    </div>
  )
}
