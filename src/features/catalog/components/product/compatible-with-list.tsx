import Link from 'next/link'
import type { ProductSummary } from '@/src/types/api/catalog'

type CompatibleWithListProps = {
  machines: ProductSummary[]
}

/** Machines an ink, paper or part works with, as links to their pages. */
export function CompatibleWithList({ machines }: CompatibleWithListProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {machines.map(machine => (
        <li key={machine.id}>
          <Link
            href={`/productos/${machine.slug}`}
            className="inline-flex rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            {machine.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
