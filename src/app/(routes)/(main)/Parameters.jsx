import { useState } from "react"
import { useProbabilityStore } from "./store"

export default function Parameters() {
  const { distr, params, setParams, toggleTrigger } = useProbabilityStore()
  const [specifyParams, setSpecifyParams] = useState(false)


  return <div className="border-b p-8">
    <div className="flex justify-between">
      <h3>Parameters</h3>
      <button onClick={() => setSpecifyParams(!specifyParams)}>{specifyParams ? "Use Slider" : 'Customize'}</button>
    </div>

    <div className="h-3"></div>
    <div className="flex flex-col gap-3">
      {Object.keys(params).map(key => (
        <div key={key} className='flex items-center justify-between'>
          {!specifyParams && <>
            {distrParamsNames[distr][key]} = {params[key]}
            <input type='range' min={distrParamsRange[distr][key].min} max={distrParamsRange[distr][key].max} step={distrParamsRange[distr][key].step} className="w-48" name={key} value={params[key]} onChange={e => setParams({ ...params, [key]: e.target.value })} onMouseUp={() => toggleTrigger()} />
          </>}
          {specifyParams && <>
            {distrParamsNames[distr][key]}
            <input className="w-48" name={key} value={params[key]} onChange={e => setParams({ ...params, [key]: e.target.value })} />

          </>}
        </div>
      ))}
      {specifyParams && <button className="rounded-xl mt-1.5" classonClick={() => toggleTrigger()}>Apply</button>}

    </div>


  </div>
}

const distrParamsNames = {
  norm: {
    loc: 'Mean',
    scale: 'Variance'
  },
  t: {
    df: 'DF'
  },
  f: {
    dfn: 'DF1',
    dfd: 'DF2'
  },
  chi2: {
    df: 'DF'
  },
  binom: {
    n: '#Trials',
    p: 'Win Rate'
  }
}

const distrParamsRange = {
  norm: {
    loc: {
      min: -5,
      max: 5,
      step: 1
    },
    scale: {
      min: 1,
      max: 10,
      step: 1
    }
  },
  t: {
    df: {
      min: 5,
      max: 30,
      step: 1
    }
  },
  f: {
    dfn: {
      min: 5,
      max: 25,
      step: 1
    },
    dfd: {
      min: 5,
      max: 25,
      step: 1
    }
  },
  chi2: {
    df: {
      min: 5,
      max: 25,
      step: 1
    }
  },
  binom: {
    n: {
      min: 10,
      max: 50,
      step: 1
    },
    p: {
      min: 0,
      max: 1,
      step: 0.1
    }
  }
}