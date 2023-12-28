import { useEffect, useState } from "react"
import { renderPlot } from "./func"
import { distrParams, distrParamsNames } from "./util"

export default function Settings() {
  const [distr, setDistr] = useState('norm')
  const [params, setParams] = useState({ loc: 0, scale: 1 })
  const [formMonitor, setFormMonitor] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { renderPlot(distr, params) }, [formMonitor])

  return <>
    <div className="
      bg-neutral-100 dark:bg-black
      w-full rounded-2xl p-6
    ">
      <h3>Select Distribution</h3>
      <select value={distr} onChange={e => {
        setParams(distrParams[e.target.value])
        setDistr(e.target.value)
        setFormMonitor(!formMonitor)
      }}>
        <option value="norm">Normal</option>
        <option value="t">Student&apos;s t</option>
        <option value="f">F</option>
        <option value="chi2">Chi-squared</option>
      </select>
      <div className="h-3" />
      <form onSubmit={e => {
        e.preventDefault()
        setFormMonitor(!formMonitor)
      }}>
        <div className="flex gap-3 w-full items-center">
          {Object.keys(params).map(key => (
            <div key={key}>
              <h3>{distrParamsNames[distr][key]}</h3>
              <input className="w-20" name={key} value={params[key]} onChange={e => {
                setParams({ ...params, [key]: e.target.value })
              }} required />
            </div>
          ))}
          <div className="grow" />
          <div>
            <button type='submit' className="border p-1 px-3 rounded">Render</button>
          </div>

        </div>

      </form>
    </div>
  </>
}