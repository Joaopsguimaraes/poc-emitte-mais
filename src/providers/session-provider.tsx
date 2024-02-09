'use client'

import { type PropsWithChildren } from 'react'
import { type Session } from 'next-auth'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

type SessionProviderProps = PropsWithChildren<{
  session: Session | null
}>
export default function SessionProvider({
  children,
  session,
}: SessionProviderProps) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  )
}
