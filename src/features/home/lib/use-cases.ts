// Entry points to the guided configurator, styled as color swatch chips. `uso` pre-selects the first answer.
export const USE_CASES = [
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
] as const

export type UseCase = (typeof USE_CASES)[number]

/** The configurator's `?uso=` value, only when it is one of the known use cases. */
export function findUseCase(value: string | string[] | undefined): UseCase | undefined {
  return USE_CASES.find(useCase => useCase.value === value)
}

/** Catalog filter for a use case: its "uso" tag (managed in /admin/etiquetas). */
export function catalogHrefForUseCase(useCase: UseCase): string {
  return `/productos?tag=uso-${useCase.value}`
}
