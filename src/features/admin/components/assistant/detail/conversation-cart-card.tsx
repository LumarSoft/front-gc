import { PackageIcon } from 'lucide-react'
import Link from 'next/link'
import { ItemThumb } from '@/src/features/admin/components/common/item-thumb'
import { AdminCard } from '@/src/features/admin/components/common/admin-card'
import { messageTimes } from '@/src/features/admin/lib/assistant-display'
import type { AdminCartAdd } from '@/src/types/api/admin-assistant'

/** What the customer added to the cart from the assistant's cards, and when (whether they bought is not known here). */
export function ConversationCartCard({ cartAdds }: { cartAdds: AdminCartAdd[] }) {
  const times = messageTimes(cartAdds)
  return (
    <AdminCard title="Agregó al carrito">
      <ul className="-my-2 divide-y">
        {cartAdds.map((add, index) => (
          <li key={`${add.product.id}-${add.createdAt}`} className="flex items-center gap-3 py-2">
            <ItemThumb url={add.product.imageUrl} fallbackIcon={PackageIcon} size="sm" />
            <div className="flex min-w-0 flex-1 flex-col">
              {add.product.archived ? (
                <span className="line-clamp-2 text-sm text-muted-foreground">{add.product.name}</span>
              ) : (
                <Link
                  href={`/admin/productos/${add.product.id}`}
                  className="line-clamp-2 text-sm font-medium hover:underline"
                >
                  {add.product.name}
                </Link>
              )}
              <time dateTime={add.createdAt} className="text-xs text-muted-foreground">
                {times[index]}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </AdminCard>
  )
}
