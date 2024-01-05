import { useEffect, useState } from "react"
import { useProbabilityStore } from "./store";
import { showPdf, showPmf } from "./actions";
import { BlockMath } from 'react-katex'
import distriConfig from "./distrConfig";
import { Vega } from 'react-vega';
import PlotSizeToggler from "./PlotSizeToggler";

export default function PdfPlot({ pmf }) {
  const { params, distr, trigger, setFailed } = useProbabilityStore()
  const [thisTrigger, setThisTrigger] = useState(false)
  const [spec, setSpec] = useState({})
  const [plotRange, setPlotRange] = useState({
    x: {
      min: -5,
      max: 5
    },
    y: {
      min: 0,
      max: 1
    }
  })
  const [plotSize, setPlotSize] = useState({
    width: 400,
    height: 300
  })
  useEffect(() => {
    const data = {
      distr: {
        name: distr,
        params: params
      },
      range: plotRange,
      size: plotSize
    }

    async function update() {
      const pdf = pmf ? await showPmf(data) : await showPdf(data)
      if (pdf) setSpec(pdf)
      else setFailed(true)
    }
    update()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, thisTrigger])


  return <div>
    <h2>{pmf ? 'Probability Mass Function (PMF)' : 'Probability Density Function (PDF)'}</h2>
    <div className="visualization">

      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-5 flex-wrap">
          <h4>Formula</h4>
          <BlockMath math={distriConfig[distr].pdf} />
        </div>

        <form className="flex items-center gap-5 flex-wrap" onSubmit={e => {
          e.preventDefault()
          setThisTrigger(!thisTrigger)
        }}>
          <h4>Axes Range</h4>
          <div className="flex flex-col gap-1">
            <div className="flex gap-5">
              X
              <input type="number" step='0.001' className="w-16" value={plotRange.x.min}
                onChange={e => setPlotRange({ ...plotRange, x: { ...plotRange.x, min: e.target.value } })} /> to
              <input type="number" step='0.001' className="w-16" value={plotRange.x.max}
                onChange={e => setPlotRange({ ...plotRange, x: { ...plotRange.x, max: e.target.value } })} />
            </div>
            {!pmf && <div className="flex gap-5">
              Y
              <input type="number" step='0.001' className="w-16" value={plotRange.y.min}
                onChange={e => setPlotRange({ ...plotRange, y: { ...plotRange.y, min: e.target.value } })} /> to
              <input type="number" step='0.001' className="w-16" value={plotRange.y.max}
                onChange={e => setPlotRange({ ...plotRange, y: { ...plotRange.y, max: e.target.value } })} />
            </div>}
          </div>
          <button type='submit' className="button-secondary">Apply</button>
        </form>
        <div className="grow" />
        <PlotSizeToggler setPlotSize={setPlotSize} thisTrigger={thisTrigger} plotSize={plotSize} setThisTrigger={setThisTrigger} />

      </div>
      <div className="overflow-auto">
        <Vega className='plot' spec={spec} actions={false} />
      </div>
    </div>
  </div>
}