'use client'

import { useSearchParams } from 'next/navigation'
import { DataTableAppliedFilters } from '@/@types/data-table-applied-filters'
import { DataTable } from '@/shared/data-table'
import { faker } from '@faker-js/faker'
import { ColumnDef } from '@tanstack/react-table'
import { z } from 'zod'

import { cnpjMask } from '@/lib/maskter'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const invoicesFromCustomerSchema = z.object({
  id: z.string(),
  document: z.string(),
  fullName: z.string(),
  totalInvoices: z.number(),
  status: z.string(),
})

export type InvoicesFromCustomerSchema = z.infer<
  typeof invoicesFromCustomerSchema
>

const data: InvoicesFromCustomerSchema[] = Array.from({ length: 5 }, () => ({
  id: faker.string.uuid(),
  document: '00.000.000/0001-00',
  fullName: faker.company.name(),
  totalInvoices: faker.number.int({
    min: 1,
    max: 100,
  }),
  status: faker.helpers.arrayElement(['Validada', 'Cancelada']),
}))

export function InvoicesFromCustomer() {
  const searchParams = useSearchParams()

  const appliedFilters: DataTableAppliedFilters<InvoicesFromCustomerSchema>[] =
    [
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
        id: 'totalInvoices',
        title: 'Créditos',
        value: searchParams.get('totalInvoices') ?? '',
      },
      {
        id: 'status',
        title: 'Status',
        value: searchParams.get('status') ?? '',
      },
    ]

  const columns: ColumnDef<InvoicesFromCustomerSchema>[] = [
    {
      accessorKey: 'document',
      header: 'CNPJ / Razão social',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarFallback>{row.original.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full items-start">
              <span className="font-medium text-primary">
                {row.original.fullName}
              </span>
              <span className="text-[#718EBF] text-sm">
                {cnpjMask.mask(row.original.document)}
              </span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center items-center">
          <Badge
            className={cn(
              row.original.status === 'Validada'
                ? 'bg-[#FBF1FF] text-[#4F0072] hover:bg-[#FBF1FF] hover:text-[#4F0072]'
                : row.original.status === 'Cancelada'
                  ? 'bg-[#fdf9fb] text-[#FF005A] hover:bg-[#fdf9fb] hover:text-[#FF005A]'
                  : 'bg-tertiary text-tertiary-foreground hover:bg-tertiary-foreground hover:text-tertiary',
              'shadow-none border p-2 min-w-[80px] justify-center items-center'
            )}
          >
            {row.original.status}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: 'totalInvoices',
      header: 'Notas emitidas',
      cell: (row) => (
        <span className="text-[#718EBF]">{row.row.original.totalInvoices}</span>
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
      <DataTable.Filters filters={appliedFilters} />
      <DataTable.Main />
      <DataTable.Pagination />
    </DataTable.Root>
  )
}
