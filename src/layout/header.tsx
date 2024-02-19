'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { BellRing, Home, Tv2, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/hooks/use-sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

import { ModeToggle } from './mode-toggle'

export function Header() {
  const { data } = useSession()
  const router = useRouter()
  const { handleToggleCollapse, isCollapse } = useSidebar()
  const avatarImg = data?.user?.image ?? ''
  const userName = data?.user?.name ?? ''
  const userEmail = data?.user?.email ?? ''

  return (
    <header
      className={cn(
        'supports-backdrop-blur:bg-background/80 bg-background fixed left-0 top-0 z-0 w-full py-0.5 backdrop-blur',
        isCollapse
          ? 'md:left-[80px] md:w-[calc(100vw-80px)]'
          : 'md:left-[200px] md:w-[calc(100vw-200px)]'
      )}
    >
      <div className="flex w-full justify-between">
        <div className="flex w-full items-center">
          <span className="ml-10 text-sm text-[#718EBF]">
            Olá, <span className="font-bold">Click Contabilidade!</span> Seu
            certificado de brinde já está disponível! 👋
          </span>
        </div>
        <div className="flex items-center px-4 py-1">
          <nav className="flex items-center gap-2">
            <Button
              className="md:flex "
              onClick={handleToggleCollapse}
              size="icon"
              variant="ghost"
            >
              <Tv2 className="size-4" />
            </Button>
            <ModeToggle />
            <Popover>
              <PopoverTrigger className="bg-none pl-1">
                <div className="flex flex-col justify-end space-x-2 bg-none">
                  <Avatar>
                    <AvatarImage src={avatarImg} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="bg-background flex items-start">
                    <p className="font-medium">{userName}</p>
                    <p className="font-light">{userEmail}</p>
                  </div>
                </div>
                <PopoverContent className="w-full">
                  <div className="flex w-full flex-col items-start gap-2">
                    <p className="font-medium">{userName}</p>
                    <p className="font-medium">{userEmail}</p>
                    <Separator />
                    <Button
                      className="flex w-full flex-row items-end justify-start space-x-1 rounded-2xl"
                      onClick={() => router.push('/')}
                      variant="ghost"
                    >
                      <Home className="size-4 self-center" />
                      <p className="font-bold">INÍCIO</p>
                    </Button>
                    <Button
                      className="flex w-full flex-row items-end justify-start space-x-1 rounded-2xl"
                      variant="ghost"
                    >
                      <User className="size-4 self-center" />
                      <p className="font-bold">PROFILE</p>
                    </Button>
                    <Button
                      className="flex w-full flex-row items-end justify-center rounded-2xl shadow-lg"
                      onClick={() => {
                        signOut({ redirect: true })
                      }}
                      variant="outline"
                    >
                      <p className="font-bold">SAIR</p>
                    </Button>
                  </div>
                </PopoverContent>
              </PopoverTrigger>
            </Popover>
          </nav>
        </div>
      </div>
    </header>
  )
}
