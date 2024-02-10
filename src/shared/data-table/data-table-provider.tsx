import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type VisibilityState,
} from '@tanstack/react-table'
import { type Table as TableType } from '@tanstack/react-table'

interface DataTableContextProps<TData> {
  table: TableType<TData>
  manualPagination: boolean
  limit: number
}

type DataTableProviderProps<TData, TValue> = {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  columnsVisibility?: VisibilityState
  total?: number
  page?: number
  limit: number
  children: ReactNode
}

export const DataTableContext = createContext<DataTableContextProps<any>>(
  {} as any,
)

export function DataTableProvider<TData, TValue>({
  children,
  columns,
  data,
  limit,
  page,
  columnsVisibility,
  total,
}: DataTableProviderProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const manualPagination = page !== undefined && total !== undefined

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: page ? page - 1 : 0,
    pageSize: limit,
  })

  useEffect(() => {
    if (columnsVisibility) {
      setColumnVisibility(columnsVisibility)
    }
  }, [columnsVisibility])

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    pageCount: manualPagination ? Math.ceil(total / limit) : undefined,
    state: {
      columnVisibility,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  })

  return (
    <DataTableContext.Provider
      value={{ limit, manualPagination: manualPagination, table }}
    >
      {children}
    </DataTableContext.Provider>
  )
}

export function useDataTableContext<TData>() {
  const context = useContext(DataTableContext) as DataTableContextProps<TData>

  if (!context) {
    throw new Error(
      'useDataTableContext must be used within a DataTableProvider',
    )
  }

  return context
}
