export interface AccountantCreateResponse {
  id: string
  addressId: string | null
  partnerId: string | null
  step: number
  firstName: string
  lastName: string
  email: string
  whatsapp: string
  validationCode: string
  validatedWhatsapp: boolean
  documentType: any
  documentId: any
  companyName: any
  tradingName: any
  jobPosition: any
  crc: any
  serviceProvided: any
  numberClients: any
  serveMei: any
  serveRuralProducers: any
  indicatesCertificate: any
  issuedByCustomers: any
  sourceInformation: any
  createdAt: string
  updatedAt: string
}