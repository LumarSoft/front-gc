import Link from 'next/link'
import { TagIcon } from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/src/components/ui/button'

export function OffersEmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl bg-surface px-6 py-16 text-center">
      <TagIcon weight="light" className="size-10 text-muted-foreground" aria-hidden />
      <div>
        <p className="font-bold">No hay ofertas en este momento</p>
        <p className="mt-1 text-sm text-muted-foreground">Volvé pronto o mirá todo el catálogo.</p>
      </div>
      <Button asChild className="h-10 rounded-full px-5">
        <Link href="/productos">Ver todos los productos</Link>
      </Button>
    </div>
  )
}
