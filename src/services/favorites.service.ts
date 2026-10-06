import { apiRequest } from '@/src/lib/api-client'
import type { Favorites } from '@/src/types/api/favorites'

/** Browser-only: favorites belong to the signed-in customer. */
export function getFavorites(): Promise<Favorites> {
  return apiRequest<Favorites>('/favorites')
}

export function addFavorite(productId: number): Promise<void> {
  return apiRequest<void>(`/favorites/${productId}`, { method: 'PUT' })
}

export function removeFavorite(productId: number): Promise<void> {
  return apiRequest<void>(`/favorites/${productId}`, { method: 'DELETE' })
}
