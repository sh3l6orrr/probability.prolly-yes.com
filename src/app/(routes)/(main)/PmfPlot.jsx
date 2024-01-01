import { useEffect } from "react"
import { useProbabilityStore } from "./store";
import { showPmf } from "./actions";

export default function PmfPlot() {
  const { params, distr } = useProbabilityStore()
  useEffect(() => {
    let formData = new FormData();
    for (const key in params) formData.append(key, params[key])
    formData.append('distr', distr)

    async function update() {
      const pmf = await showPmf(formData)
      if (pmf) await vegaEmbed('#pmf', pmf, { height: 334 })

    }
    update()
  }, [params, distr])

  return <div>
    <h2>Probability Mass Function (PMF)</h2>
    <div className="bg-neutral-100 dark:bg-black rounded-2xl p-6 shadow-lg">
      <div id='pmf' />
    </div>
  </div>
}