import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// TODO(api): categories and their images will be managed from the admin panel.
const SHORTCUTS = [
  {
    title: 'Impresoras Epson',
    text: 'Hogar, oficina y profesional',
    href: '/categorias/impresoras',
    image: '/images/home/ecotank-l3250.webp',
  },
  {
    title: 'Tintas originales',
    text: 'Calidad y rendimiento',
    href: '/categorias/tintas',
    image: '/images/home/ink-bottles.webp',
  },
  {
    title: 'Gran formato',
    text: 'Planos, cartelería y foto',
    href: '/categorias/gran-formato',
    image: '/images/home/surecolor-p7370.webp',
  },
]

/** Category shortcuts: stacked beside the hero copy on xl, a row on its bottom edge on lg, swipeable below. */
export function HeroShortcuts() {
  return (
    <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-0 xl:grid-cols-1 xl:gap-3">
      {SHORTCUTS.map(shortcut => (
        <li key={shortcut.href} className="w-72 shrink-0 snap-start sm:w-80 lg:w-auto">
          <Link
            href={shortcut.href}
            className="group flex h-full min-h-24 items-center gap-3 overflow-hidden rounded-2xl bg-background py-2 pr-3 pl-4 text-foreground shadow-xl ring-1 shadow-navy/15 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:pl-5"
          >
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-base leading-tight font-extrabold tracking-tight text-primary sm:text-lg">
                {shortcut.title}
              </span>
              <span className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{shortcut.text}</span>
              <span
                aria-hidden
                className="mt-2 hidden size-7 place-items-center sm:grid rounded-full bg-accent text-highlight transition-colors group-hover:bg-highlight group-hover:text-highlight-foreground"
              >
                <ArrowRight className="size-4" />
              </span>
            </span>
            <span className="relative w-2/5 shrink-0 self-stretch">
              <Image
                src={shortcut.image}
                alt=""
                fill
                sizes="200px"
                className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
