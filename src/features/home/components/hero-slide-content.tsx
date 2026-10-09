import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { HeroSlide } from '@/src/features/home/lib/hero-slides'

type HeroSlideContentProps = {
  slide: HeroSlide
  /** The first slide is the page's LCP: load its photo first and use the page's h1. */
  isFirst: boolean
}

export function HeroSlideContent({ slide, isFirst }: HeroSlideContentProps) {
  const Heading = isFirst ? 'h1' : 'h2'

  return (
    <div className="grid items-center gap-6 sm:grid-cols-5 lg:gap-4">
      <div className="relative z-10 sm:col-span-3">
        <p className="flex items-center gap-2.5 text-xs font-semibold tracking-widest text-navy-foreground/80 uppercase">
          Distribuidor oficial
          <Image
            src="/images/epson/epson-logo.png"
            alt="Epson"
            width={84}
            height={20}
            className="h-4 w-auto brightness-0 invert"
          />
        </p>
        <Heading className="mt-3 text-4xl leading-none font-extrabold tracking-tight sm:text-6xl">
          <span className="block">{slide.title}</span>
          <span className="block text-highlight-soft">{slide.highlight}</span>
        </Heading>
        <p className="mt-4 max-w-md text-sm sm:text-base text-pretty text-navy-foreground/85 lg:text-lg">
          {slide.text}
        </p>
        <Link
          href={slide.cta.href}
          className="group mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-background px-6 text-base font-bold sm:h-12 text-primary transition-colors hover:bg-accent"
        >
          {slide.cta.label}
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
      <div className="relative mx-auto aspect-4/3 w-2/3 sm:col-span-2 sm:mx-0 sm:w-auto lg:origin-bottom lg:scale-110">
        {/* Studio light behind the product, so the black printer reads on the navy background. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-3/4 rounded-full bg-radial from-highlight/45 via-highlight/10 to-transparent to-70% blur-2xl"
        />
        <Image
          src={slide.image.src}
          alt={slide.image.alt}
          fill
          preload={isFirst}
          sizes="(min-width: 1280px) 480px, (min-width: 640px) 40vw, 90vw"
          className="object-contain object-bottom drop-shadow-2xl"
        />
      </div>
    </div>
  )
}
