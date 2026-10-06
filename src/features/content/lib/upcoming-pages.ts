import type { Metadata } from 'next'
import type { UpcomingAction } from '@/src/components/ui/upcoming-page'

type UpcomingContent = {
  section: string
  title: string
  description: string
  meanwhile?: string
  actions: UpcomingAction[]
}

const BROWSE: UpcomingAction = { label: 'Ver productos', href: '/productos' }
const HOME: UpcomingAction = { label: 'Ir al inicio', href: '/' }
const TRACK: UpcomingAction = { label: 'Seguí tu pedido', href: '/pedidos' }

// Pages linked from the store whose content (from the client) or feature is not ready yet. The copy only states what
// the store really does today: never invent policies, legal text or company data here.
export const UPCOMING_PAGES = {
  assistant: {
    section: 'Asistente',
    title: 'Te ayudamos a elegir',
    description:
      'Estamos preparando un asistente que responde tus dudas y te recomienda el equipo justo para lo que necesitás.',
    meanwhile: 'Podés buscar por nombre o modelo y filtrar los productos por uso en el catálogo.',
    actions: [BROWSE, HOME],
  },
  configurator: {
    section: 'Asesor guiado',
    title: 'Armá tu equipo ideal',
    description:
      'Estamos preparando un asesor que, con un par de preguntas, te recomienda la impresora justa para tu uso.',
    actions: [BROWSE, HOME],
  },
  shipping: {
    section: 'Ayuda',
    title: 'Envíos y retiro',
    description: 'Estamos preparando el detalle de zonas, costos y plazos de entrega.',
    meanwhile: 'Al finalizar tu compra ves las opciones de entrega disponibles y su costo antes de confirmar.',
    actions: [BROWSE, TRACK],
  },
  paymentMethods: {
    section: 'Ayuda',
    title: 'Medios de pago',
    description: 'Estamos preparando el detalle de los medios de pago disponibles.',
    meanwhile: 'Hoy, al confirmar tu pedido, reservamos tus productos y el pago se coordina con el local.',
    actions: [BROWSE, TRACK],
  },
  warranty: {
    section: 'Ayuda',
    title: 'Garantía oficial',
    description: 'Estamos preparando la información sobre garantía y servicio técnico de los equipos.',
    actions: [BROWSE, HOME],
  },
  faq: {
    section: 'Ayuda',
    title: 'Preguntas frecuentes',
    description: 'Estamos reuniendo las respuestas a las consultas más comunes sobre compras, entregas y equipos.',
    actions: [BROWSE, TRACK],
  },
  terms: {
    section: 'Legales',
    title: 'Términos y condiciones',
    description: 'Estamos preparando los términos y condiciones de uso de la tienda. Se publican acá muy pronto.',
    actions: [HOME],
  },
  privacy: {
    section: 'Legales',
    title: 'Política de privacidad',
    description: 'Estamos preparando la política de privacidad de la tienda. Se publica acá muy pronto.',
    actions: [HOME],
  },
  cookies: {
    section: 'Legales',
    title: 'Política de cookies',
    description: 'Estamos preparando la política de cookies de la tienda. Se publica acá muy pronto.',
    actions: [HOME],
  },
  withdrawal: {
    section: 'Legales',
    title: 'Botón de arrepentimiento',
    description: 'Estamos preparando el formulario para pedir la revocación de una compra. Se publica acá muy pronto.',
    actions: [TRACK, HOME],
  },
  about: {
    section: 'Empresa',
    title: 'Quiénes somos',
    description: 'Estamos preparando nuestra historia: más de 50 años acompañando a imprentas, empresas y hogares.',
    actions: [BROWSE, HOME],
  },
  contact: {
    section: 'Empresa',
    title: 'Contacto',
    description: 'Estamos preparando los canales de contacto y atención del local.',
    meanwhile: 'Si ya hiciste un pedido, podés ver su estado con el enlace privado que guardaste al confirmarlo.',
    actions: [TRACK, BROWSE],
  },
} satisfies Record<string, UpcomingContent>

export type UpcomingPageKey = keyof typeof UPCOMING_PAGES

/** Placeholder pages stay out of search results until they have real content. */
export function upcomingMetadata(key: UpcomingPageKey): Metadata {
  return { title: UPCOMING_PAGES[key].title, robots: { index: false, follow: true } }
}
