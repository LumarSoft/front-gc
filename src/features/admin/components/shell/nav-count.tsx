import { cn } from '@/src/lib/utils'

type NavCountProps = {
  count: number | undefined
  className?: string
}

/** Small counter of waiting work; hidden at zero. Capped at 99+ so it never stretches the nav. */
export function NavCount({ count, className }: NavCountProps) {
  if (!count) return null
  return (
    <span
      aria-label={`, ${count} por atender`}
      className={cn(
        'grid h-5 min-w-5 place-items-center rounded-md px-1.5 text-xs font-medium tabular-nums motion-safe:animate-in motion-safe:zoom-in-75',
        className,
      )}
    >
      {count > 99 ? '99+' : count}
    </span>
  )
}
