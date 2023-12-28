import { distrParams, distrParamsNames } from "./util"
import { useProbabilityStore } from "./store"

export default function Settings() {
  const { distr, params, setDistr, setParams, setRerender, rerender} = useProbabilityStore()

  return <>
    <h2>Probability Distribution</h2>
    <div className="
      bg-neutral-100 dark:bg-black
      w-full rounded-2xl p-6
    ">
      <select value={distr} onChange={e => {
        setParams(distrParams[e.target.value])
        setDistr(e.target.value)
        setRerender(!rerender)
      }}>
        <option value="norm">Normal</option>
        <option value="t">Student&apos;s t</option>
        <option value="f">F</option>
        <option value="chi2">Chi-squared</option>
      </select>
      <div className="h-3" />
      <form onSubmit={e => {
        e.preventDefault()
        setRerender(!rerender)
      }}>
        <div className="flex gap-3 w-full items-center">
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
  </>
}