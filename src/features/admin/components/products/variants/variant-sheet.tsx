'use client'

import { useState } from 'react'
import { ConfirmDialog } from '@/src/components/ui/confirm-dialog'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/src/components/ui/sheet'
import { StatusBadge } from '@/src/features/admin/components/common/status-badge'
import { VariantDetailsSection } from '@/src/features/admin/components/products/variants/variant-details-section'
import { VariantPricesSection } from '@/src/features/admin/components/products/variants/variant-prices-section'
import { VariantShippingSection } from '@/src/features/admin/components/products/variants/variant-shipping-section'
import { VariantStockSection } from '@/src/features/admin/components/products/variants/variant-stock-section'
import { DirtySectionsContext, useDirtySections } from '@/src/features/admin/hooks/use-dirty-sections'
import { usePriceLists } from '@/src/features/admin/hooks/use-pricing-data'
import { variantTitle } from '@/src/features/admin/lib/product-labels'
import type { AdminVariant } from '@/src/types/api/admin-products'

type VariantSheetProps = {
  productId: number
  /** The variant being edited (fresh from the product cache), or null when closed. */
  variant: AdminVariant | null
  onClose: () => void
}

/** Side panel to edit one variant without leaving the product: data, prices, stock and shipping. */
export function VariantSheet({ productId, variant, onClose }: VariantSheetProps) {
  const { data: priceLists = [] } = usePriceLists()
  const { registry, anyDirty } = useDirtySections()
  const [confirmingClose, setConfirmingClose] = useState(false)
  const requestClose = (): void => (anyDirty ? setConfirmingClose(true) : onClose())

  return (
    <DirtySectionsContext.Provider value={registry}>
      <ConfirmDialog
        open={confirmingClose}
        onOpenChange={setConfirmingClose}
        title="¿Descartar los cambios sin guardar?"
        description="Hay secciones de esta variante con cambios que todavía no guardaste."
        confirmLabel="Descartar y cerrar"
        destructive
        onConfirm={() => {
          setConfirmingClose(false)
          onClose()
        }}
      />
      <Sheet open={variant !== null} onOpenChange={open => !open && requestClose()}>
        <SheetContent
          side="right"
          className="w-full gap-0 bg-muted p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-xl"
        >
          {variant && (
            <>
              <SheetHeader className="border-b bg-background pr-12">
                <SheetTitle className="text-base">{variantTitle(variant)}</SheetTitle>
                <SheetDescription className="flex flex-wrap items-center gap-2">
                  <span className="font-mono">{variant.sku}</span>
                  {variant.isDefault && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-primary">
                      Principal
                    </span>
                  )}
                  <StatusBadge active={variant.isActive} activeLabel="A la venta" inactiveLabel="Inactiva" />
                </SheetDescription>
              </SheetHeader>
              <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 pb-safe-4 *:shrink-0">
                <VariantPricesSection productId={productId} variant={variant} priceLists={priceLists} />
                <VariantStockSection productId={productId} variant={variant} />
                <VariantDetailsSection productId={productId} variant={variant} />
                <VariantShippingSection productId={productId} variant={variant} />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </DirtySectionsContext.Provider>
  )
}
