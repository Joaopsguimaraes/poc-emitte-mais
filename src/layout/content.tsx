'use client'

import { useSidebar } from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

export function Content({ children }: { children: ReactNode }) {
  const { isCollapse } = useSidebar()

  return (
    <main
      className={cn(
        'container pb-5 pt-14 md:px-8',
        isCollapse
          ? 'md:ml-[80px] md:max-w-[calc(100vw-80px)]'
          : 'md:ml-[180px] md:max-w-[calc(100vw-180px)]'
      )}
    >
      {children}
    </main>
  )
}
