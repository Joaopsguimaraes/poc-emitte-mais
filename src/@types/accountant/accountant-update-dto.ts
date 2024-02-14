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
  serviceProvided?: 'ACCOUNTING' | 'BPO' | 'CONSULTANCY' | 'OTHERS'
  numberClients?:
    | 'ZERO_TO_NINETEEN'
    | 'TWENTY_TO_FORTY_NINE'
    | 'FIFTY_TO_NINETY_NINE'
    | 'ONE_HUNDRED_TO_ONE_HUNDRED_AND_NINETY_NINE'
    | 'TWO_HUNDRED_TO_TWO_HUNDRED_AND_NINETY_NINE'
    | 'ABOVE_THREE_HUNDRED'

  serveMei?: boolean
  serveRuralProducers?: boolean
  indicatesCertificate?: boolean
  issuedByCustomers?: boolean
  sourceInformation?:
    | 'GOOGLE'
    | 'SOCIAL_MEDIA'
    | 'YOUTUBE'
    | 'BLOG'
    | 'EVENT'
    | 'RECOMMENDATION'
    
  password?: string
  validatedWhatsapp?: boolean
  partnerId?: string
}
