import Image from 'next/image'
import logo from '@/public/images/brand/logo-cg.png'
import logoLight from '@/public/images/brand/logo-cg-light.png'
import { cn } from '@/src/lib/utils'

type BrandLogoImageProps = {
  /** White letters for dark surfaces (footer, admin frame); black letters otherwise. The CMYK waves never change. */
  inverted?: boolean
  /** Above the fold (store header): load it first. */
  priority?: boolean
  /** Sets the height (e.g. "h-8"); the width follows the logo's proportions. */
  className?: string
}

/** The Comunicaciones Gráficas logo ("CG" with CMYK waves), provided by the client on 2026-10-08. */
export function BrandLogoImage({ inverted = false, priority = false, className }: BrandLogoImageProps) {
  return (
    <Image
      src={inverted ? logoLight : logo}
      alt=""
      priority={priority}
      sizes="120px"
      className={cn('h-8 w-auto shrink-0', className)}
    />
  )
}
