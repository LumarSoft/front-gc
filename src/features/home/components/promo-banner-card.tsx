import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { PromoBanner } from '@/src/features/home/lib/promo-banners'
import { cn } from '@/src/lib/utils'

const TONES: Record<PromoBanner['tone'], { card: string; eyebrow: string; title: string; text: string }> = {
  light: {
    card: 'bg-linear-to-r from-surface via-background to-accent',
    eyebrow: 'text-primary',
    title: 'text-primary',
    text: 'text-foreground/80',
  },
  muted: {
    card: 'bg-linear-to-r from-accent via-secondary to-surface',
    eyebrow: 'text-primary',
    title: 'text-highlight',
    text: 'text-foreground/80',
  },
  dark: {
    card: 'bg-linear-to-br from-navy via-primary to-highlight text-navy-foreground',
    eyebrow: 'text-navy-foreground',
    title: 'text-highlight-soft',
    text: 'text-navy-foreground/85',
  },
}

type PromoBannerCardProps = {
  banner: PromoBanner
}

export function PromoBannerCard({ banner }: PromoBannerCardProps) {
  const tone = TONES[banner.tone]

  return (
    <Link
      href={banner.cta.href}
      className={cn(
        'group relative isolate flex h-full min-h-36 overflow-hidden rounded-2xl px-5 py-4 transition-shadow hover:shadow-xl hover:shadow-navy/15 sm:px-6',
        tone.card,
      )}
    >
      <div className="relative z-10 flex w-1/2 flex-col items-start">
        {banner.eyebrow === 'epson-logo' ? (
          <Image
            src="/images/epson/epson-logo.png"
            alt="Epson"
            width={84}
            height={20}
            className="mt-1 mb-0.5 h-4 w-auto"
          />
        ) : (
          <p className={cn('text-xl leading-tight font-extrabold tracking-tight', tone.eyebrow)}>{banner.eyebrow}</p>
        )}
        <p className={cn('text-xl leading-tight font-extrabold tracking-tight', tone.title)}>{banner.title}</p>
        <p className={cn('mt-0.5 mb-3 text-xs', tone.text)}>{banner.text}</p>
        <span className="mt-auto inline-flex h-7 items-center gap-1.5 rounded-full bg-background px-3.5 text-xs font-bold whitespace-nowrap text-primary shadow-sm">
          {banner.cta.label}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
      {/* Right half, inside the card's padding: the product never touches the text or the rounded edge. */}
      <div className={cn('absolute inset-y-3 right-4', banner.mark ? 'left-3/5' : 'left-1/2')}>
        {banner.mark && (
          <span
            aria-hidden
            className="absolute top-1/2 right-full -z-10 translate-x-1/4 -translate-y-1/2 text-7xl leading-none font-extrabold text-navy-foreground"
          >
            {banner.mark}
          </span>
        )}
        <Image
          src={banner.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 200px, 45vw"
          className={cn(
            'object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105',
            banner.mark ? 'object-right' : 'object-center',
          )}
        />
      </div>
    </Link>
  )
}
