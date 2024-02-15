'use client'

import { useResultsCardsConfig } from '@/hooks/use-results-cards-config'

import { ResultsCards } from './results-cards'

export function RenderCards() {
  const { resultsCardsConfig } = useResultsCardsConfig()

  return (
    <div className="flex w-full gap-10">
      {resultsCardsConfig.map(({ title, icon, value, style }) => (
        <ResultsCards
          key={title}
          title={title}
          icon={icon}
          value={value}
          style={style}
        />
      ))}
    </div>
  )
}
