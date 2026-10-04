import { ApiError } from '@/src/lib/api-client'

/** API messages (English, stable) the admin can act on, translated. Matched by substring. */
const KNOWN_MESSAGES: [string, string][] = [
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
  const known = KNOWN_MESSAGES.find(([fragment]) => error.message.includes(fragment))
  if (known) return known[1]
  if (error.status === 404) return 'Ese elemento ya no existe. Recargá la página.'
  return 'No pudimos guardar los cambios. Probá de nuevo en unos segundos.'
}
