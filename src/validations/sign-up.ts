import { z } from 'zod'

import { cnpjMask, emailMask, telMask } from '@/lib/maskter'

export const signUpFormSchema = z.object({
  // step 1
  firstName: z.string({}).min(3),
  lastName: z.string({}).optional(),
  email: z
    .string()
    .email()
    .transform((v) => emailMask.onChange(v)),
  phone: z
    .string()
    .min(11)
    .transform((v) => telMask.onChange(v)),
  // step 2
  validationCode: z.string().min(6),
  // step 3
  document_type: z.string().min(3),
  document_id: z
    .string()
    .min(11)
    .transform((v) => cnpjMask.onChange(v)),
  company_name: z.string().min(3),
  trading_name: z.string().min(3),
  job_position: z.string().min(3),
  crc: z.string().min(3),
  // step 4
  address: z.object({
    zip: z.string(),
    street: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
  }),
  // step 5
  service_provided: z.string(),
  number_clients: z.string(),
  serve_mei: z.string().optional(),
  serve_rural_producers: z.string(),
  indicates_certificate: z.string(),
  issued_by_customers: z.string(),
  source_information: z.string(),
  // step 6
  password: z.string(),
  password_confirmation: z.string(),
})

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>
