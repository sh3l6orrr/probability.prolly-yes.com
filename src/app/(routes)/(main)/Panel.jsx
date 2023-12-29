import { useProbabilityStore } from "./store"

export default function Panel() {
  const { distr, params } = useProbabilityStore()
  return <div className="border-b p-8">
    <h2>{distr}({Object.keys(params).map(key => {
      return key + ':' + params[key]
    }).join(', ')})</h2>
  </div>
}