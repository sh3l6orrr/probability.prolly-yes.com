import { create } from 'zustand'

export const useProbabilityStore = create((set) => ({
  distr: 'norm',
  type: 'continuous',
  params: { loc: 0, scale: 1 },
  moments: { mean: 0, variance: 1, skewness: 0, kurtosis: 0 },
  showPlot: ['moments', 'pdf'],
  nSample: 50,
  trigger: false,
  toggleTrigger: () => set((state) => ({ trigger: !state.trigger })),
  setDistr: (newDistr) => set({ distr: newDistr }),
  setParams: (newParams) => set({ params: newParams }),
  setMoments: (newMoments) => set({ moments: newMoments }),
  setType: (newType) => set({ type: newType }),
  setNSample: (newNSample) => set({ nSample: newNSample }),
  toggleShowPlot: (newShowPlot) => set((state) => {
    if (state.showPlot.includes(newShowPlot)) {
      return { showPlot: state.showPlot.filter(item => item !== newShowPlot) };
    } else {
      return { showPlot: [...state.showPlot, newShowPlot] };
    }
  }),
  toggleShowPlotPmfAndPdf: (newShowPlot) => set((state) => {
    if (newShowPlot === 'pdf') {
      return { showPlot: state.showPlot.map(item => item.replace('pmf', 'pdf')) }
    }
    if (newShowPlot === 'pmf') {
      return { showPlot: state.showPlot.map(item => item.replace('pdf', 'pmf')) }
    }
  })
}))