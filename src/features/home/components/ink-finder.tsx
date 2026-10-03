import Image from 'next/image'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'

const BENEFITS = [
  { title: 'Rinde muchísimo', text: 'Una botella imprime miles de páginas.' },
  { title: 'Cuida tu garantía', text: 'La tinta original protege el cabezal de tu equipo.' },
  { title: 'Menos residuos', text: 'Sin cartuchos descartables: recargás y listo.' },
]

export function InkFinder() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 text-navy-foreground lg:py-24">
      <div aria-hidden className="absolute -bottom-40 -left-40 size-96 rounded-full bg-cyan/30 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="relative order-last mx-auto aspect-3/2 w-full max-w-xl lg:order-first">
          <Image
            src="/images/epson/ink.png"
            alt="Botella de tinta original Epson"
            fill
            sizes="(min-width: 1024px) 576px, 90vw"
            className="object-contain drop-shadow-2xl motion-safe:animate-float"
          />
        </div>
        <div className="reveal">
          <p className="text-sm font-semibold text-cyan">Tintas originales Epson</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Encontrá la tinta de tu impresora en segundos
          </h2>
          <p className="mt-4 text-navy-foreground/75">
            Escribí el modelo de tu impresora y te mostramos las tintas, papeles y repuestos compatibles.
          </p>
          <form action="/buscar" className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input type="hidden" name="tipo" value="compatibles" />
            <label htmlFor="ink-finder" className="sr-only">
              Modelo de tu impresora
            </label>
            <div className="relative flex-1">
              <MagnifyingGlassIcon
                weight="regular"
                className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="ink-finder"
                name="q"
                placeholder="Ej: L3250, L8180, L6490"
                className="h-12 rounded-full border-transparent bg-white pl-11 text-foreground"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 rounded-full bg-yellow px-6 font-bold text-foreground hover:bg-yellow/90"
            >
              Buscar compatibles
            </Button>
          </form>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {BENEFITS.map(({ title, text }, index) => (
              <li key={title} className="border-t border-navy-foreground/15 pt-4">
                <span className="font-mono text-xs text-cyan">0{index + 1}</span>
                <p className="mt-2 font-bold">{title}</p>
                <p className="mt-1 text-sm text-navy-foreground/70">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
