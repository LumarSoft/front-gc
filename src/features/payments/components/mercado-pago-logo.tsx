import Image from 'next/image'
import { cn } from '@/src/lib/utils'

/**
 * Mercado Pago's official logo (2025 kit, digital RGB, horizontal color version), used as provided: the brand kit
 * forbids editing the SVG. It is already vector, so it is served as is.
 */
export function MercadoPagoLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/payments/mercado-pago.svg"
      alt="Mercado Pago"
      width={105}
      height={43}
      unoptimized
      className={cn('h-12 w-auto', className)}
    />
  )
}
