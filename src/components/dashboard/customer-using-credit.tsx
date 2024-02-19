'use client'

import { DataTable } from '@/shared/data-table'
import { faker } from '@faker-js/faker'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { ColumnDef } from '@tanstack/react-table'
import { Download } from 'lucide-react'
import { z } from 'zod'

import { cnpjMask } from '@/lib/maskter'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const dateFormat = (date: string) => {
  return Intl.DateTimeFormat('pt-BR').format(new Date(date))
}

export const customerUsingCreditSchema = z.object({
  id: z.string(),
  customer: z.string(),
  customerDocument: z.string(),
  status: z.string(),
  modules: z.array(z.string()),
  invoicesValidated: z.number(),
  createdAt: z.string(),
})

export type CustomerUsingCreditSchema = z.infer<
  typeof customerUsingCreditSchema
>

const data: CustomerUsingCreditSchema[] = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  customer: faker.company.name(),
  customerDocument: '00.000.000/0001-00',
  status: faker.helpers.arrayElement(['Ativo', 'Bloqueado', 'Inativo']),
  modules: Array.from({ length: 5 }, () =>
    faker.helpers.arrayElement(['NF-e', 'NFC-e', 'CT-e', 'MDF-e'])
  ),
  invoicesValidated: faker.number.int({
    min: 100,
    max: 1000,
  }),
  createdAt: faker.date.recent().toISOString(),
}))

export function CustomerUsingCreditList() {
  const columns: ColumnDef<CustomerUsingCreditSchema>[] = [
    {
      accessorKey: 'document',
      header: 'CNPJ / Razão social',
      cell: ({ row }) => {
        return (
          <div className="flex w-[300px] items-center gap-2">
            <Avatar>
              <AvatarFallback>{row.original.customer.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex w-full flex-col items-start">
              <span className="text-primary font-medium">
                {row.original.customer}
              </span>
              <span className="text-sm text-[#718EBF]">
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
        <div className="flex items-center justify-center gap-2">
          <Badge
            className={cn(
              row.original.status === 'Ativo'
                ? 'bg-[#FBF1FF] text-[#4F0072] hover:bg-[#FBF1FF] hover:text-[#4F0072]'
                : row.original.status === 'Bloqueado'
                  ? 'bg-[#fdf9fb] text-[#FF005A] hover:bg-[#fdf9fb] hover:text-[#FF005A]'
                  : 'bg-tertiary text-tertiary-foreground hover:bg-tertiary-foreground hover:text-tertiary',
              'min-w-[80px] items-center justify-center border p-2 shadow-none'
            )}
          >
            {row.original.status}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: 'modules',
      header: 'Tipo de nota',
      cell: ({ row }) => (
        <div>
          {row.original.modules.map((type) => (
            <Badge key={type} variant="outline" className="mr-1">
              {type}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'invoicesValidated',
      header: 'Notas validadas',
      cell: ({ row }) => (
        <span className="text-[#718EBF]">{row.original.invoicesValidated}</span>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Detalhes',
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
                <Button variant="ghost" className="w-full">
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
      data={data}
      limit={1}
      page={1}
      total={data.length}
    >
      <DataTable.Toolbar>
        <div className="h-1 w-full" />
      </DataTable.Toolbar>
      <DataTable.Main />
      <DataTable.Pagination />
    </DataTable.Root>
  )
}
