'use client'

import ShowUtilities from "./ShowUtilities"
import ParametersSelector from "./ParametersSelector"
import DistributionSelector from "./DistributionSelector"
import Panel from "./Panel"
import { useState, useRef, useEffect } from "react"

export default function Settings() {
  const [showSettings, setShowSettings] = useState(null)
  const ref = useRef(null)
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setShowSettings(false)
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref, setShowSettings])

  return <div>
    <div className="md:hidden" ref={ref}>

      <Panel />
      <div className="flex border-b px-8 py-4 flex-wrap gap-3 items-center">
        <span>Configure</span>
        <button className={showSettings === 'distribution' ? 'bg-blue-200 dark:text-black' : ''} onClick={() => setShowSettings(showSettings === 'distribution' ? null : 'distribution')}>Distribution</button>
        <button className={showSettings === 'parameters' ? 'bg-blue-200 dark:text-black' : ''} onClick={() => setShowSettings(showSettings === 'parameters' ? null : 'parameters')}>Parameters</button>
        <button className={showSettings === 'utilities' ? 'bg-blue-200 dark:text-black' : ''} onClick={() => setShowSettings(showSettings === 'utilities' ? null : 'utilities')}>Show Utilities</button>
      </div>
      <div>
        {showSettings === 'distribution' && <DistributionSelector />}
        {showSettings === 'parameters' && <ParametersSelector />}
        {showSettings === 'utilities' && <ShowUtilities />}
      </div>
    </div>

    <div className="hidden md:block">
      <Panel />
      <DistributionSelector />
      <ParametersSelector />
      <ShowUtilities />
    </div>
  </div>

}