import { useRouter, useSearchParams } from 'next/navigation'

export function useUrl() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function updateSearchParams(data: any, overwrite = true) {
    const params = new URLSearchParams(overwrite ? '' : searchParams.toString())

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'undefined') {
        continue
      }
      if (value instanceof Date) {
        params.append(key, value.toISOString())
        continue
      }
      if (typeof value === 'object') {
        params.append(key, JSON.stringify(value))
        continue
      }
      if (value !== null) {
        params.append(key, value.toString())
      }
    }

    router.push(`?${params.toString()}`)
  }

  return {
    updateSearchParams,
  }
}
