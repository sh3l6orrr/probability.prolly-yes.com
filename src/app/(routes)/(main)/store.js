import { create } from 'zustand'

export const useProbabilityStore = create((set) => ({
  distr: 'norm',
  params: { loc: 0, scale: 1 },
  rerender: false,
  moments: { mean: 0, variance: 1, skewness: 0, kurtosis: 0 },
  showPlot: ['moments', 'pdf'],
  setDistr: (newDistr) => set({ distr: newDistr }),
  setParams: (newParams) => set({ params: newParams }),
  setRerender: (newRerender) => set({ rerender: newRerender }),
  setMoments: (newMoments) => set({ moments: newMoments }),
  toggleShowPlot: (newShowPlot) => {
    set((state) => {
      if (state.showPlot.includes(newShowPlot)) {
        return { showPlot: state.showPlot.filter(item => item !== newShowPlot) };
      } else {
        return { showPlot: [...state.showPlot, newShowPlot] };
      }
    });
  }
}))