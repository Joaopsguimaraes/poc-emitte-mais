import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { forwardRef, type ForwardedRef } from 'react'

const ActionButton = forwardRef(function (
  { children, className, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Button
      className={cn('h-auto w-max min-w-max p-4', className)}
      ref={ref}
      type="button"
      variant="ghost"
      {...props}
    >
      {children}
    </Button>
  )
})

ActionButton.displayName = 'ActionButton'

export { ActionButton }
