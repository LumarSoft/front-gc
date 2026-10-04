import { z } from 'zod'
import { SLUG_PATTERN } from '@/src/lib/slug'
import type { AdminCategory, CategoryInput } from '@/src/types/api/admin-catalog'

export const NO_PARENT = 'none'

export const categoryFormSchema = z.object({
  name: z.string().trim().min(2, 'Escribí al menos 2 letras.').max(100, 'Usá hasta 100 caracteres.'),
  slug: z
    .string()
    .trim()
    .max(120, 'Usá hasta 120 caracteres.')
    .refine(
      value => value === '' || SLUG_PATTERN.test(value),
      'Solo minúsculas, números y guiones (ej.: papeles-foto).',
    ),
  parentId: z.string(),
  description: z.string().trim().max(2000, 'Usá hasta 2000 caracteres.'),
  image: z.object({ id: z.number(), url: z.string() }).nullable(),
  isActive: z.boolean(),
})

export type CategoryFormValues = z.infer<typeof categoryFormSchema>

export function categoryFormDefaults(category: AdminCategory | null, parentId: number | null): CategoryFormValues {
  return {
    name: category?.name ?? '',
    slug: category?.slug ?? '',
    parentId: String(category?.parentId ?? parentId ?? NO_PARENT),
    description: category?.description ?? '',
    image: category?.imageFileId && category.imageUrl ? { id: category.imageFileId, url: category.imageUrl } : null,
    isActive: category?.isActive ?? true,
  }
}

/** Empty slug → the API generates it from the name. */
export function toCategoryInput(values: CategoryFormValues): CategoryInput {
  return {
    name: values.name,
    ...(values.slug ? { slug: values.slug } : {}),
    parentId: values.parentId === NO_PARENT ? null : Number(values.parentId),
    description: values.description || null,
    imageFileId: values.image?.id ?? null,
    isActive: values.isActive,
  }
}

const plural = (count: number, one: string, many: string): string => `${count} ${count === 1 ? one : many}`

/** Why a category cannot be archived yet (same rule as the API), or null. */
export function categoryArchiveBlocker(category: AdminCategory): string | null {
  if (category.children.length > 0) {
    return `Tiene ${plural(category.children.length, 'subcategoría', 'subcategorías')}. Movelas o archivalas primero.`
  }
  if (category.productCount > 0) {
    return `Tiene ${plural(category.productCount, 'producto', 'productos')}. Movelos a otra categoría primero, o desactivala para ocultarla.`
  }
  return null
}
