'use client'

import { cn } from '@/src/lib/utils'

type QuoteRadioProps = {
  checked: boolean
  onSelect: () => void
  className?: string
  children: React.ReactNode
  inputRef?: React.Ref<HTMLInputElement>
}

/** One choosable shipping option: the whole row is the label of its radio. */
export function QuoteRadio({ checked, onSelect, className, children, inputRef }: QuoteRadioProps) {
  return (
    <label className={cn('flex cursor-pointer gap-3', className)}>
      <input
        ref={inputRef}
        type="radio"
        name="shippingQuoteId"
        checked={checked}
        onChange={onSelect}
        className="mt-1 size-4 shrink-0 accent-primary"
      />
      <span className="min-w-0 flex-1">{children}</span>
    </label>
  )
}
