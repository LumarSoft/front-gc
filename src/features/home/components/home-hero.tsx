import { HeroCopy } from '@/src/features/home/components/hero-copy'
import { HeroPhoto } from '@/src/features/home/components/hero-photo'
import { HeroShortcuts } from '@/src/features/home/components/hero-shortcuts'

/**
 * White hero. Below lg the copy, the printer and the swipeable shortcuts stack; on lg the copy and the printer share a
 * row with the shortcuts under them; from xl the shortcuts move to a third column on the right.
 * From xl the row spans 8xl so the printer gets the room the header leaves on wide screens, while `pl-header-7xl` pads
 * the copy in to line up with the header (the section is its `@container`).
 */
export function HomeHero() {
  return (
    <section className="@container border-b bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-6 px-4 pt-10 pb-8 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-x-8 lg:pt-12 lg:pb-10 xl:max-w-8xl xl:grid-cols-[auto_minmax(0,1fr)_22rem] xl:gap-x-6 xl:py-10">
        <div className="xl:pl-header-7xl">
          <HeroCopy />
        </div>
        <HeroPhoto className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none xl:-mx-4 xl:w-auto" />
        <div className="lg:col-span-2 xl:col-span-1">
          <HeroShortcuts />
        </div>
      </div>
    </section>
  )
}
