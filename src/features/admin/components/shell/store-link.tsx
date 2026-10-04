import Link from 'next/link'
import { ArrowSquareOutIcon } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/src/lib/utils'

type StoreLinkProps = {
  className?: string
}

/** Opens the public store in a new tab, so the admin keeps their place in the panel. */
export function StoreLink({ className }: StoreLinkProps) {
  return (
    <Link
      href="/"
      target="_blank"
      className={cn(
        'flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
        className,
      )}
    >
      <ArrowSquareOutIcon className="size-4.5 shrink-0" />
      Ver la tienda
    </Link>
  )
}
