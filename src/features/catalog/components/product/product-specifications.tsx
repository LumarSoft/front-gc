import { DownloadSimpleIcon } from '@phosphor-icons/react/dist/ssr'
import type { SpecificationGroup } from '@/src/types/api/catalog'

type ProductSpecificationsProps = {
  groups: SpecificationGroup[]
}

const isUrl = (value: string): boolean => /^https?:\/\//.test(value)

export function ProductSpecifications({ groups }: ProductSpecificationsProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {groups.map(group => (
        <section key={group.group ?? 'general'}>
          {group.group && <h3 className="text-sm font-bold tracking-wide text-primary">{group.group}</h3>}
          <dl className="mt-3 divide-y border-y">
            {group.items.map(item => (
              <div key={item.name} className="grid grid-cols-5 gap-3 py-3 text-sm">
                <dt className="col-span-2 text-muted-foreground">{item.name}</dt>
                <dd className="col-span-3 font-medium">
                  {isUrl(item.value) ? (
                    <a
                      href={item.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary hover:underline"
                    >
                      <DownloadSimpleIcon weight="regular" className="size-4" aria-hidden />
                      Descargar
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  )
}
