import { ColumnsIcon } from 'lucide-react'
import { useDataTableContext } from './data-table-provider'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

function camelToSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}

export function DataTableToolbarColumnsFilter() {
  const { table } = useDataTableContext()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="items-center gap-1 text-sm uppercase"
          size="sm"
          variant="ghost"
        >
          <ColumnsIcon className="size-4" />
          Colunas
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                checked={column.getIsVisible()}
                className="capitalize"
                key={column.id}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {camelToSnakeCase(column.id as string)}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
