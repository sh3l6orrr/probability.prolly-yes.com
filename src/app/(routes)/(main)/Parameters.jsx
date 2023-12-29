import { useProbabilityStore } from "./store"

export default function Parameters() {
  const { distr, params, setParams, setRerender, rerender } = useProbabilityStore()

  return <div>
    <h2>Configure Parameters</h2>
    <div className="bg-neutral-100 dark:bg-black rounded-2xl p-6 shadow-lg">
      <form onSubmit={e => {
        e.preventDefault()
        setRerender(!rerender)
      }}>
        <div className="flex gap-3 items-center">
          {Object.keys(params).map(key => (
            <div key={key} className='flex gap-3 items-center'>
              <i>{distrParamsNames[distr][key]}</i>
              <input className="w-16" name={key} value={params[key]} onChange={e => {
                setParams({ ...params, [key]: e.target.value })
              }} required />
            </div>
          ))}
          <div className="grow" />
          <div>
            <button type='submit'>Press enter to render</button>
          </div>
        </div>
      </form>
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