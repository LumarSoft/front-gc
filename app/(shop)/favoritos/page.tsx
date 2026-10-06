import type { Metadata } from 'next'
import { FavoritesView } from '@/src/features/favorites/components/favorites-view'

export const metadata: Metadata = {
  title: 'Mis favoritos',
  robots: { index: false, follow: false },
}

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Mis favoritos</h1>
      <p className="mt-3 text-muted-foreground">Los productos que guardaste, con su precio y stock actuales.</p>
      <div className="mt-8">
        <FavoritesView />
      </div>
    </div>
  )
}
