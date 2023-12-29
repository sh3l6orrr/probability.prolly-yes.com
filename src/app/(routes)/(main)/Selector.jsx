import { useProbabilityStore } from "./store"

export default function Selector() {
  const { setRerender, rerender, toggleShowPlot, showPlot, type } = useProbabilityStore()
  const selections = type === 'discrete' ? selectionsDiscrete : selectionsContinuous
  return <div className="border-b p-8">
    <h3>Show Visualizations</h3>
    <div className="h-3"></div>
    <div className="flex justify-between">
      <div className="flex flex-wrap gap-3">
        {selections.map(item => <button key={item.name}
          className={showPlot.includes(item.label) ? 'bg-blue-200 dark:text-black' : ''} onClick={() => {
            toggleShowPlot(item.label)
            setRerender(!rerender)
          }}>
          {item.name}
        </button>
        )}
      </div>
    </div>
  </div>
}

const selectionsContinuous = [
  {
    name: 'Moments',
    label: 'moments'
  },
  {
    name: 'PDF',
    label: 'pdf'
  },
  {
    name: 'CDF',
    label: 'cdf'
  }
]

const selectionsDiscrete = [
  {
    name: 'Moments',
    label: 'moments'
  },
  {
    name: 'PMF',
    label: 'pmf'
  },
  {
    name: 'CDF',
    label: 'cdf'
  }
]