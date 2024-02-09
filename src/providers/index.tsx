'use client'

import { type ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

export interface ThemeProviderProps {
  children: ReactNode
}

export default function ThemeContext({ children }: ThemeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
      enableSystem
    >
      {children}
    </ThemeProvider>
  )
}
