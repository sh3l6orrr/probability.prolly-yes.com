'use client'

import distriConfig from "./distrConfig"
import { useProbabilityStore } from "./store"
import { BlockMath } from 'react-katex'

export default function Panel() {
  const { distr, params, failed } = useProbabilityStore()
  return <div className="border-b px-8 py-1 md:py-4 flex justify-between items-center">
    <BlockMath math={`X \\sim ${distriConfig[distr].label}(${Object.keys(params).map(key => params[key]).join(', ')})`} />
    {failed && <span className="text-sm"> ❌</span>}
  </div>
}
