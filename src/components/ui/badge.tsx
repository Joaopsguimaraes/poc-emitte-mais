import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'focus:ring-ring inline-flex items-center gap-2 rounded-md border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/80 border-transparent shadow',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent',
        tertiary:
          'bg-tertiary text-tertiary-foreground hover:bg-tertiary/80 border-transparent',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent shadow',
        outline: 'text-[#718EBF]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
