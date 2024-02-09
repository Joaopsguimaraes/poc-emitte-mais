'use client'

import { Menu } from 'lucide-react'

import { useSidebar } from '@/hooks/use-sidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { sidebarConfig } from './sidebar-config'
import { SidebarHolder } from './sidebar-holder'

export function Sidebar() {
  const { handleToggleMobileSidebar, isMobileSidebarOpen } = useSidebar()

  return (
    <>
      <Sheet
        onOpenChange={() => handleToggleMobileSidebar()}
        open={isMobileSidebarOpen}
      >
        <SheetTrigger className="fixed left-4 top-6 z-50 flex items-start justify-start md:hidden">
          <Menu className="text-primary" />
        </SheetTrigger>
        <SheetContent
          className="flex w-full items-center justify-center"
          side="left"
        >
          <SidebarHolder items={sidebarConfig.sidebarNav} />
        </SheetContent>
      </Sheet>
      <div className="fixed left-0 top-0 z-10 hidden md:block">
        <SidebarHolder items={sidebarConfig.sidebarNav} />
      </div>
    </>
  )
}
