import { CertificateIcon, StorefrontIcon, TruckIcon } from '@phosphor-icons/react/dist/ssr'

const ITEMS = [
  { icon: CertificateIcon, text: 'Producto original con garantía oficial' },
  { icon: StorefrontIcon, text: 'Retiro gratis en Rosario' },
  { icon: TruckIcon, text: 'Envíos a todo el país' },
]

export function ProductTrustList() {
  return (
    <ul className="grid gap-4 border-t pt-6 text-sm sm:grid-cols-3">
      {ITEMS.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-start gap-3">
          <Icon weight="light" className="size-6 shrink-0 text-primary" aria-hidden />
          {text}
        </li>
      ))}
    </ul>
  )
}
