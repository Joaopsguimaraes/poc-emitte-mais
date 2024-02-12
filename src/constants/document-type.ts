export enum DocumentType {
  NATURAL_PERSON = 'F',
  LEGAL_PERSON = 'J',
}

export const documentTypeOptions = [
  {
    label: 'Pessoa Física',
    value: DocumentType.NATURAL_PERSON,
  },
  {
    label: 'Pessoa Jurídica',
    value: DocumentType.LEGAL_PERSON,
  },
]
