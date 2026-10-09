// TODO(admin): hero slides will be managed from the admin panel (banners).
// Product photos are Epson's, with the white studio background removed so they sit on the navy hero.

export type HeroSlide = {
  /** First line of the headline. */
  title: string
  /** Second line, in the accent color. */
  highlight: string
  text: string
  cta: { label: string; href: string }
  image: { src: string; alt: string }
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    title: 'Imprimí',
    highlight: 'tus ideas.',
    text: 'Equipos, insumos y asesoramiento para que tu impresión siempre sea un paso más grande.',
    cta: { label: 'Ver productos', href: '/productos' },
    image: {
      src: '/images/home/hero-ecotank-l8050.webp',
      alt: 'Impresora fotográfica Epson EcoTank L8050 imprimiendo una foto',
    },
  },
  {
    title: 'Gran formato,',
    highlight: 'sin límites.',
    text: 'Plotters y papeles profesionales para planos, cartelería y fotografía, con asesoramiento técnico.',
    cta: { label: 'Ver gran formato', href: '/categorias/gran-formato' },
    image: {
      src: '/images/home/surecolor-p7370.webp',
      alt: 'Impresora de gran formato Epson SureColor P7370 con una lámina impresa',
    },
  },
  {
    title: 'Precios',
    highlight: 'preferenciales.',
    text: '¿Tenés una imprenta, comercio o empresa? Solicitá tu cuenta de cliente frecuente y comprá con cuenta corriente.',
    cta: { label: 'Solicitá tu cuenta', href: '/clientes-frecuentes/alta' },
    image: {
      src: '/images/home/ecotank-l6270.webp',
      alt: 'Impresora multifuncional Epson EcoTank L6270 para oficina',
    },
  },
]
