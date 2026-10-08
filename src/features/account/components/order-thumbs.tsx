import Image from 'next/image'
import { ProductImagePlaceholder } from '@/src/features/catalog/components/product-image-placeholder'
import { cn } from '@/src/lib/utils'
import type { Order } from '@/src/types/api/orders'

/** Up to three overlapping product photos (only the first one on phones). */
export function OrderThumbs({ items }: { items: Order['items'] }) {
  return (
    <div className="flex shrink-0" aria-hidden>
      {items.slice(0, 3).map((item, index) => (
        <div
          key={`${item.sku}-${index}`}
          className={cn(
            'relative size-12 overflow-hidden sm:size-14 rounded-xl border-2 border-background bg-surface',
            index > 0 && '-ml-6 hidden sm:block',
          )}
        >
          {item.imageUrl ? (
            <Image src={item.imageUrl} alt="" fill sizes="56px" className="object-contain p-1.5" />
          ) : (
            <ProductImagePlaceholder className="scale-50" />
          )}
        </div>
      ))}
    </div>
  )
}
