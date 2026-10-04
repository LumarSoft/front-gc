'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { refreshSession } from '@/src/lib/api-client'

/** If the panel has not replaced this screen by then, the renewed cookie is not reaching the server. */
const RENEWAL_TIMEOUT_MS = 6000

/**
 * Shown instead of the panel when the access cookie expired. Renews the session in the browser (the refresh cookie
 * only travels to the API) and reloads the panel; if it cannot be renewed, sends the admin to log in again.
 */
export function AdminSessionRenewal() {
  const router = useRouter()
  const pathname = usePathname()
  const [stuck, setStuck] = useState(false)
  const loginHref = `/ingresar?redirect=${encodeURIComponent(pathname)}`

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    void refreshSession().then(renewed => {
      if (!renewed) return router.replace(loginHref)
      router.refresh()
      // Never loop on refreshes: if the server still sees an expired session, stop and offer to log in.
      timer = setTimeout(() => setStuck(true), RENEWAL_TIMEOUT_MS)
    })
    return () => clearTimeout(timer)
  }, [router, loginHref])

  return (
    <div role="status" className="m-auto max-w-sm p-8 text-center text-sm text-muted-foreground">
      {stuck ? (
        <>
          No pudimos verificar tu sesión.{' '}
          <Link href={loginHref} className="font-semibold text-primary underline-offset-4 hover:underline">
            Ingresá de nuevo
          </Link>
          .
        </>
      ) : (
        'Verificando tu sesión…'
      )}
    </div>
  )
}
