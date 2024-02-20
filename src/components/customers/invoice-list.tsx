'use client'

import { DataTable } from '@/shared/data-table'
import { faker } from '@faker-js/faker'
import { ColumnDef } from '@tanstack/react-table'
import { CheckIcon, ChevronDown, PlusCircle } from 'lucide-react'
import { z } from 'zod'

import { cnpjMask } from '@/lib/maskter'
import { cn } from '@/lib/utils'

import { CalendarDateRangePicker } from '../calendar-date-picker-range'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

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
              row.original.status === 'Aprovada'
                ? 'bg-[#FBF1FF] text-[#4F0072] hover:bg-[#FBF1FF] hover:text-[#4F0072]'
                : row.original.status === 'Pendente'
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
        <div className="flex w-full flex-col gap-2">
          <span className="font-medium">Filtros</span>
          <div className="flex w-full flex-row justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-normal">Periodo emissão</span>
              <CalendarDateRangePicker />
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-normal">Status</span>
              <Select>
                <SelectTrigger className="hover:bg-accent hover:text-accent-foreground w-64 rounded-md border border-[#F1F5F9] bg-[#F1F5F9] text-sm font-medium">
                  <SelectValue placeholder="Ativo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="max-h-64">
                    {[
                      {
                        label: 'Ativo',
                        value: '1',
                      },
                      {
                        label: 'Inativo',
                        value: '0',
                      },
                      {
                        label: 'Bloqueado',
                        value: '2',
                      },
                    ].map((item, index) => {
                      return (
                        <SelectItem key={index} value={String(item.value)}>
                          {item.label}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-normal">Tipo de nota</span>
              <Select>
                <SelectTrigger className="hover:bg-accent hover:text-accent-foreground w-64 rounded-md border border-[#F1F5F9] bg-[#F1F5F9] text-sm font-medium">
                  <SelectValue placeholder="NFe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="max-h-64">
                    {[
                      {
                        label: 'NFe',
                        value: '1',
                      },
                      {
                        label: 'NFCe',
                        value: '0',
                      },
                      {
                        label: 'NFSe',
                        value: '2',
                      },
                    ].map((item, index) => {
                      return (
                        <SelectItem key={index} value={String(item.value)}>
                          {item.label}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-normal">
                Razão social destinatário
              </span>

              <Popover>
                <PopoverTrigger asChild>
                  <button
                    aria-controls=""
                    aria-expanded
                    className="hover:bg-accent hover:text-accent-foreground inline-flex h-[38px] w-64 items-center justify-between rounded-md border border-[#F1F5F9] bg-[#F1F5F9] px-4 py-2 text-sm font-medium"
                    role="combobox"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        className={cn(
                          'bg-[#FBF1FF] text-[#4F0072] shadow-none hover:bg-[#FBF1FF] hover:text-[#4F0072]'
                        )}
                      >
                        <span>Joao Guimaraes</span>
                      </Badge>
                    </div>
                    <ChevronDown className="size-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="min-w-[350px]">
                  <Command>
                    <CommandList>
                      <CommandEmpty>Nenhum dado encontrado</CommandEmpty>
                      <CommandInput className="dark:bg-gray900 bg-white" />
                      <CommandGroup className="max-h-[250px] overflow-y-auto">
                        {[{ label: 'Joao Guimaraes', value: '123123812' }].map(
                          (option) => (
                            <CommandItem
                              className="flex w-full gap-2"
                              key={option.value}
                              value={String(option.label)}
                            >
                              {option.label}
                              <CheckIcon className="mb-0.5" size={15} />
                            </CommandItem>
                          )
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </DataTable.Toolbar>
      <DataTable.Main />
    </DataTable.Root>
  )
}
