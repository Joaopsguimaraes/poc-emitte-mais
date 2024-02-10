import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import { ListFilterIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

type Props = {
  children: ReactNode
}

type ContextProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const DataTableFilterDrawerContext = createContext<ContextProps>(
  {} as ContextProps,
)

export function DataTableToolbarFilterDrawer({ children }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <DataTableFilterDrawerContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      <Sheet
        onOpenChange={() => setOpen((p) => !p)}
        open={open}
      >
        <SheetTrigger asChild>
          <Button
            className="gap-1 text-sm uppercase"
            size="sm"
            variant="ghost"
          >
            <ListFilterIcon className="size-4" />
            Filtros
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <span
              className='text-primary font-medium'
            >
              Filtros
            </span>
            <Separator />
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-40px)] pb-20">
            <div className="px-1">{children}</div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </DataTableFilterDrawerContext.Provider>
  )
}

export function useDataTableFilterDrawer() {
  return useContext(DataTableFilterDrawerContext)
}
