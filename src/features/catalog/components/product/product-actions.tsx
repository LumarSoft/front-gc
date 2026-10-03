import Link from 'next/link'
import { Button } from '@/src/components/ui/button'

type ProductActionsProps = {
  inquiryHref: string
}

export function ProductActions({ inquiryHref }: ProductActionsProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* TODO(cart): enable when the cart is built (next stage). */}
      <Button size="lg" disabled className="h-12 rounded-full text-base font-bold">
        Agregar al carrito
      </Button>
      <p className="text-center text-xs text-muted-foreground">Muy pronto vas a poder comprar online.</p>
      <Button asChild size="lg" variant="outline" className="h-12 rounded-full text-base font-semibold">
        <Link href={inquiryHref}>Consultar por este producto</Link>
      </Button>
    </div>
  )
}
