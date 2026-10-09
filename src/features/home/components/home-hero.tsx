import { HeroBanner } from '@/src/features/home/components/hero-banner'
import { HeroShortcuts } from '@/src/features/home/components/hero-shortcuts'

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-br from-navy via-navy to-primary text-navy-foreground">
      {/* Soft light from the upper right, like a studio backdrop. */}
      <div
        aria-hidden
        className="absolute -top-1/3 right-1/4 -z-10 size-160 rounded-full bg-radial from-highlight/30 to-transparent to-70%"
      />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:items-center lg:gap-10 lg:py-6">
        <div className="lg:col-span-2">
          <HeroBanner />
        </div>
        <HeroShortcuts />
      </div>
    </section>
  )
}
