import { UpcomingPage } from '@/src/components/ui/upcoming-page'
import { UPCOMING_PAGES, upcomingMetadata } from '@/src/features/content/lib/upcoming-pages'

export const metadata = upcomingMetadata('frequentCustomers')

export default function FrequentCustomersPage() {
  return <UpcomingPage {...UPCOMING_PAGES.frequentCustomers} />
}
