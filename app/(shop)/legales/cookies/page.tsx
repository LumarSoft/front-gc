import { UpcomingPage } from '@/src/components/ui/upcoming-page'
import { UPCOMING_PAGES, upcomingMetadata } from '@/src/features/content/lib/upcoming-pages'

export const metadata = upcomingMetadata('cookies')

export default function CookiesPage() {
  return <UpcomingPage {...UPCOMING_PAGES.cookies} />
}
