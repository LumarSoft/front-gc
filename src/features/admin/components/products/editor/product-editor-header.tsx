'use client'

import { ArchiveIcon, ArrowLeftIcon, CopyIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { ArchiveConfirmDialog } from '@/src/features/admin/components/common/archive-confirm-dialog'
import { RowActions } from '@/src/features/admin/components/common/row-actions'
import { ProductStatusBadge } from '@/src/features/admin/components/products/product-status-badge'
import { useProductActions } from '@/src/features/admin/hooks/use-product-actions'
import type { AdminProduct } from '@/src/types/api/admin-products'

/** Back to the list, product name and status, and the actions on the whole product. */
export function ProductEditorHeader({ product }: { product: AdminProduct }) {
  const actions = useProductActions(product.id)

  return (
    <header className="mb-6 flex items-start gap-3">
      <Button asChild variant="outline" size="icon" className="mt-0.5 shrink-0">
        <Link href="/admin/productos" aria-label="Volver a productos">
          <ArrowLeftIcon />
        </Link>
      </Button>
      <div className="min-w-0 flex-1">
        <h1 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">{product.name}</h1>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <ProductStatusBadge status={product.status} />
          <span className="font-mono text-xs text-muted-foreground">{product.variants[0]?.sku}</span>
        </div>
      </div>
      <RowActions
        itemName={product.name}
        actions={[
          { label: 'Duplicar', icon: CopyIcon, onSelect: actions.duplicate, disabled: actions.isDuplicating },
          { label: 'Archivar…', icon: ArchiveIcon, onSelect: actions.askArchive, destructive: true },
        ]}
      />
      <ArchiveConfirmDialog
        name={actions.confirmingArchive ? product.name : null}
        blocker={null}
        consequence="Sale de la tienda y de este listado. Los pedidos ya hechos no cambian."
        onConfirm={actions.archive}
        onDismiss={actions.cancelArchive}
      />
    </header>
  )
}
