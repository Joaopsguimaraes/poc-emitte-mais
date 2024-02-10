"use client"

import { DataTableAppliedFilters } from "@/@types/data-table-applied-filters"
import { DataTable } from "@/shared/data-table"
import { DataTableToolbarColumnsFilter } from "@/shared/data-table/data-table-toolbar-columns-filter"
import { DataTableToolbarExport } from "@/shared/data-table/data-table-toolbar-export"
import { ColumnDef } from "@tanstack/react-table"
import { useSearchParams } from "next/navigation"
import { z } from 'zod'


const invoicesFromCustomerSchema = z.object({
  id: z.string(),
  document: z.string(),
  fullName: z.string(),
  invoiceQuantity: z.number(),
})

export type InvoicesFromCustomerSchema = z.infer<typeof invoicesFromCustomerSchema>

const data: InvoicesFromCustomerSchema[] = [
  {
    id: '1',
    document: '123456789',
    fullName: 'Empresa 1',
    invoiceQuantity: 10,
  },
  {
    id: '2',
    document: '987654321',
    fullName: 'Empresa 2',
    invoiceQuantity: 20,
  },

]


export function InvoicesFromCustomer() {
  const searchParams = useSearchParams()

  const appliedFilters: DataTableAppliedFilters<InvoicesFromCustomerSchema>[] = [
    {
      id: 'id',
      title: 'ID',
      value: searchParams.get('id') ?? '',
    },
    {
      id: 'document',
      title: 'CNPJ',
      value: searchParams.get('document') ?? '',
    },
    {
      id: 'fullName',
      title: 'Razão Social',
      value: searchParams.get('fullName') ?? '',
    },
    {
      id: 'invoiceQuantity',
      title: 'Quantidade de notas',
      value: searchParams.get('invoiceQuantity') ?? '',
    },
  ]

  const columns: ColumnDef<InvoicesFromCustomerSchema>[] = [
    {
      accessorKey: 'document',
      header: 'CNPJ',
    },
    {
      accessorKey: 'fullName',
      header: 'Razão Social',
    },
    {
      accessorKey: 'invoiceQuantity',
      header: 'Quantidade de notas',
    },
  ]


  return (
    <DataTable.Root
      columns={columns}
      data={data}
      limit={1}
      page={1}
      total={data.length}
    >
      <DataTable.Toolbar>
        <DataTableToolbarExport />
      </DataTable.Toolbar>
      <DataTable.Filters filters={appliedFilters} />
      <DataTable.Main />
      <DataTable.Pagination />
    </DataTable.Root>
  )
}