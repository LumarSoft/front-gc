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
        'group relative isolate flex h-full min-h-44 overflow-hidden rounded-2xl p-5 transition-shadow hover:shadow-xl hover:shadow-navy/15 sm:p-6',
        tone.card,
      )}
    >
      <div className={cn('relative z-10 flex flex-col items-start', banner.mark ? 'w-1/2' : 'w-3/5')}>
        {banner.eyebrow === 'epson-logo' ? (
          <Image src="/images/epson/epson-logo.png" alt="Epson" width={84} height={20} className="h-4 w-auto" />
        ) : (
          <p className={cn('text-xl leading-none font-extrabold tracking-tight sm:text-2xl', tone.eyebrow)}>
            {banner.eyebrow}
          </p>
        )}
        <p className={cn('mt-1 text-xl leading-tight font-extrabold tracking-tight sm:text-2xl', tone.title)}>
          {banner.title}
        </p>
        <p className={cn('mt-1 mb-4 text-sm', tone.text)}>{banner.text}</p>
        <span className="mt-auto inline-flex h-8 items-center gap-1.5 rounded-full bg-background px-4 text-xs font-bold text-primary shadow-sm">
          {banner.cta.label}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
      {banner.mark && (
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 -z-10 -translate-y-1/2 text-8xl leading-none font-extrabold text-navy-foreground"
        >
          {banner.mark}
        </span>
      )}
      <div className={cn('absolute -right-4 bottom-2 h-4/5', banner.mark ? 'w-2/5' : 'w-1/2')}>
        <Image
          src={banner.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 240px, 50vw"
          className="object-contain object-bottom-right transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </Link>
  )
}
