import {
  ArrowUUpLeftIcon,
  CertificateIcon,
  CreditCardIcon,
  StorefrontIcon,
  TruckIcon,
} from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/src/lib/utils'

const ITEMS = [
  { icon: CertificateIcon, title: 'Distribuidor oficial', text: 'Productos Epson originales con garantía' },
  { icon: StorefrontIcon, title: 'Retiro gratis', text: 'Comprá online y retirá en Rosario' },
  { icon: TruckIcon, title: 'Opciones de entrega', text: 'Consultá la disponibilidad al comprar' },
  {
    icon: CreditCardIcon,
    title: 'Pago en el local',
    text: 'Coordiná el pago con nuestro equipo',
    desktopOnly: true,
  },
  { icon: ArrowUUpLeftIcon, title: 'Compra protegida', text: 'Botón de arrepentimiento' },
]

export function TrustBar() {
  return (
    <section aria-label="Beneficios de comprar con nosotros" className="relative z-10 -mt-8 px-4 sm:px-6 lg:-mt-12">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-3xl border bg-border shadow-xl shadow-navy/5 lg:grid-cols-5">
        {ITEMS.map(({ icon: Icon, title, text, desktopOnly }) => (
          <li
            key={title}
            className={cn(
              'flex flex-col gap-2 bg-background p-4 sm:flex-row sm:items-start sm:gap-3 sm:p-5',
              desktopOnly && 'hidden lg:flex',
            )}
          >
            <Icon weight="light" className="size-7 shrink-0 text-primary" aria-hidden />
            <span>
              <span className="block text-sm font-bold">{title}</span>
              <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
