'use client'

import { useSearchParams } from 'next/navigation'
import { DataTableAppliedFilters } from '@/@types/data-table-applied-filters'
import { DataTable } from '@/shared/data-table'
import { DataTableToolbarExport } from '@/shared/data-table/data-table-toolbar-export'
import { CustomersListSchema } from '@/validations/customer-list'
import { ColumnDef } from '@tanstack/react-table'
import {
  AlertCircle,
  CheckCircle,
  EyeIcon,
  Plus,
  PlusCircle,
  XCircle,
} from 'lucide-react'

import { cnpjMask } from '@/lib/maskter'
import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const renderStatusBadge = (status: string) => {
  const statusMap = {
    Ativo: {
      color:
        'bg-primary text-primary-foreground border border-primary hover:bg-primary hover:border-primary',
      icon: <CheckCircle className="size-3" />,
    },
    Bloqueado: {
      color:
        'bg-secondary text-secondary-foreground border border-secondary hover:bg-secondary hover:border-secondary',
      icon: <AlertCircle className="size-3" />,
    },
    Inativo: {
      color:
        'bg-tertiary text-tertiary-foreground border border-tertiary hover:bg-tertiary hover:border-tertiary',
      icon: <XCircle className="size-3" />,
    },
  }

  return (
    <Badge
      className={cn(
        //@ts-ignore
        statusMap[status].color,
        'shadow-none border p-2 min-w-[100px] justify-center items-center'
      )}
    >
      {
        //@ts-ignore
        statusMap[status].icon
      }
      {status}
    </Badge>
  )
}

const data: CustomersListSchema[] = [
  {
    id: '1',
    document: '69840156000187',
    fullName: 'Empresa A',
    totalInvoices: 11542,
    modules: ['NFe', 'NFCe', 'MDFe', 'CTe', 'NFSe'],
    status: 'Ativo',
  },
  {
    id: '2',
    document: '68065362000102',
    fullName: 'Empresa B',
    totalInvoices: 998,
    modules: ['NFe', 'NFCe'],
    status: 'Bloqueado',
  },
  {
    id: '3',
    document: '81574599000179',
    fullName: 'Empresa C',
    totalInvoices: 784,
    modules: ['NFe', 'NFCe'],
    status: 'Bloqueado',
  },
  {
    id: '4',
    document: '28548794000141',
    fullName: 'Empresa D',
    totalInvoices: 2147,
    modules: ['NFe', 'NFCe'],
    status: 'Inativo',
  },
  {
    id: '5',
    document: '28548794000142',
    fullName: 'Empresa E',
    totalInvoices: 665,
    modules: ['NFe', 'NFCe'],
    status: 'Inativo',
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
      id: 'totalInvoices',
      title: 'Créditos',
      value: searchParams.get('totalInvoices') ?? '',
    },
    {
      id: 'status',
      title: 'Status',
      value: searchParams.get('status') ?? '',
    },
    {
      id: 'modules',
      title: 'Módulos',
      value: searchParams.get('modules') ?? '',
    },
  ]

  const columns: ColumnDef<CustomersListSchema>[] = [
    {
      accessorKey: 'document',
      header: 'CNPJ / Razão social',
      cell: (row) => {
        return (
          <div className="w-[300px] flex gap-2 items-center">
            <Avatar>
              <AvatarFallback>
                {row.row.original.fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full items-start">
              <span className="font-medium text-primary">
                {row.row.original.fullName}
              </span>
              <span className="text-[#718EBF] text-sm">
                {cnpjMask.mask(row.row.original.document)}
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
          {renderStatusBadge(row.original.status)}
        </div>
      ),
    },
    {
      accessorKey: 'modules',
      header: 'Módulos',
      cell: ({ row }) => (
        <div>
          {row.original.modules.slice(0, 2).map((module) => (
            <Badge key={module} variant="tertiary" className="mr-1">
              {module}
            </Badge>
          ))}
          {row.original.modules.length > 2 && (
            <Badge variant="tertiary">
              <span
                className={cn('text-xs')}
              >{`...+${row.original.modules.length}`}</span>
            </Badge>
          )}
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

    {
      accessorKey: 'actions',
      header: 'Ações',
      cell: () => (
        <Button className="size-8 p-0" size="icon" variant="ghost">
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
