import { UpcomingPage } from '@/src/components/ui/upcoming-page'
import { UPCOMING_PAGES, upcomingMetadata } from '@/src/features/content/lib/upcoming-pages'

export const metadata = upcomingMetadata('contact')

export default function ContactPage() {
  return <UpcomingPage {...UPCOMING_PAGES.contact} />
}
