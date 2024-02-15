import { create, StoreApi, UseBoundStore } from 'zustand'
import { persist } from 'zustand/middleware'

import {
  StepOneCreateCustomerSchema,
  StepThreeCreateNewCustomerSchema,
  StepTwoCreateCustomerSchema,
} from './use-new-customer'

interface UseCustomersProps {
  storageStepOneNewCustomer: StepOneCreateCustomerSchema | null
  storageSecondNewCustomer: StepTwoCreateCustomerSchema | null
  storageThirdNewCustomer: StepThreeCreateNewCustomerSchema | null
  setStorageStepOneNewCustomer: (stepOne: StepOneCreateCustomerSchema | null) => void
  setStorageSecondNewCustomer: (stepTwo: StepTwoCreateCustomerSchema | null) => void
  setStorageThirdNewCustomer: (
    stepThree: StepThreeCreateNewCustomerSchema
  ) => void
}

export const useCustomers = create<UseCustomersProps>(
  persist(
    (set, get) => ({
      storageStepOneNewCustomer: null,
      storageSecondNewCustomer: null,
      storageThirdNewCustomer: null,
      setStorageStepOneNewCustomer: (stepOne: StepOneCreateCustomerSchema) =>
        set({ storageStepOneNewCustomer: stepOne }),
      setStorageSecondNewCustomer: (stepTwo: StepTwoCreateCustomerSchema) =>
        set({ storageSecondNewCustomer: stepTwo }),
      setStorageThirdNewCustomer: (
        stepThree: StepThreeCreateNewCustomerSchema
      ) => set({ storageThirdNewCustomer: stepThree }),
    }),

    {
      name: '@emitte-mais/use-customers',
    }
  ) as UseBoundStore<StoreApi<UseCustomersProps>>
)
