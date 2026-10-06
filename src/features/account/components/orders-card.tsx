import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { AccountCard } from '@/src/features/account/components/account-card'

// TODO(orders): add an authenticated order list; the current flow uses private tracking links.
export function OrdersCard() {
  return (
    <AccountCard title="Mis pedidos">
      <p className="text-sm text-muted-foreground">
        Consultá el estado con el enlace privado que recibiste al confirmar tu pedido.
      </p>
      <Button asChild className="mt-auto h-10 self-start rounded-full px-5">
        <Link href="/pedidos">Seguir un pedido</Link>
      </Button>
    </AccountCard>
  )
}
