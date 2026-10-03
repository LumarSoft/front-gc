import { SAMPLE_FEATURED_PRODUCTS } from '@/src/features/catalog/lib/sample-products'
import { AssistantTeaser } from '@/src/features/home/components/assistant-teaser'
import { CategoryGrid } from '@/src/features/home/components/category-grid'
import { FeaturedProducts } from '@/src/features/home/components/featured-products'
import { HomeHero } from '@/src/features/home/components/home-hero'
import { InkFinder } from '@/src/features/home/components/ink-finder'
import { PromoTiles } from '@/src/features/home/components/promo-tiles'
import { TrustBar } from '@/src/features/home/components/trust-bar'
import { UseCasePicker } from '@/src/features/home/components/use-case-picker'
import { WholesaleBanner } from '@/src/features/home/components/wholesale-banner'
import { WhyUs } from '@/src/features/home/components/why-us'

export default function HomePage() {
  // TODO(api): fetch featured products through src/services/products.service.ts.
  const featuredProducts = SAMPLE_FEATURED_PRODUCTS

  return (
    <>
      <HomeHero />
      <TrustBar />
      <CategoryGrid />
      <FeaturedProducts products={featuredProducts} />
      <UseCasePicker />
      <InkFinder />
      <PromoTiles />
      <AssistantTeaser />
      <WhyUs />
      <WholesaleBanner />
    </>
  )
}
