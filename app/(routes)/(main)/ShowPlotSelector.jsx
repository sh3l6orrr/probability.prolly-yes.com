import { useProbabilityStore } from "./store"

export default function ShowPlotSelector() {
  const { toggleShowPlot, showPlot, type } = useProbabilityStore()
  return <div className="border-b p-8">
    <h3>Show Utilities</h3>
    <div className="h-3"></div>
    <div className="flex justify-between">
      <div className="flex flex-wrap gap-3">
        <button className={showPlot.includes('moments') ? 'bg-blue-200 dark:text-black' : ''} onClick={() => toggleShowPlot('moments')}>
          Moments
        </button>
        <button className={showPlot.includes('pdf') ? 'bg-blue-200 dark:text-black' : ''} onClick={() => toggleShowPlot('pdf')}>
          {type === 'continuous' ? 'PDF' : 'PMF'}
        </button>
        <button className={showPlot.includes('cdf') ? 'bg-blue-200 dark:text-black' : ''} onClick={() => toggleShowPlot('cdf')}>
          CDF
        </button>
        <button className={showPlot.includes('sampling') ? 'bg-blue-200 dark:text-black' : ''} onClick={() => toggleShowPlot('sampling')}>
          Sampling
        </button>
      </div>
    </div>
  </div>
}