'use client'

import { ExternalLinkIcon, EyeIcon, EyeOffIcon, PencilLineIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { ProductIssueChips } from '@/src/features/admin/components/products/product-issue-chips'
import { ProductStatusBadge } from '@/src/features/admin/components/products/product-status-badge'
import { useProductMutations } from '@/src/features/admin/hooks/use-product-mutations'
import { BLOCKING_ISSUES } from '@/src/features/admin/lib/product-labels'
import { formatDateTime } from '@/src/lib/format'
import type { AdminProduct } from '@/src/types/api/admin-products'

/** Visibility in the store and what is missing to publish. */
export function StatusCard({ product }: { product: AdminProduct }) {
  const { setStatus } = useProductMutations(product.id)
  const blocked = product.issues.some(issue => BLOCKING_ISSUES.includes(issue))
  const published = product.status === 'PUBLISHED'

  return (
    <Card className="shadow-xs ring-foreground/8">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Estado</CardTitle>
        <ProductStatusBadge status={product.status} />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {product.issues.length > 0 && (
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-muted-foreground">
              {blocked ? 'Para publicarlo falta resolver:' : 'Se puede publicar, pero conviene revisar:'}
            </p>
            <ProductIssueChips issues={product.issues} />
          </div>
        )}
        <div className="flex flex-col gap-2">
          {published ? (
            <Button variant="outline" disabled={setStatus.isPending} onClick={() => setStatus.mutate('HIDDEN')}>
              <EyeOffIcon />
              Ocultar de la tienda
            </Button>
          ) : (
            <Button disabled={blocked || setStatus.isPending} onClick={() => setStatus.mutate('PUBLISHED')}>
              <EyeIcon />
              Publicar
            </Button>
          )}
          {product.status !== 'DRAFT' && (
            <Button variant="ghost" disabled={setStatus.isPending} onClick={() => setStatus.mutate('DRAFT')}>
              <PencilLineIcon />
              Pasar a borrador
            </Button>
          )}
          {published && (
            <Button asChild variant="ghost">
              <Link href={`/productos/${product.slug}`} target="_blank">
                <ExternalLinkIcon />
                Ver en la tienda
              </Link>
            </Button>
          )}
        </div>
        <dl className="flex flex-col gap-1 border-t pt-3 text-xs text-muted-foreground">
          {product.publishedAt && (
            <div className="flex justify-between gap-3">
              <dt>Publicado</dt>
              <dd className="tabular-nums">{formatDateTime(product.publishedAt)}</dd>
            </div>
          )}
          <div className="flex justify-between gap-3">
            <dt>Última edición</dt>
            <dd className="tabular-nums">{formatDateTime(product.updatedAt)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
