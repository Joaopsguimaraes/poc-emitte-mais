'use client'

import { useSearchParams } from 'next/navigation'
import { DataTableAppliedFilters } from '@/@types/data-table-applied-filters'
import { DataTable } from '@/shared/data-table'
import { DataTableToolbarExport } from '@/shared/data-table/data-table-toolbar-export'
import { ColumnDef } from '@tanstack/react-table'
import { EyeIcon } from 'lucide-react'
import { z } from 'zod'

import { cnpjMask } from '@/lib/maskter'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

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

const handleFormatRealCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

const handleFormatBrazilianDate = (value: string) => {
  const date = new Date(value)
  return Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(date)
}

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
      cell: (row) => (
        <span>
          {handleFormatBrazilianDate(row.row.original.dueCertificate)}
        </span>
      ),
    },
    {
      accessorKey: 'credits',
      header: 'Créditos',
      cell: (row) => (
        <span>{handleFormatRealCurrency(row.row.original.credits)}</span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (row) => (
        <Badge variant="secondary">{row.row.original.status}</Badge>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Ações',
      cell: () => (
        <Button variant="ghost" size="icon">
          <EyeIcon className="text-primary size-5" />
          <span className="sr-only">Editar</span>
        </Button>
      ),
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
