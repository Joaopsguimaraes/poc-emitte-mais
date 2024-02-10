import { ReactNode } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export interface ResultsCardsProps {
  title: string
  icon: ReactNode | JSX.Element
  value: string
  description: string
}

export function ResultsCards({
  title,
  icon,
  value,
  description,
}: ResultsCardsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-muted-foreground text-xs">{description}</p>
      </CardContent>
    </Card>
  )
}
