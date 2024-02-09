'use client'

import { usePathname } from 'next/navigation'
import { Circle } from 'lucide-react'

import { NavigationLink } from '@/lib/navigation-link'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/hooks/use-sidebar'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { SidebarNavItem } from './sidebar-config'

type Props = {
  item: SidebarNavItem
  parent?: SidebarNavItem
}

export function SidebarMenu({ item, parent }: Props) {
  const pathname = usePathname()

  const { isCollapse } = useSidebar()

  function renderCollapsible() {
    if (!parent) {
      return (
        <Accordion
          className={cn(
            'hover:bg-secondary group flex w-full items-center gap-2 rounded-md border-none px-3 transition-colors duration-300 ease-in-out',
            item.disabled && 'cursor-not-allowed opacity-60'
          )}
          collapsible={!pathname.startsWith(item.href)}
          disabled={item.disabled}
          type="single"
        >
          <AccordionItem className="w-full py-0" value={item.title ?? ''}>
            <AccordionTrigger className="hover:no-underline ">
              <p className="inline-flex gap-2 ">
                {item.icon}
                <span>{!isCollapse && item.title}</span>
              </p>
            </AccordionTrigger>
            {item.items?.map((child, index) => (
              <SidebarMenu item={child} key={index} parent={item} />
            ))}
          </AccordionItem>
        </Accordion>
      )
    }

    return (
      <AccordionContent className="my-2 h-10" key={item.title}>
        <NavigationLink
          className={cn(
            'hover:bg-primary dark:hover:bg-secondary flex items-center gap-x-2 rounded-lg p-2 text-xs font-light hover:text-white',
            pathname.endsWith(item.href) &&
              'bg-primary text-accent dark:bg-secondary'
          )}
          href={`${item.href}`}
          rel={item.external ? 'noreferrer' : ''}
          target={item.external ? '_blank' : ''}
        >
          <Circle className="hover:text-white" size={8} />
          <p className="font-medium">{!isCollapse && item.title}</p>
        </NavigationLink>
      </AccordionContent>
    )
  }

  function renderStatic() {
    return (
      <NavigationLink
        className={cn(
          'hover:bg-accent group my-1 flex w-full items-center gap-2 rounded-md border-none p-3 transition-colors duration-300 ease-in-out',
          item.disabled && 'cursor-not-allowed opacity-60'
        )}
        href={item.href}
        rel={item.external ? 'noreferrer' : ''}
        target={item.external ? '_blank' : ''}
      >
        <div className="inline-flex items-center gap-2 font-medium">
          {item.icon}
          <span className="text-sm font-semibold">
            {!isCollapse && item.title}
          </span>
        </div>
      </NavigationLink>
    )
  }

  function render() {
    return item.items?.length || parent ? renderCollapsible() : renderStatic()
  }

  return render()
}
