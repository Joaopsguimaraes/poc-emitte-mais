import { z } from 'zod'

export const customersListSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  shortName: z.string(),
  dueCertificate: z.string(),
  plansAndCredits: z.string(),
  document: z.string(),
  modules: z.array(z.string()),
  status: z.string(),
})

export type CustomersListSchema = z.infer<typeof customersListSchema>
