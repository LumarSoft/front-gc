import { UpcomingPage } from '@/src/components/ui/upcoming-page'
import { UPCOMING_PAGES, upcomingMetadata } from '@/src/features/content/lib/upcoming-pages'

export const metadata = upcomingMetadata('shipping')

export default function ShippingHelpPage() {
  return <UpcomingPage {...UPCOMING_PAGES.shipping} />
}
