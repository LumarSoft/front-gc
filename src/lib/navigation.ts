/**
 * Store navigation. Category slugs are placeholders until the categories API exists.
 * TODO(api): load categories from the API.
 */
export type NavLink = {
  label: string
  href: string
}

export const CATEGORY_LINKS: NavLink[] = [
  { label: 'Impresoras', href: '/categorias/impresoras' },
  { label: 'Tintas y consumibles', href: '/categorias/tintas' },
  { label: 'Papeles', href: '/categorias/papeles' },
  { label: 'Escáneres', href: '/categorias/escaneres' },
  { label: 'Proyectores', href: '/categorias/proyectores' },
  { label: 'Gran formato', href: '/categorias/gran-formato' },
  { label: 'Sublimación y textil', href: '/categorias/sublimacion' },
  { label: 'Puntos de venta', href: '/categorias/puntos-de-venta' },
]

export const OFFERS_LINK: NavLink = { label: 'Ofertas', href: '/ofertas' }

export const HIGHLIGHT_LINKS: NavLink[] = [
  OFFERS_LINK,
  { label: 'Ayudame a elegir', href: '/configurador' },
  { label: 'Clientes frecuentes', href: '/clientes-frecuentes' },
]

export const HELP_LINKS: NavLink[] = [
  { label: 'Envíos y retiro', href: '/ayuda/envios' },
  { label: 'Medios de pago', href: '/ayuda/medios-de-pago' },
  { label: 'Garantía oficial', href: '/ayuda/garantia' },
  { label: 'Preguntas frecuentes', href: '/ayuda/preguntas-frecuentes' },
  { label: 'Seguí tu pedido', href: '/pedidos' },
]

export const COMPANY_LINKS: NavLink[] = [
  { label: 'Quiénes somos', href: '/nosotros' },
  { label: 'Clientes frecuentes', href: '/clientes-frecuentes' },
  { label: 'Contacto', href: '/contacto' },
]

export const LEGAL_LINKS: NavLink[] = [
  { label: 'Términos y condiciones', href: '/legales/terminos' },
  { label: 'Política de privacidad', href: '/legales/privacidad' },
  { label: 'Política de cookies', href: '/legales/cookies' },
]

export const WITHDRAWAL_LINK: NavLink = { label: 'Botón de arrepentimiento', href: '/arrepentimiento' }
