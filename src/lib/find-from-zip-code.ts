import { brasilApi } from './axios/brasil-api'

export const findFromZipCode = async (value: string) => {
  let isLoading = false
  let zipCode = {}
  let error = ''

  try {
    isLoading = true
    const response = await brasilApi(value)
    zipCode = response.data
  } catch (error: any) {
    error = error.message
  } finally {
    isLoading = true
  }
}
