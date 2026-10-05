import { ApiError } from '@/src/lib/api-client'

/** API messages (English, stable) the admin can act on, translated. Matched in order, first match wins. */
const KNOWN_MESSAGES: [RegExp | string, string][] = [
  [/SKU .* archived record/, 'Ese SKU pertenece a un producto archivado. Usá otro.'],
  [/SKU .* already in use/, 'Ese SKU ya lo usa otro producto.'],
  ['crossed-out price must be higher', 'El precio tachado tiene que ser mayor que el precio.'],
  ['greater than zero', 'El valor tiene que ser mayor que cero.'],
  ['one price per price list', 'Cargá un solo precio por lista.'],
  ['below the', 'El stock no puede quedar por debajo de las unidades reservadas por pedidos abiertos.'],
  ['another default variant before deactivating', 'Elegí otra variante principal antes de desactivar esta.'],
  ['Activate the variant before making it the default', 'Activá la variante antes de hacerla principal.'],
  ['Activate another variant before archiving', 'Activá otra variante antes de archivar la principal.'],
  ['at least one variant', 'El producto necesita al menos una variante.'],
  ['Each option needs', 'Cada opción necesita un nombre y un valor.'],
  ['up to 5 options', 'Usá hasta 5 opciones.'],
  ['cannot start in the past', 'La cotización no puede empezar en el pasado. Elegí ahora o una fecha futura.'],
  ['saved at the same time', 'Alguien guardó un cambio al mismo tiempo. Probá de nuevo.'],
  ['Cannot publish', 'Para publicarlo necesita al menos una variante activa con precio minorista.'],
  ['do not belong to this product', 'La lista cambió mientras la editabas. Recargá la página y probá de nuevo.'],
  ['Some images do not exist', 'Alguna imagen ya no existe. Subila de nuevo.'],
  ['Some tags do not exist', 'Alguna etiqueta ya no existe. Recargá la página.'],
  ['two levels only', 'Las subcategorías no pueden tener subcategorías propias.'],
  ['cannot become a subcategory', 'Una categoría con subcategorías no puede pasar a ser subcategoría.'],
  ['its own parent', 'Una categoría no puede ser su propia categoría principal.'],
  ['subcategories first', 'Primero mové o archivá sus subcategorías.'],
  ['products to another category', 'Tiene productos: movelos a otra categoría antes de archivarla.'],
  ['products to another brand', 'Tiene productos: movelos a otra marca o desactivala en lugar de archivarla.'],
  ['belongs to an archived record', 'Ese identificador (slug) pertenece a un elemento archivado. Usá otro.'],
  ['already in use', 'Ya existe otro elemento con ese identificador (slug). Cambiá el nombre o el slug.'],
  ['same unique value', 'Ya existe otro elemento con ese identificador (slug). Cambiá el nombre o el slug.'],
  ['must be a JPG', 'El archivo tiene que ser una imagen JPG, PNG, WebP o AVIF.'],
  ['does not exist', 'La imagen o el elemento elegido ya no existe. Recargá la página y probá de nuevo.'],
  ['letters or numbers', 'El nombre tiene que tener letras o números.'],
]

/** A message in Spanish that says what happened and what to do. */
export function adminErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) return 'Algo salió mal. Probá de nuevo.'
  if (error.status === 0) return 'No hay conexión con el servidor. Revisá tu conexión y probá de nuevo.'
  if (error.status === 401 || error.status === 403) return 'Tu sesión venció o no tenés permiso. Volvé a ingresar.'
  if (error.status === 413) return 'La imagen pesa más de 5 MB. Elegí una más liviana.'
  const known = KNOWN_MESSAGES.find(([pattern]) =>
    typeof pattern === 'string' ? error.message.includes(pattern) : pattern.test(error.message),
  )
  if (known) return known[1]
  if (error.status === 404) return 'Ese elemento ya no existe. Recargá la página.'
  return 'No pudimos guardar los cambios. Probá de nuevo en unos segundos.'
}
