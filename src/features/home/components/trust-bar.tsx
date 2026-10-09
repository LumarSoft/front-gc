import { BadgeCheck, Building2, CreditCard, Headset, Store, Wrench } from 'lucide-react'

const ITEMS = [
  { icon: Store, title: 'Retiro gratis', text: 'En nuestro local' },
  { icon: Headset, title: 'Asesoramiento', text: 'Te ayudamos a elegir' },
  { icon: CreditCard, title: 'Pago a coordinar', text: 'Con nuestro equipo' },
  { icon: Wrench, title: 'Acompañamiento', text: 'Antes y después de comprar' },
  { icon: BadgeCheck, title: 'Productos originales', text: 'Distribuidor oficial Epson' },
  { icon: Building2, title: 'Clientes frecuentes', text: 'Precios preferenciales' },
]

export function TrustBar() {
  return (
    <section aria-label="Beneficios de comprar con nosotros" className="border-b bg-surface/60">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-5 px-4 py-6 sm:grid-cols-3 sm:px-6 xl:flex xl:justify-between xl:py-5 xl:whitespace-nowrap">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3 xl:border-l xl:pl-6 xl:first:border-l-0 xl:first:pl-0">
            <Icon strokeWidth={1.25} className="size-8 shrink-0 text-primary" aria-hidden />
            <span className="min-w-0">
              <span className="block text-sm leading-tight font-bold">{title}</span>
              <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
