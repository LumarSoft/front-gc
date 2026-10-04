import Link from 'next/link'
import { cn } from '@/src/lib/utils'

export type BreadcrumbItem = {
  label: string
  href: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

/** "Inicio / … / …" trail. "Inicio" is always first. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Ruta de navegación" className={cn('text-sm text-muted-foreground', className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {[{ label: 'Inicio', href: '/' }, ...items].map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden>/</span>}
            <Link href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
