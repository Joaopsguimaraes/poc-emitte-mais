'use client'

import { Scrollbar } from '@radix-ui/react-scroll-area'
import { flexRender } from '@tanstack/react-table'
import { useDataTableContext } from './data-table-provider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

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
                    className="text-foreground min-w-max whitespace-nowrap text-center font-bold"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
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
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="text-center"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="h-24 text-center"
                colSpan={columns.length}
              >
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
