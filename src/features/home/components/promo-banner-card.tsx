import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { PromoBanner } from '@/src/features/home/lib/promo-banners'

type PromoBannerCardProps = {
  banner: PromoBanner
}

/** Image banner; the button sits under the artwork's own text, at the same left margin. */
export function PromoBannerCard({ banner }: PromoBannerCardProps) {
  return (
    <Link
      href={banner.cta.href}
      className="group relative block aspect-11/4 overflow-hidden rounded-2xl bg-muted transition-shadow hover:shadow-xl hover:shadow-navy/15"
    >
      <Image
        src={banner.image}
        alt={banner.alt}
        fill
        sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, 100vw"
        className="object-cover object-left"
      />
      <span className="absolute top-2/3 left-1/20 inline-flex h-7 items-center gap-1.5 rounded-full bg-background px-3.5 text-xs font-bold whitespace-nowrap text-primary shadow-md">
        {banner.cta.label}
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  )
}
