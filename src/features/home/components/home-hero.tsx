import { HeroCopy } from '@/src/features/home/components/hero-copy'
import { HeroPhoto } from '@/src/features/home/components/hero-photo'
import { HeroShortcuts } from '@/src/features/home/components/hero-shortcuts'

/**
 * From xl: copy on the left, the printer in the middle of the photo, the category shortcuts stacked on the right.
 * Below xl the content wrapper is `display: contents`, so the three blocks stack in their `order`: copy, photo, and
 * the shortcuts riding on the photo's bottom edge.
 */
export function HomeHero() {
  return (
    <section className="relative isolate flex flex-col xl:block xl:bg-navy">
      <HeroPhoto className="order-2 xl:absolute xl:inset-0 xl:-z-10" />
      <div className="contents xl:mx-auto xl:flex xl:max-w-7xl xl:items-center xl:justify-between xl:gap-10 xl:px-6 xl:py-12">
        <div className="order-1 bg-navy px-4 pt-10 pb-8 text-navy-foreground sm:px-6 lg:pt-14 xl:bg-transparent xl:p-0">
          <div className="mx-auto max-w-7xl">
            <HeroCopy />
          </div>
        </div>
        <div className="relative z-10 order-3 -mt-6 px-4 pb-8 sm:px-6 lg:-mt-10 lg:pb-10 xl:m-0 xl:w-80 xl:shrink-0 xl:p-0">
          <div className="mx-auto max-w-7xl">
            <HeroShortcuts />
          </div>
        </div>
      </div>
    </section>
  )
}
