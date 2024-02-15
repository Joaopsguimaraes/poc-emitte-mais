import { type ReactNode } from 'react'
import { Routes } from '@/constants/routes'
import {
  BarChartIcon,
  BoxesIcon,
  CurrencyIcon,
  HomeIcon,
  Receipt,
  UsersRound,
} from 'lucide-react'

export interface NavItem {
  title?: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: ReactNode
  roles?: string[]
  feature?: string
}

export interface SidebarNavItem extends NavItem {
  items?: SidebarNavItem[]
}

export interface Shortcuts extends NavItem {
  partialKey?: string
  completeKey?: string
}

interface SidebarConfig {
  sidebarNav: SidebarNavItem[]
  shortcuts: Shortcuts[]
}

export const sidebarConfig: SidebarConfig = {
  shortcuts: [
    {
      completeKey: 'CTRL + H',
      href: Routes.DASHBOARD,
      partialKey: 'h',
      title: 'Home',
    },
  ],
  sidebarNav: [
    {
      href: Routes.DASHBOARD,
      icon: <BarChartIcon className="size-4" />,
      title: 'Dashboard',
    },
    {
      href: Routes.CUSTOMERS,
      icon: <UsersRound className="size-4" />,
      title: 'Clientes',
    },
  ],
}
