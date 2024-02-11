'use client'

import { useSearchParams } from 'next/navigation'
import { DataTableAppliedFilters } from '@/@types/data-table-applied-filters'
import { DataTable } from '@/shared/data-table'
import { DataTableToolbarExport } from '@/shared/data-table/data-table-toolbar-export'
import { ColumnDef } from '@tanstack/react-table'
import { z } from 'zod'

import { cnpjMask } from '@/lib/maskter'

const customersListSchema = z.object({
  id: z.string(),
  document: z.string(),
  fullName: z.string(),
  shortName: z.string(),
  dueCertificate: z.string(),
  credits: z.number(),
  status: z.string(),
})

export type CustomersListSchema = z.infer<typeof customersListSchema>

const data: CustomersListSchema[] = [
  {
    id: '1',
    document: '69840156000187',
    fullName: 'Empresa A',
    shortName: 'A',
    dueCertificate: '2021-12-31',
    credits: 10000,
    status: 'Ativo',
  },
  {
    id: '2',
    document: '68065362000102',
    fullName: 'Empresa B',
    shortName: 'B',
    dueCertificate: '2021-12-31',
    credits: 10000,
    status: 'Ativo',
  },
  {
    id: '3',
    document: '81574599000179',
    fullName: 'Empresa C',
    shortName: 'C',
    dueCertificate: '2021-12-31',
    credits: 10000,
    status: 'Ativo',
  },
  {
    id: '4',
    document: '28548794000141',
    fullName: 'Empresa D',
    shortName: 'D',
    dueCertificate: '2021-12-31',
    credits: 10000,
    status: 'Ativo',
  },
]

export function ListCustomers() {
  const searchParams = useSearchParams()

  const appliedFilters: DataTableAppliedFilters<CustomersListSchema>[] = [
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
      id: 'shortName',
      title: 'Fantasia',
      value: searchParams.get('shortName') ?? '',
    },
    {
      id: 'dueCertificate',
      title: 'Vencimento do certificado',
      value: searchParams.get('dueCertificate') ?? '',
    },
    {
      id: 'credits',
      title: 'Créditos',
      value: searchParams.get('credits') ?? '',
    },
    {
      id: 'status',
      title: 'Status',
      value: searchParams.get('status') ?? '',
    },
  ]

  const columns: ColumnDef<CustomersListSchema>[] = [
    {
      accessorKey: 'document',
      header: 'CNPJ',
      cell: (row) => <span>{cnpjMask.mask(row.row.original.document)}</span>,
    },
    {
      accessorKey: 'fullName',
      header: 'Razão Social',
    },
    {
      accessorKey: 'shortName',
      header: 'Fantasia',
    },
    {
      accessorKey: 'dueCertificate',
      header: 'Vencimento do certificado',
    },
    {
      accessorKey: 'credits',
      header: 'Créditos',
    },
    {
      accessorKey: 'status',
      header: 'Status',
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
