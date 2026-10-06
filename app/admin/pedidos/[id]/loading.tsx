import { CartSkeleton } from '@/src/features/cart/components/cart-skeleton'

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <CartSkeleton />
    </div>
  )
}
