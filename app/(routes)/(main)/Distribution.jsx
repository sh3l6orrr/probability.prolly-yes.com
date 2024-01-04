import { useState } from "react"
import { useProbabilityStore } from "./store"

export default function Distribution() {
  const { distr, setDistr, setParams, setType, setFailed } = useProbabilityStore()
  const [selectType, setSelectType] = useState('continuous')
  const distributions = selectType === 'continuous' ? continuousDistributions : discreteDistributions

  return <div className="border-b p-8">
    <div className="flex items-center justify-between">
      <h3>Probability Distribution</h3>
      {selectType === 'continuous' ?
        <button className="button-secondary" onClick={() => { setSelectType('discrete') }}>Continuous</button>
        : <button className="button-secondary" onClick={() => { setSelectType('continuous') }}>Discrete</button>}
    </div>

    <div className="h-3"></div>
    <div className="flex flex-col gap-4">
      <input placeholder="Search..." />
      <div className="flex flex-wrap gap-3">
        {
          distributions.map(item => <button key={item.name}
            className={distr === item.label ? 'bg-blue-200 dark:text-black' : ''}
            onClick={() => {
              setParams(distrDefaultParams[item.label])
              setDistr(item.label)
              setFailed(false)
              if (selectType === 'discrete') {
                setType('discrete')
              } else {
                setType('continuous')
              }
            }}>
            {item.name}
          </button>)
        }
      </div>

    </div>


  </div>
}

const continuousDistributions = [
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
  }
]


const discreteDistributions = [
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