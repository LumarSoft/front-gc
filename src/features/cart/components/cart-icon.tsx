import { ShoppingCart } from 'lucide-react'

/** The store's cart icon with the number of units on it, as in the header. */
export function CartIcon({ count }: { count: number }) {
  return (
    <span className="relative">
      <ShoppingCart aria-hidden strokeWidth={1.5} className="size-6" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-1.5 -right-2 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-highlight px-1 text-xs leading-none font-bold text-highlight-foreground"
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </span>
  )
}

export const cartLabel = (count: number): string =>
  count ? `Carrito, ${count} ${count === 1 ? 'unidad' : 'unidades'}` : 'Carrito'
