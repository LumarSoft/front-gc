import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import { formatMoney } from '@/src/lib/format'
import type { Money } from '@/src/types/api/money'

type MobileBuyBarProps = {
  title: string
  price: Money | null
  inquiryHref: string
}

/** Phones: price and main action always within thumb reach. */
export function MobileBuyBar({ title, price, inquiryHref }: MobileBuyBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex items-center gap-3 border-t bg-background/95 px-4 py-3 backdrop-blur lg:hidden">
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs text-muted-foreground">{title}</p>
        <p className="text-lg leading-tight font-extrabold">{price ? formatMoney(price) : 'Consultá el precio'}</p>
      </div>
      <Button asChild className="h-11 shrink-0 rounded-full px-5 font-bold">
        <Link href={inquiryHref}>Consultar</Link>
      </Button>
    </div>
  )
}
