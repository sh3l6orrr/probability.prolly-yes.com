import { useEffect } from "react"
import { distrParams, distrParamsNames } from "./util"
import { useProbabilityStore } from "./store"
import { getMoments, showPdf } from "./actions"

export default function Settings() {
  const { distr, params, formMonitor, setDistr, setParams, setFormMonitor, setMoments } = useProbabilityStore()


  useEffect(() => {
    let formData = new FormData()
    for (const key in params) formData.append(key, params[key])
    formData.append('distr', distr)

    async function update() {
      // Update plot
      const data = await showPdf(formData)
      if (data) await vegaEmbed('#plot', data)

      // Update moments
      const moments = await getMoments(formData)
      if (moments) setMoments(moments)
    }

    update()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formMonitor])

  return <>
    <h2>Probability Distribution</h2>
    <div className="
      bg-neutral-100 dark:bg-black
      w-full rounded-2xl p-6
    ">
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
            <div key={key} className='flex gap-3 items-center'>
              <i>{distrParamsNames[distr][key]}</i>
              <input className="w-16" name={key} value={params[key]} onChange={e => {
                setParams({ ...params, [key]: e.target.value })
              }} required />
            </div>
          ))}
          <div className="grow" />
          <div>
            <button type='submit' className="border p-1 px-3 rounded">Press enter to render</button>
          </div>

        </div>

      </form>
    </div>
  </>
}