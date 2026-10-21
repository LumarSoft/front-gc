/** `/?asistente=1&pregunta=…` opens the chat on any store page, with an optional question to send. */
export const ASSISTANT_PARAM = 'asistente'
export const QUESTION_PARAM = 'pregunta'

/** Where `/asistente` sends old links and bookmarks: the home, with the chat open. */
export function assistantLandingHref(question?: string): string {
  const params = new URLSearchParams({ [ASSISTANT_PARAM]: '1' })
  if (question) params.set(QUESTION_PARAM, question)
  return `/?${params}`
}

/** Questions that show what the assistant does, and that it answers from the store's data. */
export const SAMPLE_QUESTIONS = [
  '¿Qué impresora me conviene para fotos?',
  'Busco una multifuncional para la oficina',
  '¿Qué tinta usa la L3250?',
  '¿Hacen envíos a todo el país?',
]

/** Starting points when the chat is opened from a product page. */
export const PRODUCT_QUESTIONS = [
  '¿Para qué uso me conviene este producto?',
  '¿Cómo se compara con otras opciones?',
  '¿Qué insumos o accesorios necesito?',
  '¿Cómo me llega y cuánto cuesta el envío?',
]

/** `/productos/<slug>` → the slug, so the assistant knows which product "this one" is. */
export function productSlugFromPath(pathname: string): string | undefined {
  const match = /^\/productos\/([a-z0-9-]+)$/.exec(pathname)
  return match?.[1]
}
