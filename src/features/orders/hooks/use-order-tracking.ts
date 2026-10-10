'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { fragmentOrderToken } from '../lib/order-access'
import { QUERY_KEYS } from '@/src/lib/query-keys'
import { trackOrder } from '@/src/services/orders.service'

function subscribe(callback: () => void): () => void {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}
const snapshot = (): string => window.location.hash
const serverSnapshot = (): string => ''

export function useOrderTracking(number: string) {
  useEffect(() => {
    document.getElementById('order-title')?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])
  const fragment = useSyncExternalStore(subscribe, snapshot, serverSnapshot)
  const token = fragmentOrderToken(fragment)
  const [copied, setCopied] = useState(false)
  const query = useQuery({
    queryKey: QUERY_KEYS.orderTracking(number, token),
    queryFn: () => trackOrder(number, token!),
    enabled: Boolean(token),
    retry: false,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
    gcTime: 0,
  })
  const copyLink = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      toast.success('Enlace copiado')
    } catch {
      toast.error('No pudimos copiar el enlace. Guardá la dirección de esta página desde tu navegador.')
    }
  }
  return { query, token, copied, copyLink }
}
