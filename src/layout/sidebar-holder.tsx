'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/hooks/use-sidebar'

import { SidebarNavItem } from './sidebar-config'
import { SidebarMenu } from './sidebar-menu'

type Props = {
  items: SidebarNavItem[]
}

export function SidebarHolder({ items }: Props) {
  const { isCollapse } = useSidebar()
  let srcOfLogo = '/emitte-mais-logo.svg'

  if (isCollapse) {
    srcOfLogo = '/emitte-mais-collapse.svg'
  }

  return items.length ? (
    <aside
      className={cn(
        'bg-primary relative min-h-screen p-0',
        isCollapse ? 'w-[80px]' : 'w-[240px]'
      )}
    >
      <div className="w-full">
        <div className="w-full py-8">
          <Image
            alt="Emitte mais logo"
            className={cn('mx-auto h-16 w-full object-contain px-4')}
            height={50}
            src={srcOfLogo}
            width={120}
          />
        </div>
        <div className="w-full gap-1 px-4">
          {items.map((item, index) => (
            <SidebarMenu item={item} key={index} />
          ))}
        </div>
      </div>
    </aside>
  ) : null
}
