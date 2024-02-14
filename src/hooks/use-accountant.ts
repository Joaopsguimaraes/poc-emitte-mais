import { AccountantCreateDTO } from '@/@types/accountant/accountant-create-dto'
import { AccountantCreateResponse } from '@/@types/accountant/accountant-create-response'
import { AccountantUpdateDTO } from '@/@types/accountant/accountant-update-dto'
import { removeEmptyFields } from '@/utils/remove-empty-fields'
import { create } from 'zustand'

import { emitteMaisApi } from '@/lib/axios/emitte-mais-api'

interface UseAccountantState {
  accountantCreated: AccountantCreateResponse | null
  createAccountant: (
    accountantCreateDTO: AccountantCreateDTO
  ) => Promise<AccountantCreateResponse>
  updateAccountant: (
    id: string,
    accountantUpdateDTO: AccountantUpdateDTO
  ) => Promise<void>
}

export const useAccountant = create<UseAccountantState>((set) => ({
  accountantCreated: null,
  createAccountant: async (dto) => {
    const { data } = await emitteMaisApi.post<AccountantCreateResponse>(
      '/accountant',
      dto
    )

    set({ accountantCreated: data })

    return data
  },
  updateAccountant: async (
    accountantId: string,
    accountantUpdateDTO: AccountantUpdateDTO
  ) => {
    const { data } = await emitteMaisApi.put<AccountantCreateResponse>(
      `/accountant/${accountantId}`,
      accountantUpdateDTO
    )

    set({ accountantCreated: data })
  },
}))
