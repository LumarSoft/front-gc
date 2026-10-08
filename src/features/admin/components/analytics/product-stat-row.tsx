import Link from 'next/link'
import { PackageIcon } from '@phosphor-icons/react/dist/ssr'
import { ItemThumb } from '@/src/features/admin/components/common/item-thumb'
import type { AnalyticsProduct } from '@/src/types/api/admin-behavior'

type ProductStatRowProps = {
  rank: number
  product: AnalyticsProduct
  /** The row's main number ("16,56 M ARS", "96 visitantes"). */
  value: string
  /** Bar length against the first row, 0–1. */
  ratio: number
  /** Under the bar, left: secondary numbers ("2 unidades"). */
  detail: React.ReactNode
  /** Under the bar, right: the change or another number. */
  aside?: React.ReactNode
}

/** One product of a stats ranking: rank, photo, name (linked unless archived), its number and a bar. */
export function ProductStatRow({ rank, product, value, ratio, detail, aside }: ProductStatRowProps) {
  return (
    <li className="flex items-start gap-3 px-4 py-2.5">
      <span className="mt-2 w-4 shrink-0 text-right text-xs text-muted-foreground tabular-nums">{rank}</span>
      <ItemThumb url={product.imageUrl} fallbackIcon={PackageIcon} size="sm" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-baseline justify-between gap-3">
          {product.archived ? (
            <span className="line-clamp-2 text-sm">{product.name} (archivado)</span>
          ) : (
            <Link href={`/admin/productos/${product.id}`} className="line-clamp-2 text-sm hover:underline">
              {product.name}
            </Link>
          )}
          <span className="shrink-0 text-sm font-medium tabular-nums">{value}</span>
        </div>
        {/* Full-width track in every row, so bar lengths compare across rows. */}
        <div className="h-1.5 rounded-full bg-chart-track">
          <div className="h-full rounded-full bg-chart-series" style={{ width: `${Math.min(ratio, 1) * 100}%` }} />
        </div>
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>{detail}</span>
          {aside}
        </div>
      </div>
    </li>
  )
}
