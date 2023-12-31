import { showCdf } from "./actions";
import { useProbabilityStore } from "./store";
import { useEffect } from "react";

export default function CdfPlot() {
  const { params, distr } = useProbabilityStore()
  useEffect(() => {
    let formData = new FormData();
    for (const key in params) formData.append(key, params[key])
    formData.append('distr', distr)

    async function update() {
      const cdf = await showCdf(formData)
      if (cdf) await vegaEmbed('#cdf', cdf)

    }
    update()
  }, [params, distr])

  return <div>
    <h2>Cumulative Distribution Function (CDF)</h2>
    <div className="bg-neutral-100 dark:bg-black rounded-2xl p-6 shadow-lg h-104">
      <div id='cdf' />
    </div>
  </div>

}