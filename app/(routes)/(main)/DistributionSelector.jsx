'use client'

import { useState } from "react"
import { useProbabilityStore } from "./store"
import distriConfig from "./distrConfig"

export default function DistributionSelector() {
  const { distr, setDistr, setParams, setType, setFailed, toggleTrigger } = useProbabilityStore()
  const [selectType, setSelectType] = useState('continuous')

  return <div className="border-b p-8">
    <div className="flex items-center justify-between">
      <h3>Probability Distribution</h3>
      {selectType === 'continuous' ?
        <button className="button-secondary" onClick={() => { setSelectType('discrete') }}>Discrete</button>
        : <button className="button-secondary" onClick={() => { setSelectType('continuous') }}>Continuous</button>}
    </div>

    <div className="h-3"></div>
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        {
          Object.keys(distriConfig).map(item => distriConfig[item].type === selectType && <button key={item}
            className={distr === item ? 'bg-blue-200 dark:text-black' : ''}
            onClick={() => {
              setFailed(false)
              setParams(Object.fromEntries(Object.keys(distriConfig[item].params).map(key => [key, distriConfig[item].params[key].default])))
              setDistr(item)
              setType(selectType)
              toggleTrigger()
            }}>
            {distriConfig[item].name}
          </button>)
        }
      </div>
    </div>
  </div>
}