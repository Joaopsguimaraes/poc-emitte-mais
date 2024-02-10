import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'


type Props = {
  children: ReactNode
  className?: string
}

export function DataTableToolbar({ children, className }: Props) {
  return (
    <div
      className={cn(
        'mb-4 flex w-full justify-between gap-4 md:justify-end',
        className,
      )}
    >
      {children}
    </div>
  )
}
