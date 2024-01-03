import { useEffect } from "react"
import { useProbabilityStore } from "./store";
import { showPdf } from "./actions";
import { BlockMath } from 'react-katex'

export default function PdfPlot() {
  const { params, distr, trigger, setFailed } = useProbabilityStore()
  useEffect(() => {
    let formData = new FormData();
    for (const key in params) formData.append(key, params[key])
    formData.append('distr', distr)

    async function update() {
      const pdf = await showPdf(formData)
      if (pdf) await vegaEmbed('#pdf', pdf, { height: 334, actions: false })
      else setFailed(true)

    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, distr])

  return <div>
    <h2>Probability Density Function (PDF)</h2>
    <div className="visualization">
      <div className='plot' id='pdf' />
      <BlockMath math={`f(x) = 12`} />
    </div>
  </div>
}

const expr = {
  norm: 1
}