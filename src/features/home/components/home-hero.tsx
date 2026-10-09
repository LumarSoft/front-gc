import { HeroCopy } from '@/src/features/home/components/hero-copy'
import { HeroPhoto } from '@/src/features/home/components/hero-photo'
import { HeroShortcuts } from '@/src/features/home/components/hero-shortcuts'

/**
 * From xl: copy on the left, the printer in the middle of the photo, the category shortcuts stacked on the right.
 * The copy lines up with the header (7xl) while the shortcuts hug the photo's right edge (8xl), so on wide screens they
 * use the room beside the printer instead of covering it. Below xl the content wrapper is `display: contents`, so the three blocks stack in their `order`: copy, photo, and
 * the shortcuts riding on the photo's bottom edge.
 */
export function HomeHero() {
  return (
    <section className="relative isolate flex flex-col xl:block xl:bg-navy">
      <div className="contents xl:relative xl:mx-auto xl:block xl:max-w-8xl">
        <div className="order-1 bg-navy px-4 pt-10 pb-8 text-navy-foreground sm:px-6 lg:pt-14 xl:bg-transparent xl:px-0 xl:py-8">
          <div className="mx-auto max-w-7xl xl:px-6">
            <HeroCopy />
          </div>
        </div>
        <div className="relative z-10 order-3 -mt-6 px-4 pb-8 sm:px-6 lg:-mt-10 lg:pb-10 xl:absolute xl:inset-y-0 xl:right-6 xl:m-0 xl:flex xl:w-88 xl:items-center xl:p-0">
          <div className="mx-auto max-w-7xl xl:w-full">
            <HeroShortcuts />
          </div>
        </div>
      </div>
      {/* Last in the DOM so screen readers reach the h1 first; `order` places it visually. */}
      <HeroPhoto className="order-2 xl:absolute xl:inset-0 xl:-z-10" />
    </section>
  )
}
