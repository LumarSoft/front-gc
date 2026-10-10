import Image from 'next/image'
import { formatMoneyExact } from '@/src/lib/format'
import type { CartItem } from '@/src/types/api/cart'

/** Products of the purchase: thumbnail with the quantity on it, name and line total. */
export function OrderLines({ items }: { items: CartItem[] }) {
  return (
    <ul className="space-y-4">
      {items.map(item => (
        <li key={item.variantId} className="flex items-center gap-4">
          <div className="relative size-16 shrink-0 rounded-lg border bg-background">
            {item.imageUrl && (
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                sizes="64px"
                className="rounded-lg object-contain p-1.5"
              />
            )}
            <span className="absolute -top-2 -right-2 flex size-5.5 items-center justify-center rounded-full bg-muted-foreground text-xs font-semibold text-background tabular-nums">
              <span className="sr-only">Cantidad: </span>
              {item.quantity}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{item.name}</p>
            {item.variantName && <p className="text-xs text-muted-foreground">{item.variantName}</p>}
          </div>
          <p className="shrink-0 text-sm tabular-nums">{item.total ? formatMoneyExact(item.total) : 'A confirmar'}</p>
        </li>
      ))}
    </ul>
  )
}
