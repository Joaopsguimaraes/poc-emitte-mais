import { create } from 'zustand'

interface UseSignUp {
  activeStep: number
  setActiveStep: (step: number) => void
  tabsTrigger: 'sign-up' | 'sign-in'
  setTabsTrigger: (trigger: 'sign-up' | 'sign-in') => void
}

export const useSignUp = create<UseSignUp>((set) => ({
  activeStep: 0,
  tabsTrigger: 'sign-in',
  setActiveStep: (step) => set({ activeStep: step }),
  setTabsTrigger: (trigger) => set({ tabsTrigger: trigger }),
}))
