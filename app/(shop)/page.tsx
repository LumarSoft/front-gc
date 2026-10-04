import { SessionRefresh } from '@/src/features/auth/components/session-refresh'
import { AssistantTeaser } from '@/src/features/home/components/assistant-teaser'
import { CategoryGrid } from '@/src/features/home/components/category-grid'
import { FeaturedProducts } from '@/src/features/home/components/featured-products'
import { HomeHero } from '@/src/features/home/components/home-hero'
import { PromoTiles } from '@/src/features/home/components/promo-tiles'
import { TrustBar } from '@/src/features/home/components/trust-bar'
import { UseCasePicker } from '@/src/features/home/components/use-case-picker'
import { WholesaleBanner } from '@/src/features/home/components/wholesale-banner'
import { WhyUs } from '@/src/features/home/components/why-us'
import { getProducts } from '@/src/services/catalog.service'

const FEATURED_COUNT = 8

export default async function HomePage() {
  // The home must stay up even if the catalog fails: the section shows a message instead.
  const featured = await getProducts({ featured: true, pageSize: FEATURED_COUNT }).catch(() => null)

  return (
    <>
      <SessionRefresh when={featured?.sessionExpired ?? false} />
      <HomeHero />
      <TrustBar />
      <CategoryGrid />
      <FeaturedProducts products={featured?.data.items ?? null} />
      <UseCasePicker />
      <PromoTiles />
      <AssistantTeaser />
      <WhyUs />
      <WholesaleBanner />
    </>
  )
}
