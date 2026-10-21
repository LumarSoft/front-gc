import { redirect } from 'next/navigation'
import { assistantLandingHref } from '@/src/features/assistant/lib/assistant-links'

/** The assistant is a chat over the store, not a page: old links and bookmarks open it on the home. */
export default async function AssistantPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { pregunta } = await searchParams
  const question = typeof pregunta === 'string' ? pregunta.trim().slice(0, 200) : ''
  redirect(assistantLandingHref(question || undefined))
}
