'use client'

import { useRouter, useSearchParams } from 'next/navigation'
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
  EyeIcon,
  Plus,
  PlusCircle,
  XCircle,
} from 'lucide-react'

import { formatCurrency } from '@/lib/fomart-currency'
import { cnpjMask } from '@/lib/maskter'
import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const dataFaker: CustomersListSchema[] = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  document: '00.00.000/0001-00',
  status: faker.helpers.arrayElement(['Ativo', 'Bloqueado', 'Inativo']),
  fullName: faker.company.name(),
  totalInvoices: faker.number.int({
    min: 0,
    max: 1000,
  }),
  modules: ['NFe', 'NFSe'],
}))

export function ListCustomers() {
  const searchParams = useSearchParams()
  const router = useRouter()

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
          <Badge
            className={cn(
              row.original.status === 'Ativo'
                ? 'bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary'
                : row.original.status === 'Bloqueado'
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
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <DotsVerticalIcon className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => router.push(`clientes/${row.original.id}`)}
                >
                  Detalhes
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="ghost" className="w-full">
                  Emissor
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <DataTable.Root
      columns={columns}
      data={dataFaker}
      limit={10}
      page={1}
      total={dataFaker.length}
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
