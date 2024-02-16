import { AlertCircle, Badge, CheckCircle, XCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

export const renderStatusBadge = (status: string) => {
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
