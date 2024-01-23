'use client'

import ShowUtilities from "./ShowUtilities"
import ParametersSelector from "./ParametersSelector"
import DistributionSelector from "./DistributionSelector"
import Panel from "./Panel"
import { useState, useRef, useEffect } from "react"

export default function Settings() {
  const [showSettings, setShowSettings] = useState(false)
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
      <div className="relative">
        <Panel />
        <div className="absolute right-8 top-7">
          <button onClick={() => setShowSettings(showSettings ? false : true)}>⚙︎ Configure</button>
        </div>
      </div>
      {showSettings && <div>
        <DistributionSelector />
        <ParametersSelector />
        <ShowUtilities />
      </div>}
    </div>

    <div className="hidden md:block">
      <Panel />
      <DistributionSelector />
      <ParametersSelector />
      <ShowUtilities />
    </div>
  </div>

}