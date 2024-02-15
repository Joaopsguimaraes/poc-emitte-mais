import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export interface ResultsCardsProps {
  title: string
  icon: ReactNode | JSX.Element
  value: number
  style: string
}

export function ResultsCards({ title, icon, value, style }: ResultsCardsProps) {
  return (
    <div
      className={cn(
        'bg-card w-full items-start flex pr-2 py-5 flex-col shadow-default rounded-2xl'
      )}
    >
      <div
        className={cn(
          style,
          'bg-card min-w-[220px] w-full items-start flex flex-col rounded-e-2xl pl-4 border-l-4 '
        )}
      >
        <div className={cn(style, 'self-end p-3 rounded-full')}>{icon}</div>
        <div className="text-2xl font-bold">{value}</div>
        <span className={cn('text-xs font-medium bg-none text-[#718EBF]/80')}>{title}</span>
      </div>
    </div>
  )
}
