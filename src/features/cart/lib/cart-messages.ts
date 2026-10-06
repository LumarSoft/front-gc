import { ApiError } from '@/src/lib/api-client'
import type { CartItem } from '@/src/types/api/cart'

export function cartErrorMessage(error: unknown): string {
  if (!(error instanceof ApiError)) return 'No pudimos actualizar el carrito. Probá de nuevo.'
  if (error.status === 0) return 'No hay conexión con el servidor. Revisá tu conexión y probá de nuevo.'
  if (error.status === 401) return 'Tu sesión venció. Volvé a ingresar o recargá la página.'
  if (error.status === 404) return 'Ese producto ya no está en tu carrito. Actualizalo para continuar.'
  if (error.status === 409) return 'El carrito cambió al mismo tiempo. Actualizalo y probá de nuevo.'
  if (error.status === 422) return error.message
  if (error.status === 429) return 'Hiciste varios cambios seguidos. Esperá unos segundos y probá de nuevo.'
  return 'No pudimos actualizar el carrito. Probá de nuevo.'
}

export function cartItemMessage(item: CartItem): string | null {
  switch (item.issue) {
    case 'UNAVAILABLE':
      return 'Este producto ya no está disponible. Quitalo del carrito.'
    case 'NO_PRICE':
      return 'El precio no está disponible. Intentá más tarde o quitá este producto.'
    case 'NO_EXCHANGE_RATE':
      return 'No podemos calcular el precio en pesos. Intentá más tarde.'
    case 'INSUFFICIENT_STOCK':
      return item.availableQuantity > 0
        ? `Hay ${item.availableQuantity} disponibles. Reducí la cantidad para continuar.`
        : 'Este producto se quedó sin stock. Podés quitarlo o volver más tarde.'
    default:
      return null
  }
}
