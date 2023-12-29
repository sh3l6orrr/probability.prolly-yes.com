import { useProbabilityStore } from "./store"

export default function Selector() {
  const { setRerender, rerender, toggleShowPlot, showPlot, type } = useProbabilityStore()
  const selections = type === 'discrete' ? selectionsDiscrete : selectionsContinuous
  return <div>
    <h2>Select Desired Visualization</h2>
    <div className="bg-neutral-100 dark:bg-black w-full rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between">
        <div className="flex gap-3">
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