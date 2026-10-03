import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr'
import { SectionHeading } from '@/src/components/ui/section-heading'

// TODO(api): categories and their images will be managed from the admin panel.
const CATEGORIES = [
  { label: 'Impresoras', href: '/categorias/impresoras', image: '/images/epson/cat-printers.jpg' },
  { label: 'Tintas y consumibles', href: '/categorias/tintas', image: '/images/epson/ink-bottle.png' },
  { label: 'Papeles y sustratos', href: '/categorias/papeles', image: '/images/epson/pro-media.jpg' },
  { label: 'Escáneres', href: '/categorias/escaneres', image: '/images/epson/cat-scanners.jpg' },
  { label: 'Proyectores', href: '/categorias/proyectores', image: '/images/epson/cat-projectors.jpg' },
  { label: 'Gran formato', href: '/categorias/gran-formato', image: '/images/epson/sc-t5170.jpg' },
  { label: 'Sublimación y textil', href: '/categorias/sublimacion', image: '/images/epson/sc-f9570.jpg' },
  { label: 'Puntos de venta', href: '/categorias/puntos-de-venta', image: '/images/epson/tm-t88vi.jpg' },
]

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading
        eyebrow="Categorías"
        title="Todo para imprimir, en un solo lugar"
        description="Desde la impresora de tu casa hasta el equipamiento de tu imprenta."
        action={{ label: 'Ver todo el catálogo', href: '/categorias' }}
      />
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {CATEGORIES.map(category => (
          <li key={category.href} className="reveal">
            <Link
              href={category.href}
              className="group flex h-full flex-col gap-3 rounded-3xl bg-surface p-3 transition-all duration-300 hover:-translate-y-1 hover:bg-accent hover:shadow-lg hover:shadow-primary/10"
            >
              <span className="relative block aspect-4/3 overflow-hidden rounded-2xl bg-white">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <span className="flex items-center justify-between gap-2 px-1 pb-1">
                <span className="text-sm font-bold sm:text-base">{category.label}</span>
                <ArrowUpRightIcon
                  weight="regular"
                  className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
