import { create } from 'zustand'

export const useProbabilityStore = create((set) => ({
  distr: 'norm',
  type: 'continuous',
  params: { loc: 0, scale: 1 },
  showPlot: ['moments', 'pdf'],
  nSample: 50,
  trigger: false,
  falied: false,
  setFailed: (newVal) => set(() => ({ failed: newVal })),
  toggleTrigger: () => set((state) => ({ trigger: !state.trigger })),
  setDistr: (newDistr) => set({ distr: newDistr }),
  setParams: (newParams) => set({ params: newParams }),
  setType: (newType) => set({ type: newType }),
  setNSample: (newNSample) => set({ nSample: newNSample }),
  toggleShowPlot: (newShowPlot) => set((state) => {
    if (state.showPlot.includes(newShowPlot)) {
      return { showPlot: state.showPlot.filter(item => item !== newShowPlot) };
    } else {
      return { showPlot: [...state.showPlot, newShowPlot] };
    }
  })
}))