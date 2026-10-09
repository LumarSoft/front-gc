import { PromoBannerCard } from '@/src/features/home/components/promo-banner-card'
import { PROMO_BANNERS } from '@/src/features/home/lib/promo-banners'

export function PromoBanners() {
  return (
    <section aria-label="Destacados de la tienda" className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:pt-10">
      <ul className="grid gap-4 md:grid-cols-3">
        {PROMO_BANNERS.map(banner => (
          <li key={banner.cta.href} className="reveal">
            <PromoBannerCard banner={banner} />
          </li>
        ))}
      </ul>
    </section>
  )
}
