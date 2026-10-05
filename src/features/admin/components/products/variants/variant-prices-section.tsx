'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { EditorSection } from '@/src/features/admin/components/common/editor-section'
import { PriceListRow } from '@/src/features/admin/components/products/variants/price-list-row'
import { useExchangeRates } from '@/src/features/admin/hooks/use-pricing-data'
import { useSectionForm } from '@/src/features/admin/hooks/use-section-form'
import { useVariantMutations } from '@/src/features/admin/hooks/use-variant-mutations'
import {
  toVariantPriceInputs,
  variantPricesSchema,
  variantPricesValues,
} from '@/src/features/admin/lib/variant-prices-form'
import type { AdminVariant } from '@/src/types/api/admin-products'
import type { PriceList } from '@/src/types/api/admin-pricing'

type VariantPricesSectionProps = { productId: number; variant: AdminVariant; priceLists: PriceList[] }

/** Manual prices per list, each in ARS or USD. */
export function VariantPricesSection({ productId, variant, priceLists }: VariantPricesSectionProps) {
  const { replacePrices } = useVariantMutations(productId)
  const { data: rates } = useExchangeRates()
  const { form, dirty, pending, save, discard } = useSectionForm({
    values: variantPricesValues(variant, priceLists),
    resolver: zodResolver(variantPricesSchema),
    onSave: values => replacePrices.mutate({ variantId: variant.id, prices: toVariantPriceInputs(values) }),
    pending: replacePrices.isPending,
  })

  return (
    <EditorSection
      title="Precios"
      description="Los precios en USD se cobran en pesos con la cotización vigente."
      dirty={dirty}
      pending={pending}
      onSave={save}
      onDiscard={discard}
    >
      <div className="flex flex-col gap-3">
        {priceLists.map((list, index) => (
          <PriceListRow key={list.id} form={form} index={index} list={list} usdRate={rates?.current?.rate ?? null} />
        ))}
      </div>
    </EditorSection>
  )
}
