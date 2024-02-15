import axios from 'axios'

export const searchCNPJ = async (query: string) => {
  return await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${query}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
