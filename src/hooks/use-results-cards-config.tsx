import { BarChart, Check, File, User, X } from 'lucide-react'

import { ResultsCardsProps } from '@/components/dashboard/results-cards'

import { useDashboard } from './use-dashboard'

export function useResultsCardsConfig() {
  const { customers, invoiceCreated, billingCreated, invoiceCanceled } =
    useDashboard()

  const resultsCardsConfig: ResultsCardsProps[] = [
    {
      title: 'Emitentes',
      icon: <User className="size-5 text-white" />,
      value: customers.amount,
      style: 'bg-gray900 text-gray900 border-l-gray900 ',
    },
    {
      title: 'Notas emitidas',
      icon: <File className="size-5 text-white" />,
      value: invoiceCreated.amount,
      style: 'bg-primary text-primary border-l-primary',
    },
    {
      title: 'Notas validadas',
      icon: <Check className="size-5 text-white" />,
      value: billingCreated.amount,
      style: 'bg-[#C40062] text-[#C40062] border-l-[#C40062]',
    },
    {
      title: 'Notas canceladas',
      icon: <X className="size-5 text-white" />,
      value: invoiceCanceled.amount,
      style: 'bg-secondary text-secondary border-l-secondary',
    },
  ]

  return {
    resultsCardsConfig,
  }
}
