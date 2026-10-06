import { UpcomingPage } from '@/src/components/ui/upcoming-page'
import { UPCOMING_PAGES, upcomingMetadata } from '@/src/features/content/lib/upcoming-pages'
import { findUseCase, catalogHrefForUseCase } from '@/src/features/home/lib/use-cases'

export const metadata = upcomingMetadata('configurator')

export default async function ConfiguratorPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const useCase = findUseCase((await searchParams).uso)
  const content = UPCOMING_PAGES.configurator
  return (
    <UpcomingPage
      {...content}
      meanwhile={useCase && `Ya podés ver los productos pensados para ${useCase.label.toLowerCase()} en el catálogo.`}
      actions={
        useCase
          ? [
              { label: `Ver productos para ${useCase.label.toLowerCase()}`, href: catalogHrefForUseCase(useCase) },
              ...content.actions,
            ]
          : content.actions
      }
    />
  )
}
