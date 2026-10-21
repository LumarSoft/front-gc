import { Button } from '@/src/components/ui/button'
import { AssistantAvatar } from '@/src/features/assistant/components/assistant-avatar'
import { AssistantTrigger } from '@/src/features/assistant/components/assistant-trigger'
import type { AssistantProduct } from '@/src/features/assistant/hooks/use-assistant'
import { formatMoney } from '@/src/lib/format'
import type { Money } from '@/src/types/api/money'
import type { AddToCartState } from '@/src/features/cart/hooks/use-add-to-cart'

type MobileBuyBarProps = {
  title: string
  price: Money | null
  /** The assistant's button (and "Consultar" when it cannot be added) opens the chat about this product. */
  inquiry: AssistantProduct
  cart: AddToCartState
}

/** Phones: price and main action always within thumb reach. */
export function MobileBuyBar({ title, price, inquiry, cart }: MobileBuyBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex items-center gap-3 border-t bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs text-muted-foreground">{title}</p>
        <p className="text-lg leading-tight font-extrabold">{price ? formatMoney(price) : 'Consultá el precio'}</p>
      </div>
      {cart.canAdd ? (
        <>
          {/* The floating launcher is hidden here: this is the way to ask about the product, or back to the chat. */}
          <AssistantTrigger
            product={inquiry}
            aria-label="Consultar con el asesor"
            className="grid size-11 shrink-0 place-items-center rounded-full border bg-background transition-colors hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <AssistantAvatar busy={false} />
          </AssistantTrigger>
          <Button
            onClick={event => cart.add(event.currentTarget)}
            disabled={cart.pending}
            className="h-11 shrink-0 rounded-full px-5 font-bold"
          >
            {cart.pending ? 'Agregando…' : 'Agregar al carrito'}
          </Button>
        </>
      ) : (
        <Button asChild className="h-11 shrink-0 rounded-full px-5 font-bold">
          <AssistantTrigger product={inquiry}>Consultar</AssistantTrigger>
        </Button>
      )}
    </div>
  )
}
