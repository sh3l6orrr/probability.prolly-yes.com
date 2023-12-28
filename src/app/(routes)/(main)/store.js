import { create } from 'zustand'

export const useProbabilityStore = create((set) => ({
  distr: 'norm',
  params: { loc: 0, scale: 1 },
  formMonitor: false,
  moments: { mean: 0, variance: 1, skewness: 0, kurtosis: 0}, 
  setDistr: (newDistr) => set({ distr: newDistr }),
  setParams: (newParams) => set({ params: newParams }),
  setFormMonitor: (newFormMonitor) => set({ formMonitor: newFormMonitor }),
  setMoments: (newMoments) => set({ moments: newMoments }),
}))