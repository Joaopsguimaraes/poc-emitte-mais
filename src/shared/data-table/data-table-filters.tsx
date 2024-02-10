import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { type DataTableAppliedFilters } from '@/@types/data-table-applied-filters'
import { Badge } from '@/components/ui/badge'

type Props = {
  filters: DataTableAppliedFilters<any>[]
}

export function DataTableFilters({ filters }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  function removeFilter(key: string) {
    const newParams = new URLSearchParams(searchParams)
    newParams.delete(key)
    router.push(`${pathname}?${newParams.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ id, title, value }) =>
        value ? (
          <Badge
            className="cursor-pointer"
            key={id}
            onClick={() => removeFilter(id)}
          >
            {title}: {value} <span className="ml-1">x</span>
          </Badge>
        ) : null,
      )}
    </div>
  )
}
