import { useProbabilityStore } from "./store"

export default function Parameters() {
  const { distr, params, setParams } = useProbabilityStore()

  return <div className="border-b p-8">
    <h3>Parameters</h3>
    <div className="h-3"></div>
    <form>
      <div className="flex flex-wrap gap-3 items-center">
        {Object.keys(params).map(key => (
          <div key={key} className='flex gap-3 items-center'>
            <i>{distrParamsNames[distr][key]}</i>
            <input className="w-16" maxLength="6" placeholder={key}  name={key} value={params[key]} onChange={e => {
              setParams({ ...params, [key]: e.target.value })
            }} required />
          </div>
        ))}
      </div>
    </form>
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