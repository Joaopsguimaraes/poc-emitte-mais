import { create } from 'zustand'

interface UseSignUp {
  activeStep: number
  setActiveStep: (step: number) => void
}

export const useSignUp = create<UseSignUp>((set) => ({
  activeStep: 0,
  setActiveStep: (step) => set({ activeStep: step }),
}))
