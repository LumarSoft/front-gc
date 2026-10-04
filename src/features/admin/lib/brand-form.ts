import { z } from 'zod'
import { SLUG_PATTERN } from '@/src/lib/slug'
import type { AdminBrand, BrandInput } from '@/src/types/api/admin-catalog'

export const brandFormSchema = z.object({
  name: z.string().trim().min(1, 'Escribí el nombre de la marca.').max(100, 'Usá hasta 100 caracteres.'),
  slug: z
    .string()
    .trim()
    .max(120, 'Usá hasta 120 caracteres.')
    .refine(value => value === '' || SLUG_PATTERN.test(value), 'Solo minúsculas, números y guiones (ej.: epson).'),
  logo: z.object({ id: z.number(), url: z.string() }).nullable(),
  isActive: z.boolean(),
})

export type BrandFormValues = z.infer<typeof brandFormSchema>

export function brandFormDefaults(brand: AdminBrand | null): BrandFormValues {
  return {
    name: brand?.name ?? '',
    slug: brand?.slug ?? '',
    logo: brand?.logoFileId && brand.logoUrl ? { id: brand.logoFileId, url: brand.logoUrl } : null,
    isActive: brand?.isActive ?? true,
  }
}

export function toBrandInput(values: BrandFormValues): BrandInput {
  return {
    name: values.name,
    ...(values.slug ? { slug: values.slug } : {}),
    logoFileId: values.logo?.id ?? null,
    isActive: values.isActive,
  }
}

/** Same rule as the API: a brand with products is deactivated, not archived. */
export function brandArchiveBlocker(brand: AdminBrand): string | null {
  if (brand.productCount === 0) return null
  const products = `${brand.productCount} ${brand.productCount === 1 ? 'producto' : 'productos'}`
  return `Tiene ${products}. Para que deje de verse, desactivala; para archivarla, primero mové sus productos a otra marca.`
}
