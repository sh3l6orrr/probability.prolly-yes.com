import { useState } from "react"
import { useProbabilityStore } from "./store"
import { InlineMath } from 'react-katex'

export default function Parameters() {
  const { distr, params, setParams, toggleTrigger, setFailed } = useProbabilityStore()
  const [specifyParams, setSpecifyParams] = useState(false)


  return <div className="border-b p-8">
    <div className="flex justify-between">
      <h3>Parameters</h3>
      <button className='button-secondary' onClick={() => setSpecifyParams(!specifyParams)}>{specifyParams ? "Use Slider" : 'Customize'}</button>
    </div>

    <div className="h-3"></div>
    {!specifyParams && <div className="flex flex-col gap-3">
      {Object.keys(params).map(key => <div key={key}>
        <div className='flex items-center justify-between'>
          <InlineMath math={`${distrParamsNames[distr][key]} = ${params[key]}`} />
          <input type='range' min={distrParamsRange[distr][key].min} max={distrParamsRange[distr][key].max} step={distrParamsRange[distr][key].step} className="w-48" name={key} value={params[key]} onChange={e => setParams({ ...params, [key]: e.target.value })} onMouseUp={() => { toggleTrigger(); setFailed(false) }} />
        </div>
      </div>
      )}
    </div>}
    {specifyParams && <form className="flex flex-col gap-3" onSubmit={e => { e.preventDefault(); setFailed(false); toggleTrigger() }}>
      <div className="flex flex-wrap gap-3">
        {Object.keys(params).map(key => <div key={key}>
          <div className='flex items-center gap-2'>
            <InlineMath math={`${distrParamsNames[distr][key]} = `} />
            <input className="w-16" name={key} value={params[key]} maxLength={6} onChange={e => setParams({ ...params, [key]: e.target.value })} required />
          </div>
        </div>
        )}</div>
      {specifyParams && <button className="rounded-xl mt-1.5" type='submit'>Apply</button>}
    </form>}
  </div>
}

const distrParamsNames = {
  norm: {
    loc: '\\mu',
    scale: '\\sigma^2'
  },
  t: {
    df: '\\nu'
  },
  f: {
    dfn: 'd_1',
    dfd: 'd_2'
  },
  chi2: {
    df: 'k'
  },
  binom: {
    n: 'n',
    p: 'p'
  }
}

const distrParamsRange = {
  norm: {
    loc: {
      min: -5,
      max: 5,
      step: 0.5
    },
    scale: {
      min: 1,
      max: 10,
      step: 0.5
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
      step: 5
    },
    p: {
      min: 0,
      max: 1,
      step: 0.1
    }
  }
}