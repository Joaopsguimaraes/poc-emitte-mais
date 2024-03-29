'use client'

import Image from 'next/image'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/hooks/use-sidebar'

import { SidebarNavItem } from './sidebar-config'
import { SidebarMenu } from './sidebar-menu'

type Props = {
  items: SidebarNavItem[]
}

export function SidebarHolder({ items }: Props) {
  const { isCollapse } = useSidebar()

  let srcOfLogo = '/iob-logo.svg'

  if (isCollapse) {
    srcOfLogo = '/collapse-iob.svg'
  }

  return items.length ? (
    <aside
      className={cn(
        'bg-primary dark:bg-background relative min-h-screen rounded-ee-3xl rounded-se-3xl p-0',
        isCollapse ? 'w-[80px]' : 'w-[220px]'
      )}
    >
      <div className="w-full">
        <div className="w-full py-8">
          <Image
            alt="Emitte mais logo"
            className={cn('mx-auto object-contain')}
            height={25}
            src={srcOfLogo}
            width={132}
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
