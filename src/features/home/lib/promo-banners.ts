// TODO(admin): promo banners will be managed from the admin panel.

export type PromoBanner = {
  /** Small line above the title: Epson's logo or plain text. */
  eyebrow: 'epson-logo' | string
  title: string
  /** Optional second line of the title, in the accent color. */
  highlight?: string
  text: string
  cta: { label: string; href: string }
  image: string
  tone: 'light' | 'muted' | 'dark'
  /** Big typographic mark behind the product (only on the offers banner). */
  mark?: string
}

export const PROMO_BANNERS: PromoBanner[] = [
  {
    eyebrow: 'epson-logo',
    title: 'EcoTank',
    text: 'Imprimí más, gastá menos.',
    cta: { label: 'Ver EcoTank', href: '/productos?q=EcoTank' },
    image: '/images/home/ecotank-l14150.webp',
    tone: 'light',
  },
  {
    eyebrow: 'Soluciones',
    title: 'para tu negocio.',
    text: 'Oficina, diseño y cartelería.',
    cta: { label: 'Ver soluciones', href: '/categorias/impresoras-oficina' },
    image: '/images/home/ecotank-l6270.webp',
    tone: 'muted',
  },
  {
    eyebrow: 'Ofertas',
    title: 'destacadas',
    text: 'Equipos e insumos en oferta.',
    cta: { label: 'Ver ofertas', href: '/ofertas' },
    image: '/images/home/ecotank-l8180.webp',
    tone: 'dark',
    mark: '%',
  },
]
