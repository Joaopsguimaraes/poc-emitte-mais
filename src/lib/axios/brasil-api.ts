import axios from 'axios'

export interface IResponseSearchCep {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  service: string
  location: { type: string; coordinates: {} }
}

export const brasilApi = async (cep: string) =>
  await axios.get<IResponseSearchCep>(
    'https://brasilapi.com.br/api/cep/v1/' + cep.split('-').join('')
  )
