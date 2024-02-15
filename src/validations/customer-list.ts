import { z } from 'zod'

export const customersListSchema = z.object({
  id: z.string(),
  document: z.string(),
  fullName: z.string(),
  totalInvoices: z.number(),
  modules: z.array(z.string()),
  status: z.string(),
})

export type CustomersListSchema = z.infer<typeof customersListSchema>
