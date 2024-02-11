import { ibge } from './axios/igbe-api'

export type IBGEResponseApi = {
  id: number
  nome: string
  sigla: string
}

export const getStates = async () => {
  return await ibge.get('/estados?orderBy=nome').then(({ data }) =>
    data.map((state: IBGEResponseApi) => ({
      label: state.nome,
      value: state.sigla,
    }))
  )
}
