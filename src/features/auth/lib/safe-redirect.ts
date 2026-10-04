/** Only same-site paths are allowed after login, so a crafted link cannot send the user to another site. */
export function getSafeRedirect(target: string | undefined | null, fallback = '/'): string {
  if (!target || !target.startsWith('/') || target.startsWith('//') || target.startsWith('/\\')) return fallback
  return target
}
