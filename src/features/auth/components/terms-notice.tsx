import Link from 'next/link'

/** TODO(legal): these pages do not exist yet; their text must come from the client. */
export function TermsNotice() {
  return (
    <p className="text-center text-xs text-muted-foreground">
      Al crear tu cuenta aceptás los{' '}
      <Link href="/legales/terminos" className="underline">
        Términos y condiciones
      </Link>{' '}
      y la{' '}
      <Link href="/legales/privacidad" className="underline">
        Política de privacidad
      </Link>
      .
    </p>
  )
}
