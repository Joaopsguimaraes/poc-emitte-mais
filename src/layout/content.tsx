'use client'

import { useSidebar } from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

export function Content({ children }: { children: ReactNode }) {
  const { isCollapse } = useSidebar()

  return (
    <main
      className={cn(
        'container pb-5 pt-14 md:px-12',
        isCollapse
          ? 'md:ml-[80px] md:max-w-[calc(100vw-80px)]'
          : 'md:ml-[240px] md:max-w-[calc(100vw-240px)]'
      )}
    >
      {children}
    </main>
  )
}
