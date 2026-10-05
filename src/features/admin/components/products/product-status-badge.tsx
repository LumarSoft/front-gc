import { PRODUCT_STATUS_LABELS } from '@/src/features/admin/lib/product-labels'
import { cn } from '@/src/lib/utils'
import type { ProductStatus } from '@/src/types/api/admin-products'

const TONES: Record<ProductStatus, { badge: string; dot: string }> = {
  PUBLISHED: { badge: 'bg-success/10 text-success', dot: 'bg-success' },
  DRAFT: { badge: 'bg-muted text-muted-foreground', dot: 'bg-muted-foreground/60' },
  HIDDEN: { badge: 'bg-warning/10 text-warning', dot: 'bg-warning' },
}

/** Dot + word for the product status, so it never depends on color alone. */
export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium',
        TONES[status].badge,
      )}
    >
      <span aria-hidden className={cn('size-1.5 rounded-full', TONES[status].dot)} />
      {PRODUCT_STATUS_LABELS[status]}
    </span>
  )
}
