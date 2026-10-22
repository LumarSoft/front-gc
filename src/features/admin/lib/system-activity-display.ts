import type { SystemActivity } from '@/src/types/api/admin-system'

/** What each audited action did, as staff would say it. Unknown actions show their code. */
const ACTION_LABELS: Record<string, string> = {
  'product.create': 'Creó un producto',
  'product.update': 'Editó un producto',
  'product.status': 'Cambió el estado de un producto',
  'product.archive': 'Archivó un producto',
  'product.duplicate': 'Duplicó un producto',
  'product.images': 'Cambió las fotos de un producto',
  'product.tags': 'Cambió las etiquetas de un producto',
  'product.specifications': 'Cambió las especificaciones de un producto',
  'variant.create': 'Creó una variante',
  'variant.update': 'Editó una variante',
  'variant.prices': 'Cambió precios de una variante',
  'variant.default': 'Eligió la variante principal',
  'variant.archive': 'Archivó una variante',
  'stock.adjust': 'Ajustó el stock',
  'category.create': 'Creó una categoría',
  'category.update': 'Editó una categoría',
  'category.reorder': 'Reordenó las categorías',
  'category.archive': 'Archivó una categoría',
  'brand.create': 'Creó una marca',
  'brand.update': 'Editó una marca',
  'brand.reorder': 'Reordenó las marcas',
  'brand.archive': 'Archivó una marca',
  'tag.create': 'Creó una etiqueta',
  'tag.update': 'Editó una etiqueta',
  'tag.archive': 'Archivó una etiqueta',
  'order.status': 'Cambió el estado de un pedido',
  'payment.updated': 'Registró un pago',
  'shipment.create': 'Reservó un envío',
  'shipment.cancel': 'Canceló un envío',
  'settings.reservation': 'Cambió el tiempo de reserva',
  'settings.local-delivery': 'Cambió el envío en Rosario',
  'exchange-rate.create': 'Cargó la cotización del dólar',
  'file.upload': 'Subió una imagen',
  'wholesale-application.approve': 'Aprobó un cliente frecuente',
  'wholesale-application.reject': 'Rechazó un cliente frecuente',
  'wholesale-application.pause': 'Pausó un cliente frecuente',
  'wholesale-application.resume': 'Reactivó un cliente frecuente',
  'assistant-question.answer': 'Completó un dato faltante',
  'assistant-question.dismiss': 'Descartó un dato faltante',
  'assistant-question.reopen': 'Volvió a pendiente un dato faltante',
}

/** Entity types as staff know them, for the filter. */
const ENTITY_LABELS: Record<string, string> = {
  Product: 'Productos',
  ProductVariant: 'Variantes',
  Category: 'Categorías',
  Brand: 'Marcas',
  Tag: 'Etiquetas',
  Order: 'Pedidos',
  ExchangeRate: 'Cotización del dólar',
  Setting: 'Configuración',
  ShippingMethod: 'Envíos',
  StoredFile: 'Imágenes',
  WholesaleApplication: 'Clientes frecuentes',
  UnansweredQuestion: 'Datos faltantes',
}

export const actionLabel = (action: string): string => ACTION_LABELS[action] ?? action
export const entityLabel = (entityType: string): string => ENTITY_LABELS[entityType] ?? entityType

/** Where the changed record can be opened in the admin; null when it has no page of its own. */
export function entityHref(entry: Pick<SystemActivity, 'entityType' | 'entityId'>): string | null {
  const id = entry.entityId
  switch (entry.entityType) {
    case 'Product':
      return id ? `/admin/productos/${id}` : null
    case 'Order':
      return id ? `/admin/pedidos/${id}` : null
    case 'WholesaleApplication':
      return id ? `/admin/clientes-frecuentes/${id}` : null
    case 'Category':
      return '/admin/categorias'
    case 'Brand':
      return '/admin/marcas'
    case 'Tag':
      return '/admin/etiquetas'
    case 'ExchangeRate':
      return '/admin/cotizacion'
    case 'Setting':
    case 'ShippingMethod':
      return '/admin/configuracion'
    case 'UnansweredQuestion':
      return '/admin/asistente/preguntas'
    default:
      return null
  }
}

/** A changed value as text: "—" for nothing, JSON for lists and objects, cut to stay readable. */
export function changeValue(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—'
  const text = typeof value === 'string' ? value : typeof value === 'object' ? JSON.stringify(value) : String(value)
  return text.length > 160 ? `${text.slice(0, 159)}…` : text
}
