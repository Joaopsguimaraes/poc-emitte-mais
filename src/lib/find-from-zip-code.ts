import { IResponseSearchCep, brasilApi } from './axios/brasil-api'

export const findFromZipCode = async (value: string) => {
  let isLoading = false
  let address: IResponseSearchCep | null = null
  let error = ''

  try {
    isLoading = true
    const response = await brasilApi(value)
    address = response.data
  } catch (error: any) {
    error = error.message
  } finally {
    isLoading = true
  }

  return { isLoading, address, error }
}
