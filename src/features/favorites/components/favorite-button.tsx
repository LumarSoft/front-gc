'use client'

import { HeartIcon } from '@phosphor-icons/react'
import { cn } from '@/src/lib/utils'
import { useFavoriteToggle } from '../hooks/use-favorite-toggle'

type FavoriteButtonProps = {
  productId: number
  productName: string
  className?: string
}

export function FavoriteButton({ productId, productName, className }: FavoriteButtonProps) {
  const { saved, pending, toggle } = useFavoriteToggle(productId)
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      aria-busy={pending}
      aria-label={saved ? `Quitar ${productName} de favoritos` : `Guardar ${productName} en favoritos`}
      className={cn(
        'grid size-10 place-items-center rounded-full border bg-background/90 text-foreground shadow-sm backdrop-blur transition-colors hover:text-magenta focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
        saved && 'text-magenta',
        className,
      )}
    >
      <HeartIcon weight={saved ? 'fill' : 'regular'} className="size-5" aria-hidden />
    </button>
  )
}
