import { useEffect, useState } from "react"
import { useProbabilityStore } from "./store";
import { calcPdf, showPdf, showPmf } from "./actions";
import { BlockMath, InlineMath } from 'react-katex'
import distriConfig from "./distrConfig";
import { Vega } from 'react-vega';
import PlotSizeToggler from "./PlotSizeToggler";

export default function PdfPlot({ pmf }) {
  const { params, distr, trigger, setFailed } = useProbabilityStore()
  const [thisTrigger, setThisTrigger] = useState(false)
  const [spec, setSpec] = useState({})
  const [val, setVal] = useState('')
  const [result, setResult] = useState(null)
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
    width: 360,
    height: 300
  })
  useEffect(() => {
    setResult(null)
  }, [trigger])

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
          <button className='button-secondary' onClick={async () => {
            const textToCopy = distriConfig[distr].pdf
            await navigator.clipboard.writeText(textToCopy)
          }}> Copy </button>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <h4>Calculate</h4>
          <form className="flex gap-2 items-center" onSubmit={async e => {
            e.preventDefault()
            const data = {
              distr: {
                name: distr,
                params: params
              },
              x: parseFloat(val)
            }
            const res = await calcPdf(data)
            if (res) setResult({ x: val, y: res.val })
          }}>
            <InlineMath math={'x = '} />
            <input type='number' step='0.001' className="w-16" name='val' value={val}
              onChange={e => setVal(e.target.value)} required />
            <button type='submit' className="button-secondary">Apply</button>
          </form>
          {result && <InlineMath math={`f(${result.x}) = ${result.y}`} />}
        </div>
        <div className="grow" />
        <form className="flex items-center gap-5 flex-wrap" onSubmit={e => {
          e.preventDefault()
          setThisTrigger(!thisTrigger)
        }}>
          <h4>Axes Range</h4>
          <div className="flex flex-col gap-1">
            <div className="flex gap-5">
              X
              <input type="number" step='0.001' className="w-16" value={plotRange.x.min}
                onChange={e => setPlotRange({ ...plotRange, x: { ...plotRange.x, min: e.target.value } })} required /> to
              <input type="number" step='0.001' className="w-16" value={plotRange.x.max}
                onChange={e => setPlotRange({ ...plotRange, x: { ...plotRange.x, max: e.target.value } })} required />
            </div>
            {!pmf && <div className="flex gap-5">
              Y
              <input type="number" step='0.001' className="w-16" value={plotRange.y.min}
                onChange={e => setPlotRange({ ...plotRange, y: { ...plotRange.y, min: e.target.value } })} required /> to
              <input type="number" step='0.001' className="w-16" value={plotRange.y.max}
                onChange={e => setPlotRange({ ...plotRange, y: { ...plotRange.y, max: e.target.value } })} required />
            </div>}
          </div>
          <button type='submit' className="button-secondary">Apply</button>
        </form>


        <PlotSizeToggler setPlotSize={setPlotSize} thisTrigger={thisTrigger} plotSize={plotSize} setThisTrigger={setThisTrigger} />
      </div>

      <div className="overflow-auto">
        <Vega className='plot' spec={spec} actions={false} />
      </div>
    </div>
  </div>
}