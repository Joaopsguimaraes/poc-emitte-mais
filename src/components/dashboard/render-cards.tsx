'use client'

import { useResultsCardsConfig } from '@/hooks/use-results-cards-config'

import { ResultsCards } from './results-cards'

export function RenderCards() {
  const { resultsCardsConfig } = useResultsCardsConfig()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {resultsCardsConfig.map(({ title, icon, value, description }) => (
        <ResultsCards
          key={title}
          title={title}
          icon={icon}
          value={value}
          description={description}
        />
      ))}
    </div>
  )
}
