import axios, { type AxiosError, type AxiosInstance } from 'axios'

export const ibge = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
})