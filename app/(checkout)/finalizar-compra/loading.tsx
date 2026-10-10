import { CartSkeleton } from '@/src/features/cart/components/cart-skeleton'

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <CartSkeleton />
    </div>
  )
}
