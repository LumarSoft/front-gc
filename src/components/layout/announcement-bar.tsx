import { CreditCardIcon, StorefrontIcon, TruckIcon } from '@phosphor-icons/react/dist/ssr'
import { formatMoney } from '@/src/lib/format'
import { SAMPLE_FREE_SHIPPING_THRESHOLD } from '@/src/lib/site-config'

// SAMPLE copy: installments and the free-shipping threshold must come from the API/admin config.
const MESSAGES = [
  { icon: TruckIcon, text: `Envío gratis en Rosario desde ${formatMoney(SAMPLE_FREE_SHIPPING_THRESHOLD)}` },
  { icon: StorefrontIcon, text: 'Retiro gratis en nuestro local' },
  { icon: CreditCardIcon, text: 'Pagá en cuotas con Mercado Pago' },
]

export function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-navy text-navy-foreground">
      <div className="mx-auto hidden h-9 max-w-7xl items-center justify-center gap-10 px-6 text-xs font-medium md:flex">
        {MESSAGES.map(({ icon: Icon, text }) => (
          <p key={text} className="flex items-center gap-2">
            <Icon weight="light" className="size-4 text-navy-foreground/70" aria-hidden />
            {text}
          </p>
        ))}
      </div>
      <div className="flex h-9 items-center md:hidden">
        <div className="flex w-max motion-safe:animate-marquee">
          {[...MESSAGES, ...MESSAGES].map(({ icon: Icon, text }, index) => (
            <p
              key={`${text}-${index}`}
              aria-hidden={index >= MESSAGES.length}
              className="flex shrink-0 items-center gap-2 px-6 text-xs font-medium"
            >
              <Icon weight="light" className="size-4 text-navy-foreground/70" aria-hidden />
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
