import { distrParams, distrParamsNames } from "./util"
import { useProbabilityStore } from "./store"

export default function Settings() {
  const { distr, params, setDistr, setParams, setRerender, rerender } = useProbabilityStore()

  return <div>
    <h2>Specify Probability Distribution</h2>
    <div className="bg-neutral-100 dark:bg-black rounded-2xl p-6 shadow-lg">
      <div className="flex gap-3">
        {
          distributions.map(item => <button key={item.name}
            className={distr === item.label ? 'bg-blue-200 dark:text-black' : ''}
            onClick={() => {
              setParams(distrParams[item.label])
              setDistr(item.label)
              setRerender(!rerender)
            }}>
            {item.name}
          </button>)
        }
      </div>

      <div className="h-3" />
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
  }
]