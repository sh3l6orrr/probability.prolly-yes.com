import { useProbabilityStore } from "./store"

export default function Distribution() {
  const { distr, setDistr, setParams, setRerender, rerender, toggleShowPlotPmfAndPdf, setType } = useProbabilityStore()

  return <div>
    <h2>Select Probability Distribution</h2>
    <div className="bg-neutral-100 dark:bg-black rounded-2xl p-6 shadow-lg">
      <div className="flex gap-3">
        {
          distributions.map(item => <button key={item.name}
            className={distr === item.label ? 'bg-blue-200 dark:text-black' : ''}
            onClick={() => {
              setParams(distrDefaultParams[item.label])
              setDistr(item.label)
              if (discreteDistributions.includes(item.label)) {
                setType('discrete')
                toggleShowPlotPmfAndPdf('pmf')
              } else {
                setType('continuous')
                toggleShowPlotPmfAndPdf('pdf')
              }
              setRerender(!rerender)
            }}>
            {item.name}
          </button>)
        }
      </div>

    </div>
  </div>
}

const distributions = [
  {
    name: 'Normal',
    label: 'norm',
  },
  {
    name: "Student's t",
    label: 't',
  },
  {
    name: "Chi-squared",
    label: 'chi2',
  },
  {
    name: "F",
    label: 'f',
  },
  {
    name: 'Binomial',
    label: 'binom'
  }
]

const distrDefaultParams = {
  norm: {
    loc: 0,
    scale: 1
  },
  t: {
    df: 10
  },
  f: {
    dfn: 20,
    dfd: 10
  },
  chi2: {
    df: 10
  },
  binom: {
    n: 10,
    p: 0.3
  }
}

const discreteDistributions = [
  'binom'
]