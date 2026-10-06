'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { FormEvent } from 'react'
import { fragmentOrderToken, orderPath } from '../lib/order-access'

export function useOpenOrderLink() {
  const [link, setLink] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const open = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    try {
      const url = new URL(link.trim(), window.location.origin)
      const match = url.pathname.match(/^\/pedidos\/(CG-\d{6,10})$/)
      const token = fragmentOrderToken(url.hash)
      if (url.origin !== window.location.origin || !match || !token) throw new Error('Invalid order link')
      router.push(orderPath(match[1], token))
    } catch {
      setError('Pegá el enlace privado completo que guardaste al confirmar el pedido.')
    }
  }
  return { link, setLink, error, open }
}
