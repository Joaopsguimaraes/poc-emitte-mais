'use client'

import { useSearchParams } from 'next/navigation'
import { DataTableAppliedFilters } from '@/@types/data-table-applied-filters'
import { DataTable } from '@/shared/data-table'
import { DataTableToolbarExport } from '@/shared/data-table/data-table-toolbar-export'
import { RenderStatusBadge } from '@/utils/render-status-badge'
import { CustomersListSchema } from '@/validations/customer-list'
import { faker } from '@faker-js/faker'
import { DotsHorizontalIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import {
  AlertCircle,
  CheckCircle,
  Download,
  EyeIcon,
  Plus,
  PlusCircle,
  XCircle,
} from 'lucide-react'
import { z } from 'zod'

import { cnpjMask } from '@/lib/maskter'
import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

//format date with Intl
const dateFormat = (date: string) => {
  return Intl.DateTimeFormat('pt-BR').format(new Date(date))
}

export const invoiceListSchema = z.object({
  id: z.string(),
  customer: z.string(),
  customerDocument: z.string(),
  status: z.string(),
  type: z.string(),
  value: z.string(),
  createdAt: z.string(),
})

export type InvoiceListSchema = z.infer<typeof invoiceListSchema>

const data: InvoiceListSchema[] = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  customer: faker.person.fullName(),
  customerDocument: '00.000.000/0001-00',
  status: faker.helpers.arrayElement(['Aprovada', 'Cancelado', 'Pendente']),
  type: faker.helpers.arrayElement(['NF-e', 'NFC-e']),
  value: faker.finance.amount(),
  createdAt: faker.date.recent().toString(),
}))

export function InvoiceList() {
  const columns: ColumnDef<InvoiceListSchema>[] = [
    {
      accessorKey: 'document',
      header: 'CNPJ / Razão social',
      cell: ({ row }) => {
        return (
          <div className="w-[300px] flex gap-2 items-center">
            <Avatar>
              <AvatarFallback>{row.original.customer.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full items-start">
              <span className="font-medium text-primary">
                {row.original.customer}
              </span>
              <span className="text-[#718EBF] text-sm">
                {cnpjMask.mask(row.original.customerDocument)}
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
              row.original.status === 'Aprovada'
                ? 'bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary'
                : row.original.status === 'Cancelado'
                  ? 'bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary'
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
      accessorKey: 'type',
      header: 'Tipo de nota',
      cell: ({ row }) => (
        <Badge variant="tertiary" className="mr-1">
          {row.original.type}
        </Badge>
      ),
    },
    {
      accessorKey: 'value',
      header: 'Valor R$',
      cell: ({ row }) => (
        <span className="text-[#718EBF]">{row.original.value}</span>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Data de emissão',
      cell: ({ row }) => (
        <span className="text-[#718EBF]">
          {dateFormat(row.original.createdAt)}
        </span>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Download NF',
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-primary-foreground hover:text-primary"
        >
          <Download className='size-4' />
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
        <div className="w-full h-1" />
      </DataTable.Toolbar>
      <DataTable.Main />
    </DataTable.Root>
  )
}
