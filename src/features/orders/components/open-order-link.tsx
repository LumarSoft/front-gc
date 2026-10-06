'use client'

import { Input } from '@/src/components/ui/input'
import { Button } from '@/src/components/ui/button'
import { useOpenOrderLink } from '../hooks/use-open-order-link'

export function OpenOrderLink() {
  const { link, setLink, error, open } = useOpenOrderLink()
  return (
    <form onSubmit={open} className="mt-8 space-y-4 rounded-2xl border p-5 sm:p-6">
      <label htmlFor="private-order-link" className="text-sm font-semibold">
        Enlace privado de tu pedido
      </label>
      <Input
        id="private-order-link"
        value={link}
        onChange={event => setLink(event.target.value)}
        placeholder="Pegá el enlace completo"
        autoComplete="off"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'order-link-error' : undefined}
      />
      {error && (
        <p id="order-link-error" role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <Button className="h-11 rounded-full" disabled={!link.trim()}>
        Consultar pedido
      </Button>
    </form>
  )
}
