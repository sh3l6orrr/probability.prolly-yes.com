import { useEffect, useState } from "react"
import { useProbabilityStore } from "./store";
import { showPdf, showPmf } from "./actions";
import { BlockMath } from 'react-katex'
import distriConfig from "./distrConfig";

export default function PdfPlot({ pmf }) {
  const { params, distr, trigger, setFailed, pdfPlotRange, setPdfPlotRange } = useProbabilityStore()
  const [pdfTrigger, setPdfTrigger] = useState(false)
  useEffect(() => {
    const data = {
      distr: {
        name: distr,
        params: params
      },
      range: pdfPlotRange
    }

    async function update() {
      const pdf = pmf ? await showPmf(data) : await showPdf(data)
      if (pdf) await vegaEmbed('#pdf', pdf, { height: 334, actions: false })
      else setFailed(true)
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, pdfTrigger])

  return <div>
    <h2>{pmf ? 'Probability Mass Function (PMF)' : 'Probability Density Function (PDF)'}</h2>
    <div className="visualization">

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-5">
          <h4>Formula</h4>
          <BlockMath math={distriConfig[distr].pdf} />
        </div>

        <form className="flex items-center gap-5 flex-wrap" onSubmit={e => {
          e.preventDefault()
          setPdfTrigger(!pdfTrigger)
        }}>
          <h4>Axes Range</h4>
          <div className="flex flex-col gap-1">
            <div className="flex gap-5">
              <h4>X</h4>
              <input type="number" step='0.001' className="w-16" value={pdfPlotRange.x.min}
                onChange={e => setPdfPlotRange({ ...pdfPlotRange, x: { ...pdfPlotRange.x, min: e.target.value } })} /> to
              <input type="number" step='0.001' className="w-16" value={pdfPlotRange.x.max}
                onChange={e => setPdfPlotRange({ ...pdfPlotRange, x: { ...pdfPlotRange.x, max: e.target.value } })} />
            </div>
            <div className="flex gap-5">
              <h4>Y</h4>
              <input type="number" step='0.001' className="w-16" value={pdfPlotRange.y.min}
                onChange={e => setPdfPlotRange({ ...pdfPlotRange, y: { ...pdfPlotRange.y, min: e.target.value } })} /> to
              <input type="number" step='0.001' className="w-16" value={pdfPlotRange.y.max}
                onChange={e => setPdfPlotRange({ ...pdfPlotRange, y: { ...pdfPlotRange.y, max: e.target.value } })} />
            </div>
          </div>

          <button type='submit'>Apply</button>
        </form>
      </div>
      <div>
        <div className='plot' id='pdf' />
      </div>
    </div>
  </div>
}