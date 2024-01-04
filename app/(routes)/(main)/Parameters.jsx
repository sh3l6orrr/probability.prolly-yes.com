import { useState } from "react"
import { useProbabilityStore } from "./store"
import { InlineMath } from 'react-katex'
import distriConfig from "./distrConfig"

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
          <InlineMath math={`${distriConfig[distr].params[key].label} = ${params[key]}`} />
          <input type='range' min={distriConfig[distr].params[key].min} max={distriConfig[distr].params[key].max} step={distriConfig[distr].params[key].step} className="w-48" name={key} value={params[key]} onChange={e => setParams({ ...params, [key]: e.target.value })} onMouseUp={() => { toggleTrigger(); setFailed(false) }} />
        </div>
      </div>
      )}
    </div>}
    {specifyParams && <form className="flex flex-col gap-3" onSubmit={e => { e.preventDefault(); setFailed(false); toggleTrigger() }}>
      <div className="flex flex-wrap gap-3">
        {Object.keys(params).map(key => <div key={key}>
          <div className='flex items-center gap-2'>
            <InlineMath math={`${distriConfig[distr].params[key].label} = `} />
            <input className="w-16" name={key} value={params[key]} maxLength={6} onChange={e => setParams({ ...params, [key]: e.target.value })} required />
          </div>
        </div>
        )}</div>
      {specifyParams && <button className="rounded-xl mt-1.5" type='submit'>Apply</button>}
    </form>}
  </div>
}