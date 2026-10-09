import { HeroCarousel } from '@/src/features/home/components/hero-carousel'
import { HeroShortcuts } from '@/src/features/home/components/hero-shortcuts'
import { HeroSlideContent } from '@/src/features/home/components/hero-slide-content'
import { HERO_SLIDES } from '@/src/features/home/lib/hero-slides'

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-br from-navy via-navy to-primary text-navy-foreground">
      {/* Soft light from the upper right, like a studio backdrop. */}
      <div
        aria-hidden
        className="absolute -top-1/3 right-1/4 -z-10 size-160 rounded-full bg-radial from-highlight/30 to-transparent to-70%"
      />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pt-8 pb-6 sm:px-6 lg:grid-cols-3 lg:items-center lg:gap-10 lg:py-6">
        <div className="lg:col-span-2">
          <HeroCarousel
            labels={HERO_SLIDES.map(slide => `${slide.title} ${slide.highlight}`)}
            slides={HERO_SLIDES.map((slide, index) => (
              <HeroSlideContent key={slide.cta.href} slide={slide} isFirst={index === 0} />
            ))}
          />
        </div>
        <HeroShortcuts />
      </div>
    </section>
  )
}
