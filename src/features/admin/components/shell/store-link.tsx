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
        'flex h-8 items-center gap-2 rounded-lg px-2 text-sm font-medium text-frame-foreground transition-colors hover:bg-frame-accent hover:text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
        className,
      )}
    >
      <ArrowSquareOutIcon className="size-4.5 shrink-0" />
      Ver la tienda
    </Link>
  )
}
