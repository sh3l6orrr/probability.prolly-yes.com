import { useEffect, useState } from "react"
import { useProbabilityStore } from "./store";
import { calcPdf, showPdf, showPdfFormula, showPmf } from "./actions";
import { BlockMath, InlineMath } from 'react-katex'
import distriConfig from "./distrConfig";
import { Vega } from 'react-vega';
import PlotSizeToggler from "./PlotSizeToggler";

export default function PdfPlot({ pmf }) {
  const { params, distr, trigger, setFailed } = useProbabilityStore()
  const [thisTrigger, setThisTrigger] = useState(false)
  const [spec, setSpec] = useState({})
  const [formula, setFormula] = useState('')
  const [val, setVal] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [plotRange, setPlotRange] = useState({ x: { min: -10, max: 10 }, y: { min: 0, max: 1 } })
  const [plotSize, setPlotSize] = useState({ width: 360, height: 300 })
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (copied) {
      const timeoutId = setTimeout(() => {
        setCopied(false);
      }, 3000)
      return () => clearTimeout(timeoutId);
    }

  }, [copied])
  useEffect(() => {
    setResult(null)
  }, [trigger])

  useEffect(() => {

    let data = {
      distr: {
        name: distr,
        params: params
      },
      range: plotRange,
      size: plotSize
    }

    let sympyParams = {}
    Object.keys(params).forEach((key) => {
      const newKey = distriConfig[distr]['sympy']['params'][key] || key;
      sympyParams[newKey] = params[key];
    })
    data['sympy'] = {
      name: distriConfig[distr]['sympy']['name'],
      params: sympyParams
    }

    async function update() {
      setLoading(true)
      const pdf = pmf ? await showPmf(data) : await showPdf(data)
      const formula = await showPdfFormula(data)
      if (pdf) {
        setSpec(pdf)
        setFormula(formula)
      }
      else setFailed(true)
      setLoading(false)
    }
    update()


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, thisTrigger])


  return <div>
    <h2>{pmf ? 'Probability Mass Function (PMF)' : 'Probability Density Function (PDF)'} {loading && <i>- Loading</i>}</h2>
    <div className="visualization">

      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-x-5 flex-wrap">
          <h4>Formula</h4>
          <div className="overflow-y-scroll max-w-96">
            <BlockMath math={formula.length < 200 && formula !== 'timeout' ? `f(${pmf ? 'k' : 'x'}) = ${formula}` : 'Unable\\ to\\ display'} />
          </div>

          <button className='button-secondary' onClick={async () => {
            setCopied(true)
            const textToCopy = formula
            await navigator.clipboard.writeText(textToCopy)
          }}> {copied ? '✅' : 'Copy'} </button>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <h4>Evaluate</h4>
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
            <InlineMath math={pmf ? 'k = ' : 'x = '} />
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
          <h4>Range</h4>
          <div className="flex flex-col gap-1 w-60">
            <div className="flex items-center">
              X
              <div className="w-5" />
              <input type='range' min='-10' max='10' className="w-16" value={plotRange.x.min}
                onChange={e => setPlotRange({ ...plotRange, x: { ...plotRange.x, min: e.target.value } })}
                onMouseUp={e => setThisTrigger(!thisTrigger)} required />
              <div className="grow text-center">
                {plotRange.x.min} to {plotRange.x.max}
              </div>
              <input type='range' min='-10' max='10' className="w-16" value={plotRange.x.max}
                onChange={e => setPlotRange({ ...plotRange, x: { ...plotRange.x, max: e.target.value } })}
                onMouseUp={e => setThisTrigger(!thisTrigger)} required />
            </div>
            {!pmf && <div className="flex item-center">
              Y
              <div className="w-5" />
              <input type='range' min='0' max='10' className="w-16" value={plotRange.y.min}
                onChange={e => setPlotRange({ ...plotRange, y: { ...plotRange.y, min: e.target.value } })}
                onMouseUp={e => setThisTrigger(!thisTrigger)} required />
              <div className="grow text-center">
                {plotRange.y.min} to {plotRange.y.max}
              </div>

              <input type='range' min='0' max='10' className="w-16" value={plotRange.y.max}
                onChange={e => setPlotRange({ ...plotRange, y: { ...plotRange.y, max: e.target.value } })}
                onMouseUp={e => setThisTrigger(!thisTrigger)} required />
            </div>}
          </div>
          <button type='submit' className="button-secondary md:hidden">Apply</button>
        </form>


        <PlotSizeToggler setPlotSize={setPlotSize} thisTrigger={thisTrigger} plotSize={plotSize} setThisTrigger={setThisTrigger} />
      </div>

      <div className="shrink-0 overflow-scroll">
        <Vega className='plot' spec={spec} actions={false} />
      </div>
    </div>
  </div>
}