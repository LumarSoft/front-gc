import { UpcomingPage } from '@/src/components/ui/upcoming-page'
import { UPCOMING_PAGES, upcomingMetadata } from '@/src/features/content/lib/upcoming-pages'

export const metadata = upcomingMetadata('assistant')

export default async function AssistantPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { pregunta } = await searchParams
  const question = typeof pregunta === 'string' ? pregunta.trim().slice(0, 200) : ''
  const content = UPCOMING_PAGES.assistant
  return (
    <UpcomingPage
      {...content}
      meanwhile={
        <>
          {question && <p className="mb-2 font-medium text-foreground">Tu consulta: “{question}”</p>}
          <p>{content.meanwhile}</p>
        </>
      }
    />
  )
}
