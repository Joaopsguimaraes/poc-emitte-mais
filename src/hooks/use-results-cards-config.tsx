import { formatCurrency } from '@/lib/fomart-currency'
import { formatPercent } from '@/lib/percent-format'
import { ResultsCardsProps } from '@/components/dashboard/results-cards'

import { useDashboard } from './use-dashboard'

export function useResultsCardsConfig() {
  const { customers, invoiceCreated, billingCreated } = useDashboard()

  const resultsCardsConfig: ResultsCardsProps[] = [
    {
      title: 'Clientes ativos',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="text-muted-foreground size-4"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      value: String(customers.amount),
      description: `${formatPercent(customers.reportLastMonth)} ao mes passado`,
    },
    {
      title: 'Notas emitidas',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="text-muted-foreground size-4"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      value: formatCurrency(invoiceCreated.amount),
      description: `${formatPercent(invoiceCreated.reportLastMonth)} ao mes passado`,
    },
    {
      title: 'Cobranças geradas',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="text-muted-foreground size-4"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      value: formatCurrency(billingCreated.amount),
      description: `${formatPercent(billingCreated.reportLastMonth)} ao mes passado`,
    },
    {
      title: 'Certificados brindes',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="text-muted-foreground size-4"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
      ),
      value: String(billingCreated.amount),
      description: `${formatPercent(billingCreated.reportLastMonth)} ao mes passado`,
    },
  ]

  return {
    resultsCardsConfig,
  }
}
