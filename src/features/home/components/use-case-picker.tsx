import Link from 'next/link'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/src/lib/utils'

// Entry points to the guided configurator, styled as color swatch chips. `uso` pre-selects the first answer.
const USE_CASES = [
  { label: 'Casa y estudio', text: 'Tareas, documentos y fotos', value: 'hogar', swatch: 'bg-cyan text-white' },
  { label: 'Oficina y pymes', text: 'Volumen, velocidad y dúplex', value: 'oficina', swatch: 'bg-primary text-white' },
  {
    label: 'Fotografía y arte',
    text: 'Color fiel y papeles especiales',
    value: 'foto',
    swatch: 'bg-magenta text-white',
  },
  {
    label: 'Emprendimiento textil',
    text: 'Sublimación y personalizados',
    value: 'textil',
    swatch: 'bg-yellow text-foreground',
  },
  {
    label: 'Planos y cartelería',
    text: 'Gran formato y CAD',
    value: 'gran-formato',
    swatch: 'bg-foreground text-background',
  },
]

export function UseCasePicker() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-3 lg:items-end">
        <div className="lg:col-span-2">
          <p className="text-sm font-semibold text-primary">Asesor guiado</p>
          <h2 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
            ¿No sabés cuál elegir? Contanos qué vas a imprimir.
          </h2>
        </div>
        <p className="text-muted-foreground">
          Elegí tu uso y te recomendamos el equipo justo, con el porqué de cada opción. Sin tecnicismos, en un minuto.
        </p>
      </div>
      <ul className="no-scrollbar mt-10 flex snap-x gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-5">
        {USE_CASES.map((useCase, index) => (
          <li key={useCase.value} className="reveal w-52 shrink-0 snap-start sm:w-auto">
            <Link
              href={`/configurador?uso=${useCase.value}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-xl hover:shadow-navy/10"
            >
              <span className={cn('flex aspect-4/3 flex-col justify-between p-4', useCase.swatch)}>
                <span className="font-mono text-xs opacity-70">CG–0{index + 1}</span>
                <span className="text-lg leading-tight font-extrabold">{useCase.label}</span>
              </span>
              <span className="flex flex-1 items-end justify-between gap-3 p-4">
                <span className="text-sm text-muted-foreground">{useCase.text}</span>
                <ArrowRightIcon
                  weight="regular"
                  className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary"
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
