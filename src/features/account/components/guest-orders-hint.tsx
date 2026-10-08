import Link from 'next/link'

/** Orders placed without signing in never join the account: point to their private link instead. */
export function GuestOrdersHint() {
  return (
    <p className="text-sm text-muted-foreground">
      ¿Compraste sin ingresar a tu cuenta? Esos pedidos se siguen con su{' '}
      <Link href="/pedidos" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
        enlace privado
      </Link>
      .
    </p>
  )
}
