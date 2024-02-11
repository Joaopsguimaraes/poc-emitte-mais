'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useDataTableContext } from './data-table-provider'

export function DataTablePagination() {
  const { limit, manualPagination, table } = useDataTableContext()
  const router = useRouter()
  const searchParams = useSearchParams()
  const newParams = new URLSearchParams(searchParams)
  const pathname = usePathname()

  const lastPageIndex = table.getPageCount()
  const firstPageIndex = 1

  const nextPageIndex = Math.min(
    table.getState().pagination.pageIndex + 2,
    lastPageIndex
  )

  const previousPageIndex = Math.max(
    table.getState().pagination.pageIndex,
    firstPageIndex
  )

  const updateCurrentPage = (pageIndex: number) => {
    if (!manualPagination) {
      return table.setPageIndex(pageIndex - 1)
    }

    newParams.set('page', `${pageIndex}`)
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const updatePageSize = (pageSize: string) => {
    if (!manualPagination) {
      return table.setPageSize(Number(pageSize))
    }

    newParams.set('limit', `${pageSize}`)
    newParams.delete('page')
    router.push(`${pathname}?${newParams.toString()}`)
  }

  return (
    <div className="flex flex-col-reverse items-center justify-between gap-4 px-2 md:flex-row">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Linhas por pagina</p>
        <Select
          onValueChange={updatePageSize}
          value={`${table.getState().pagination.pageSize}`}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {Array.from(new Set([limit, 10, 20, 30, 40, 50]))
              .sort((a, b) => a - b)
              .map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full items-center justify-between space-x-6 md:w-auto md:justify-start lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {`${table.getState().pagination.pageIndex + 1}
            de  ${table.getPageCount()}`}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            className="size-8 p-0"
            disabled={!table.getCanPreviousPage()}
            onClick={() => updateCurrentPage(firstPageIndex)}
            size="icon"
            variant="ghost"
          >
            <ChevronsLeftIcon className="size-4" />
          </Button>
          <Button
            className="size-8 p-0"
            disabled={!table.getCanPreviousPage()}
            onClick={() => updateCurrentPage(previousPageIndex)}
            size="icon"
            variant="ghost"
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            className="size-8 p-0"
            disabled={!table.getCanNextPage()}
            onClick={() => updateCurrentPage(nextPageIndex)}
            size="icon"
            variant="ghost"
          >
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            className="size-8 p-0"
            disabled={!table.getCanNextPage()}
            onClick={() => updateCurrentPage(lastPageIndex)}
            size="icon"
            variant="ghost"
          >
            <ChevronsRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
