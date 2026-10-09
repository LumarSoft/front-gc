import { HeroBanner } from '@/src/features/home/components/hero-banner'
import { HeroShortcuts } from '@/src/features/home/components/hero-shortcuts'

export function HomeHero() {
  return (
    <section>
      <HeroBanner />
      {/* The category shortcuts ride on the hero's bottom edge, so the printer in the photo stays in full view. */}
      <div className="relative z-10 mx-auto -mt-6 max-w-7xl px-4 pb-8 sm:px-6 lg:-mt-10 lg:pb-10 xl:-mt-16">
        <HeroShortcuts />
      </div>
    </section>
  )
}
