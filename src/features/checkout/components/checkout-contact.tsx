import Link from 'next/link'
import type { AuthUser } from '@/src/types/api/auth'
import { CheckoutFieldErrors, CheckoutInput } from './checkout-input'

/** Email of the order, with a way in for buyers who have an account. */
export function CheckoutContact({ user }: { user: AuthUser | null | undefined }) {
  return (
    <section className="space-y-3" aria-labelledby="checkout-contact">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="checkout-contact" className="text-xl font-bold">
          Contacto
        </h2>
        {!user && (
          <Link
            href="/ingresar?redirect=%2Ffinalizar-compra"
            className="text-sm text-primary underline underline-offset-4"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
      <CheckoutInput name="email" label="Email" type="email" inputMode="email" autoComplete="email" grouped={false} />
      <CheckoutFieldErrors names={['email']} />
    </section>
  )
}
