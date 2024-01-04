import { useProbabilityStore } from "./store"
import { BlockMath } from 'react-katex'

export default function Panel() {
  const { distr, params, failed } = useProbabilityStore()
  return <div className="border-b p-8 flex justify-between items-center">
    <BlockMath math={`X \\sim ${symbol[distr]}(${Object.keys(params).map(key => params[key]).join(', ')})`} />
    {failed && <span className="text-sm"> ❌</span>}

  </div>
}

const symbol = {
  norm: '\\mathcal{N}',
  f: 'F',
  chi2: '\\chi^2',
  t: 't',
  binom: 'B'
}