import { useEffect } from "react"
import { useProbabilityStore } from "./store";
import { showPdf } from "./actions";

export default function PdfPlot() {
  const { params, distr, trigger, setFailed } = useProbabilityStore()
  useEffect(() => {
    let formData = new FormData();
    for (const key in params) formData.append(key, params[key])
    formData.append('distr', distr)

    async function update() {
      const pdf = await showPdf(formData)
      if (pdf) await vegaEmbed('#pdf', pdf, { height: 334 })
      else setFailed(true)

    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, distr])

  return <div>
    <h2>Probability Density Function (PDF)</h2>
    <div className="bg-neutral-100 dark:bg-black rounded-2xl p-6 shadow-lg">
      <div id='pdf' />
    </div>
  </div>
}