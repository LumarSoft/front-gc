import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr'
import { Input } from '@/src/components/ui/input'
import { cn } from '@/src/lib/utils'

type SearchFormProps = {
  className?: string
}

/** Plain GET form: works without JavaScript and keeps the query in the URL. */
export function SearchForm({ className }: SearchFormProps) {
  return (
    <form action="/buscar" role="search" className={cn('relative', className)}>
      <label htmlFor="site-search" className="sr-only">
        Buscar productos
      </label>
      <MagnifyingGlassIcon
        weight="regular"
        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        id="site-search"
        name="q"
        type="search"
        placeholder="Buscá impresoras, tintas, papeles…"
        className="h-11 rounded-full border-transparent bg-muted pr-4 pl-11 text-sm focus-visible:border-primary focus-visible:bg-background"
      />
    </form>
  )
}
