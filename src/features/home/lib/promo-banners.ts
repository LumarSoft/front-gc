// TODO(admin): promo banners will be managed from the admin panel.
// The artwork already carries the headline and copy; the card only adds the button.

export type PromoBanner = {
  image: string
  /** Same words as the artwork, for screen readers and search engines. */
  alt: string
  cta: { label: string; href: string }
}

export const PROMO_BANNERS: PromoBanner[] = [
  {
    image: '/images/home/promo-ecotank.webp',
    alt: 'Epson EcoTank: imprimí más, gastá menos.',
    cta: { label: 'Ver EcoTank', href: '/productos?q=EcoTank' },
  },
  {
    image: '/images/home/promo-soluciones.webp',
    alt: 'Soluciones para tu negocio: oficina, diseño, cartelería y más.',
    cta: { label: 'Ver soluciones', href: '/categorias/impresoras-oficina' },
  },
  {
    image: '/images/home/promo-ofertas.webp',
    alt: 'Ofertas destacadas: equipos e insumos al mejor precio.',
    cta: { label: 'Ver ofertas', href: '/ofertas' },
  },
]
