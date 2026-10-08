'use client'

import { PlusIcon } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { ArchiveConfirmDialog } from '@/src/features/admin/components/common/archive-confirm-dialog'
import { AddVariantDialog } from '@/src/features/admin/components/products/variants/add-variant-dialog'
import { VariantRow } from '@/src/features/admin/components/products/variants/variant-row'
import { VariantSheet } from '@/src/features/admin/components/products/variants/variant-sheet'
import { useExchangeRates, usePriceLists } from '@/src/features/admin/hooks/use-pricing-data'
import { useVariantsCard } from '@/src/features/admin/hooks/use-variants-card'
import { variantTitle } from '@/src/features/admin/lib/product-labels'
import type { AdminProduct } from '@/src/types/api/admin-products'

/** Variants with their prices per list and stock; click one to edit it in a side panel. */
export function VariantsCard({ product }: { product: AdminProduct }) {
  const { data: priceLists = [] } = usePriceLists()
  const { data: rates } = useExchangeRates()
  const card = useVariantsCard(product)
  const isLast = product.variants.length <= 1

  return (
    <Card className="gap-0 pb-0 shadow-xs ring-foreground/8">
      <CardHeader className="border-b">
        <CardTitle>Variantes y precios</CardTitle>
        <CardDescription>
          Cada variante es un SKU con su precio por lista y su stock. Tocá una para editarla.
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm" onClick={() => card.setAdding(true)}>
            <PlusIcon />
            Agregar variante
          </Button>
        </CardAction>
      </CardHeader>
      <div className="hidden gap-4 border-b bg-muted/40 px-4 py-2 pr-14 text-xs font-medium text-muted-foreground sm:flex">
        <span className="flex-1">Variante</span>
        {priceLists.map(list => (
          <span key={list.id} className="w-32 text-right">
            {list.audience === 'RETAIL' ? 'Minorista' : 'Clientes frecuentes'}
          </span>
        ))}
        <span className="w-24 text-right">Stock</span>
      </div>
      <ul className="divide-y">
        {product.variants.map(variant => (
          <VariantRow
            key={variant.id}
            variant={variant}
            priceLists={priceLists}
            usdRate={rates?.current?.rate ?? null}
            onEdit={() => card.edit(variant)}
            onMakeDefault={() => card.makeDefault(variant)}
            onArchive={() => card.askArchive(variant)}
          />
        ))}
      </ul>
      <VariantSheet productId={product.id} variant={card.editing} onClose={card.closeEditor} />
      <AddVariantDialog productId={product.id} open={card.adding} onOpenChange={card.setAdding} onCreated={card.edit} />
      <ArchiveConfirmDialog
        name={card.archiving ? variantTitle(card.archiving) : null}
        blocker={
          isLast
            ? 'Es la única variante: un producto necesita al menos una. Para sacarlo de la tienda, ocultalo.'
            : null
        }
        consequence="Deja de venderse. Sus fotos quedan en la galería del producto."
        onConfirm={card.confirmArchive}
        onDismiss={card.cancelArchive}
      />
    </Card>
  )
}
