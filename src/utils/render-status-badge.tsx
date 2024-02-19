import { AlertCircle, Badge, CheckCircle, XCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

interface RenderStatusBadgeProps {
  status: string
}

export function RenderStatusBadge({ status }: RenderStatusBadgeProps) {
  return (
    <Badge
      className={cn(
        status === 'Ativo'
          ? 'bg-primary text-primary-foreground'
          : status === 'Bloqueado'
            ? 'bg-secondary text-secondary-foreground'
            : 'bg-tertiary text-tertiary-foreground',
        'shadow-none border p-2 min-w-[80px] justify-center items-center'
      )}
    >
      {status}
    </Badge>
  )
}
