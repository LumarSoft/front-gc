'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { addFavorite, removeFavorite } from '@/src/services/favorites.service'
import { useFavorites } from './use-favorites'

/** Save or remove one product. Guests are offered to sign in and come back to the same page. */
export function useFavoriteToggle(productId: number) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const { query, userId, signedIn, sessionPending } = useFavorites()
  const savedOnServer = Boolean(query.data?.items.some(item => item.id === productId))
  const mutation = useMutation({
    mutationFn: (save: boolean) => (save ? addFavorite(productId) : removeFavorite(productId)),
    onSuccess: (_, save) => toast.success(save ? 'Guardado en tus favoritos' : 'Quitado de tus favoritos'),
    onError: () => toast.error('No pudimos actualizar tus favoritos. Probá de nuevo.'),
    onSettled: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.favoritesFor(userId ?? 0) }),
  })
  // While saving, show the intended state; afterwards, what the server returned.
  const saved = mutation.isPending ? mutation.variables : savedOnServer
  const toggle = (): void => {
    if (sessionPending || mutation.isPending) return
    if (!signedIn) {
      toast('Ingresá para guardar tus favoritos', {
        action: {
          label: 'Ingresar',
          onClick: () => router.push(`/ingresar?redirect=${encodeURIComponent(pathname)}`),
        },
      })
      return
    }
    mutation.mutate(!saved)
  }
  return { saved, pending: mutation.isPending, toggle }
}
