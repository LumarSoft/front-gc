import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { AccountCard } from '@/src/features/account/components/account-card'

// TODO(orders): list the customer's orders once the orders module exists.
export function OrdersCard() {
  return (
    <AccountCard title="Mis pedidos">
      <p className="text-sm text-muted-foreground">Acá vas a ver tus pedidos, su estado y el seguimiento del envío.</p>
      <Button asChild className="mt-auto h-10 self-start rounded-full px-5">
        <Link href="/productos">Ir a la tienda</Link>
      </Button>
    </AccountCard>
  )
}
