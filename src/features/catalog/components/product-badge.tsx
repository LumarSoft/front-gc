import { Badge } from '@/src/components/ui/badge'
import { cn } from '@/src/lib/utils'
import type { ProductBadge as ProductBadgeType } from '@/src/types/api/products'

const BADGE_CONFIG: Record<ProductBadgeType, { label: string; className: string }> = {
  OFFER: { label: 'Oferta', className: 'bg-sale text-sale-foreground' },
  NEW: { label: 'Nuevo', className: 'bg-primary text-primary-foreground' },
  BEST_SELLER: { label: 'Más vendido', className: 'bg-yellow text-foreground' },
}

type ProductBadgeProps = {
  badge: ProductBadgeType
  className?: string
}

export function ProductBadge({ badge, className }: ProductBadgeProps) {
  const config = BADGE_CONFIG[badge]
  return <Badge className={cn('rounded-full font-bold', config.className, className)}>{config.label}</Badge>
}
