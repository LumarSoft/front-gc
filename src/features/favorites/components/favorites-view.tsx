'use client'

import Link from 'next/link'
import { HeartIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/button'
import { ProductGrid } from '@/src/features/catalog/components/product-grid'
import { FavoritesMessage } from './favorites-message'
import { useFavorites } from '../hooks/use-favorites'

export function FavoritesView() {
  const { query, signedIn, sessionPending } = useFavorites()
  if (sessionPending || (signedIn && query.isPending))
    return (
      <p role="status" className="text-muted-foreground">
        Cargando tus favoritos…
      </p>
    )
  if (!signedIn)
    return (
      <FavoritesMessage
        icon={<HeartIcon weight="light" />}
        title="Ingresá para ver tus favoritos"
        description="Guardá productos con el corazón y encontralos acá desde cualquier dispositivo."
        action={
          <Button asChild className="h-10 rounded-full px-5">
            <Link href="/ingresar?redirect=%2Ffavoritos">Ingresar</Link>
          </Button>
        }
      />
    )
  if (query.isError)
    return (
      <FavoritesMessage
        title="No pudimos cargar tus favoritos"
        description="Revisá tu conexión y probá de nuevo."
        action={
          <Button className="h-10 rounded-full px-5" onClick={() => void query.refetch()}>
            Reintentar
          </Button>
        }
      />
    )
  if (!query.data?.items.length)
    return (
      <FavoritesMessage
        icon={<HeartIcon weight="light" />}
        title="Todavía no guardaste productos"
        description="Tocá el corazón de un producto para tenerlo a mano acá."
        action={
          <Button asChild className="h-10 rounded-full px-5">
            <Link href="/productos">Ver productos</Link>
          </Button>
        }
      />
    )
  return <ProductGrid products={query.data.items} eagerCount={4} />
}
