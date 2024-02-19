import { z } from 'zod'

export const customerDetailsSchema = z.object({
  id: z.string(),
  status: z.string(),
  customerType: z.string(),
  document: z.string(),
  state: z.string().optional(),
  fullName: z.string(),
  shortName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  inscricaoEstadual: z.string().optional(),
  inscricaoMunicipal: z.string().optional(),
  address: z.object({
    street: z.string(),
    number: z.string().optional(),
    complement: z.string().optional(),
    district: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    cep: z.string(),
  }),
  isProdutorRural: z.boolean(),
  crt: z.string(),
  regimeEspecial: z.string(),
  modules: z.array(z.string()),
})

export type CustomerDetailsSchema = z.infer<typeof customerDetailsSchema>

export const validateCustomerDetails = (data: unknown): CustomerDetailsSchema => {
  return customerDetailsSchema.parse(data)
}
