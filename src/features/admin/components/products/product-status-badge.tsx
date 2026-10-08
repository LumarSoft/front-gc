import { ToneBadge, type BadgeTone } from '@/src/features/admin/components/common/tone-badge'
import { PRODUCT_STATUS_LABELS } from '@/src/features/admin/lib/product-labels'
import type { ProductStatus } from '@/src/types/api/admin-products'

const TONES: Record<ProductStatus, BadgeTone> = {
  PUBLISHED: 'success',
  DRAFT: 'info',
  HIDDEN: 'neutral',
}

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  return <ToneBadge tone={TONES[status]}>{PRODUCT_STATUS_LABELS[status]}</ToneBadge>
}
