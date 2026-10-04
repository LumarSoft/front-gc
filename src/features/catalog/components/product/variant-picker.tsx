import { cn } from '@/src/lib/utils'
import type { ProductVariant } from '@/src/types/api/catalog'

type VariantPickerProps = {
  variants: ProductVariant[]
  selected: ProductVariant | undefined
  onSelect: (variantId: number) => void
}

/** Chips to pick a variant. Out-of-stock options stay selectable (to see them) but look crossed out. */
export function VariantPicker({ variants, selected, onSelect }: VariantPickerProps) {
  if (variants.length < 2) return null
  const optionName = selected?.optionValues ? Object.keys(selected.optionValues)[0] : undefined

  return (
    <fieldset>
      <legend className="text-sm font-bold">
        {optionName ?? 'Opción'}: <span className="font-normal text-muted-foreground">{selected?.name}</span>
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {variants.map(variant => (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant.id)}
            aria-pressed={variant.id === selected?.id}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              variant.id === selected?.id
                ? 'border-foreground bg-foreground text-background'
                : 'hover:border-foreground',
              variant.availability === 'OUT_OF_STOCK' && 'line-through decoration-1 opacity-60',
            )}
          >
            {variant.name ?? variant.sku}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
