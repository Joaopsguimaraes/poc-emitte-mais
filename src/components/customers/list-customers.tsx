'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { DataTableAppliedFilters } from '@/@types/data-table-applied-filters'
import { DataTable } from '@/shared/data-table'
import { DataTableToolbarExport } from '@/shared/data-table/data-table-toolbar-export'
import { CustomersListSchema } from '@/validations/customer-list'
import { faker } from '@faker-js/faker'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'

import { cnpjMask } from '@/lib/maskter'
import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { EditCustomer } from './edit-customer'

const dataFaker: CustomersListSchema[] = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  document: '00.000.000/0000-00',
  fullName: faker.company.name(),
  shortName: faker.company.name(),
  dueCertificate: faker.date.recent().toISOString(),
  plansAndCredits: faker.number
    .int({
      min: 1,
      max: 100,
    })
    .toString(),
  modules: Array.from({ length: 3 }, () =>
    faker.helpers.arrayElement(['NFe', 'NFCe', 'NFSe'])
  ),
  status: faker.helpers.arrayElement(['Ativado', 'Bloqueado', 'Inativo']),
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
      id: 'shortName',
      title: 'Créditos',
      value: searchParams.get('shortName') ?? '',
    },
    {
      id: 'dueCertificate',
      title: 'Certificado',
      value: searchParams.get('dueCertificate') ?? '',
    },
    {
      id: 'plansAndCredits',
      title: 'Planos e Créditos',
      value: searchParams.get('plansAndCredits') ?? '',
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
      cell: ({ row }) => {
        return (
          <div className="flex w-[300px] items-center gap-2">
            <Avatar>
              <AvatarFallback>{row.original.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex w-full flex-col items-start">
              <span className="text-primary font-medium">
                {row.original.fullName}
              </span>
              <span className="text-sm font-medium text-[#718EBF]">
                {row.original.shortName}
              </span>
              <span className="text-sm text-[#718EBF]">
                {cnpjMask.mask(row.original.document)}
              </span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'dueCertificate',
      header: 'Vencimento do certificado',
      cell: ({ row }) => (
        <span className="text-[#718EBF]">
          {new Date(row.original.dueCertificate).toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: 'plansAndCredits',
      header: 'Planos e Créditos',
      cell: ({ row }) => (
        <span className="text-[#718EBF]">{row.original.plansAndCredits}</span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <Badge
            className={cn(
              row.original.status === 'Ativado'
                ? 'bg-[#FBF1FF] text-[#4F0072] hover:bg-[#FBF1FF] hover:text-[#4F0072]'
                : row.original.status === 'Bloqueado'
                  ? 'bg-[#FFF0F6] text-[#FF005A] hover:bg-[#FFF0F6] hover:text-[#FF005A]'
                  : 'bg-[#F1F5F9] text-[#7D93B8] hover:bg-[#F1F5F9] hover:text-[#7D93B8]',
              'min-w-[80px] items-center justify-center border-none p-2 shadow-none'
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
            <Badge key={module} variant="outline" className="mr-1">
              {module}
            </Badge>
          ))}
          {row.original.modules.length > 2 && (
            <Badge variant="outline">
              <span
                className={cn('text-xs')}
              >{`...+${row.original.modules.length}`}</span>
            </Badge>
          )}
        </div>
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
          <DropdownMenuContent className="w-40">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full">
                      Editar
                    </Button>
                  </DialogTrigger>
                  <EditCustomer />
                </Dialog>
              </DropdownMenuItem>
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
      {/* <DataTable.Toolbar>
        <DataTableToolbarExport />
      </DataTable.Toolbar> */}
      <DataTable.Filters filters={appliedFilters} />
      <DataTable.Main />
      <DataTable.Pagination />
    </DataTable.Root>
  )
}
