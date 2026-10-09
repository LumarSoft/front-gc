import { Search } from 'lucide-react'
import { Input } from '@/src/components/ui/input'
import { cn } from '@/src/lib/utils'

type SearchFormProps = {
  /** The header renders two forms (desktop and phone): each needs its own input id for its label. */
  id?: string
  className?: string
}

/** Plain GET form: works without JavaScript and keeps the query in the URL. */
export function SearchForm({ id = 'site-search', className }: SearchFormProps) {
  return (
    <form action="/productos" role="search" className={cn('relative', className)}>
      <label htmlFor={id} className="sr-only">
        Buscar productos
      </label>
      <Input
        id={id}
        name="q"
        type="search"
        placeholder="¿Qué estás buscando?"
        className="h-11 rounded-xl border-border bg-muted/60 pr-12 pl-4 text-sm focus-visible:border-primary focus-visible:bg-background"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
      >
        <Search className="size-4.5" aria-hidden />
      </button>
    </form>
  )
}
