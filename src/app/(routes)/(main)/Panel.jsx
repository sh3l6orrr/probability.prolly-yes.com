import { useProbabilityStore } from "./store"

export default function Panel() {
  const { distr, params, failed } = useProbabilityStore()
  return <div className="border-b p-8 flex justify-between items-center">
    <h2>{distr}({Object.keys(params).map(key => {
      return key + ':' + params[key]
    }).join(', ')})</h2>


    {failed && <span className="text-sm"> ❌</span>}

  </div>
}