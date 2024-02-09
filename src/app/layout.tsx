import { Poppins } from 'next/font/google'

import './globals.css'

import { Content } from '@/layout/content'
import { Header } from '@/layout/header'
import { Sidebar } from '@/layout/sidebar'
import ThemeContext from '@/providers'
import SessionProvider from '@/providers/session-provider'
import { getServerSession } from 'next-auth'

import { Sonner } from '../components/sonner'
import { TailwindIndicator } from '../components/tailwind-indicator'
import { Toaster } from '../components/toaster'
import { cn } from '../lib/utils'
import { authOptions } from './api/auth/[...nextauth]/auth-config'

const poppins = Poppins({
  subsets: ['latin'],
  weight: '300',
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions)

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'bg-accent flex w-screen overflow-x-hidden antialiased',
            poppins.className
          )}
        >
          <SessionProvider session={session}>
            <ThemeContext>
              <Sidebar />
              <Header />
              <Content>{children}</Content>
              <TailwindIndicator />
              <Toaster />
              <Sonner />
            </ThemeContext>
          </SessionProvider>
        </body>
      </html>
    </>
  )
}
