'use client'

import { Scrollbar } from '@radix-ui/react-scroll-area'
import { flexRender } from '@tanstack/react-table'

import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useDataTableContext } from './data-table-provider'

export function DataTableMain() {
  const { table } = useDataTableContext()
  const columns = table.getAllColumns()

  return (
    <ScrollArea>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="text-foreground min-w-max whitespace-nowrap text-center font-sans font-semibold"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                data-state={row.getIsSelected() ? 'selected' : null}
                key={row.id}
                className="text-foreground hover:bg-accent py-2 transition-colors duration-200 ease-in-out"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="text-center font-sans" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                Nenhum resultado encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Scrollbar orientation="horizontal" />
    </ScrollArea>
  )
}
