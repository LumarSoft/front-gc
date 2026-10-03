import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/src/lib/utils'

const TILES = [
  {
    eyebrow: 'Emprendé',
    title: 'Sublimación y textil para tu propio negocio',
    text: 'Remeras, tazas y personalizados con equipos profesionales.',
    href: '/categorias/sublimacion',
    cta: 'Ver equipos de sublimación',
    image: '/images/epson/sc-f3070.jpg',
    className: 'bg-linear-to-br from-magenta/15 via-background to-yellow/20',
  },
  {
    eyebrow: 'Para imprentas y estudios',
    title: 'Gran formato: planos, cartelería y fotografía',
    text: 'Plotters y papeles profesionales con asesoramiento técnico.',
    href: '/categorias/gran-formato',
    cta: 'Ver gran formato',
    image: '/images/epson/sc-p5370.jpg',
    className: 'bg-linear-to-br from-cyan/20 via-background to-primary/10',
  },
]

export function PromoTiles() {
  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
      {TILES.map(tile => (
        <Link
          key={tile.href}
          href={tile.href}
          className={cn(
            'group reveal relative flex flex-col sm:min-h-96 overflow-hidden rounded-4xl border p-8 transition-shadow hover:shadow-2xl hover:shadow-primary/10 sm:p-10',
            tile.className,
          )}
        >
          <div className="relative z-10 sm:max-w-sm">
            <p className="text-sm font-semibold text-primary">{tile.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-balance sm:text-3xl">{tile.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{tile.text}</p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors group-hover:bg-primary">
              {tile.cta}
              <ArrowRightIcon
                weight="regular"
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </span>
          </div>
          <div className="relative mt-8 aspect-4/3 w-full self-end overflow-hidden rounded-3xl bg-white shadow-xl sm:absolute sm:right-8 sm:bottom-8 sm:mt-0 sm:w-2/5">
            <Image
              src={tile.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 320px, 60vw"
              className="object-contain p-4 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2"
            />
          </div>
        </Link>
      ))}
    </section>
  )
}
