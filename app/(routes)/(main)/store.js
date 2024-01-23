import { create } from 'zustand'

export const useProbabilityStore = create((set) => ({
  distr: 'norm',
  type: 'continuous',
  params: { loc: 0, scale: 1 },
  showPlot: ['meta', 'attributes', 'pdf'],
  trigger: false,
  falied: false,
  setFailed: (newVal) => set(() => ({ failed: newVal })),
  toggleTrigger: () => set((state) => ({ trigger: !state.trigger })),
  setDistr: (newDistr) => set({ distr: newDistr }),
  setParams: (newParams) => set({ params: newParams }),
  setType: (newType) => set({ type: newType }),
  toggleShowPlot: (newShowPlot) => set((state) => {
    if (state.showPlot.includes(newShowPlot)) {
      return { showPlot: state.showPlot.filter(item => item !== newShowPlot) };
    } else {
      return { showPlot: [...state.showPlot, newShowPlot] };
    }
  })
}))