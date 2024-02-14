export interface AccountantUpdateDTO {
  step?: number
  firstName?: string
  lastName?: string
  email?: string
  whatsapp?: string
  validationCode?: string
  documentType?: string
  documentId?: string
  companyName?: string
  tradingName?: string
  jobPosition?: string
  crc?: string
  address?: {
    zip: string
    street: string
    number?: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    country: string
  }
  serviceProvided?: string
  numberClients?: string
  serveMei?: boolean
  serveRuralProducers?: boolean
  indicatesCertificate?: boolean
  issuedByCustomers?: boolean
  sourceInformation?: string
  password?: string
  validatedWhatsapp?: boolean
  partnerId?: string
}
