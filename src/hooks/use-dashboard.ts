import { create } from 'zustand'

type CardsProperties = {
  amount: number
  reportLastMonth: number
}

interface UseDashBoardProps {
  customers: CardsProperties
  invoiceCreated: CardsProperties
  billingCreated: CardsProperties
  setCustomers: (amount: number, reportLastMonth: number) => void
  setInvoiceCreated: (amount: number, reportLastMonth: number) => void
  setBillingCreated: (amount: number, reportLastMonth: number) => void
}

export const useDashboard = create<UseDashBoardProps>((set) => ({
  customers: {
    amount: 0,
    reportLastMonth: 0,
  },
  invoiceCreated: {
    amount: 0,
    reportLastMonth: 0,
  },
  billingCreated: {
    amount: 0,
    reportLastMonth: 0,
  },
  setCustomers: (amount, reportLastMonth) =>
    set((state) => ({
      customers: {
        amount,
        reportLastMonth,
      },
    })),
  setInvoiceCreated: (amount, reportLastMonth) =>
    set((state) => ({
      invoiceCreated: {
        amount,
        reportLastMonth,
      },
    })),
  setBillingCreated: (amount, reportLastMonth) =>
    set((state) => ({
      billingCreated: {
        amount,
        reportLastMonth,
      },
    })),
}))
