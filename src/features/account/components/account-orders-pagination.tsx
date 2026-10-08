import Link from 'next/link'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react/dist/ssr'

const href = (page: number): string => (page > 1 ? `/mi-cuenta/pedidos?pagina=${page}` : '/mi-cuenta/pedidos')
const linkClass =
  'inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors hover:bg-muted'

/** Previous / next: an order history is read in sequence, not jumped through. */
export function AccountOrdersPagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null
  return (
    <nav aria-label="Páginas" className="mt-8 flex items-center justify-between gap-4">
      {page > 1 ? (
        <Link href={href(page - 1)} className={linkClass}>
          <CaretLeftIcon weight="regular" className="size-4" aria-hidden />
          Anteriores
        </Link>
      ) : (
        <span />
      )}
      <p className="text-sm text-muted-foreground tabular-nums">
        Página {page} de {totalPages}
      </p>
      {page < totalPages ? (
        <Link href={href(page + 1)} className={linkClass}>
          Más viejos
          <CaretRightIcon weight="regular" className="size-4" aria-hidden />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
