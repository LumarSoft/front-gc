import Image from 'next/image'

type HeroPhotoProps = {
  className?: string
}

// TODO(admin): the hero photo will be managed from the admin panel (banners).

/** The printer cut out of its scene (transparent WebP with its contact shadow baked in), shown on the hero's white. */
export function HeroPhoto({ className }: HeroPhotoProps) {
  return (
    <div className={className}>
      <Image
        src="/images/home/hero-printer.webp"
        alt="Impresora Epson EcoTank L5590 imprimiendo una ilustración a todo color"
        width={935}
        height={674}
        preload
        quality={90}
        sizes="(min-width: 1280px) 36rem, (min-width: 1024px) 50vw, (min-width: 640px) 32rem, 100vw"
        className="h-auto w-full"
      />
    </div>
  )
}
