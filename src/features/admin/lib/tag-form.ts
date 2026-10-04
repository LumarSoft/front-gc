import { z } from 'zod'
import { SLUG_PATTERN, slugify } from '@/src/lib/slug'
import type { AdminTag, TagInput } from '@/src/types/api/admin-catalog'

const isSlugOrEmpty = (value: string): boolean => value === '' || SLUG_PATTERN.test(value)

export const tagFormSchema = z.object({
  name: z.string().trim().min(1, 'Escribí el nombre de la etiqueta.').max(100, 'Usá hasta 100 caracteres.'),
  group: z
    .string()
    .trim()
    .max(50, 'Usá hasta 50 caracteres.')
    .refine(isSlugOrEmpty, 'Solo minúsculas, números y guiones (ej.: uso).'),
  slug: z
    .string()
    .trim()
    .max(120, 'Usá hasta 120 caracteres.')
    .refine(isSlugOrEmpty, 'Solo minúsculas, números y guiones (ej.: uso-hogar).'),
})

export type TagFormValues = z.infer<typeof tagFormSchema>

export function tagFormDefaults(tag: AdminTag | null, group: string | null): TagFormValues {
  return { name: tag?.name ?? '', group: tag?.group ?? group ?? '', slug: tag?.slug ?? '' }
}

export function toTagInput(values: TagFormValues): TagInput {
  return { name: values.name, group: values.group || null, ...(values.slug ? { slug: values.slug } : {}) }
}

/** The slug the API generates when the field is empty: group + name ("uso-hogar"). */
export function previewTagSlug(values: Pick<TagFormValues, 'name' | 'group'>): string {
  return slugify(values.group ? `${values.group} ${values.name}` : values.name)
}

export type TagGroup = { group: string | null; tags: AdminTag[] }

/** Tags by group (as sent: ordered by group and name), loose tags last. */
export function groupTags(tags: AdminTag[]): TagGroup[] {
  const groups = new Map<string | null, AdminTag[]>()
  for (const tag of tags) groups.set(tag.group, [...(groups.get(tag.group) ?? []), tag])
  return [...groups.entries()]
    .map(([group, items]) => ({ group, tags: items }))
    .sort((a, b) => (a.group === null ? 1 : b.group === null ? -1 : a.group.localeCompare(b.group, 'es')))
}

/** "uso" → "Uso", for section titles. */
export function groupLabel(group: string | null): string {
  return group ? group.charAt(0).toUpperCase() + group.slice(1).replace(/-/g, ' ') : 'Sin grupo'
}
