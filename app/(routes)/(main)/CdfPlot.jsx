import distriConfig from "./distrConfig";
import { useProbabilityStore } from "./store";
import { useEffect, useState } from "react";
import { BlockMath, InlineMath } from 'react-katex'
import { Vega } from "react-vega";
import PlotSizeToggler from "./PlotSizeToggler";
import { fetchProbability } from "./actions";

export default function CdfPlot({ pmf }) {
  const { params, distr, trigger, setFailed } = useProbabilityStore()
  const [spec, setSpec] = useState({})
  const [thisTrigger, setThisTrigger] = useState(false)
  const [val, setVal] = useState({ cdf: '', ppf: '' })
  const [result, setResult] = useState({ cdf: null, ppf: null })
  const [formula, setFormula] = useState('')
  const [loading, setLoading] = useState(true)
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
    setResult({ cdf: null, ppf: null })
  }, [trigger])
  useEffect(() => {

    let data = {
      distr: {
        name: distr,
        params: params
      },
      size: plotSize
    }
    if (!pmf) {
      let sympyParams = {}
      Object.keys(params).forEach((key) => {
        const newKey = distriConfig[distr]['sympy']['params'][key] || key;
        sympyParams[newKey] = params[key];
      })
      data['sympy'] = {
        name: distriConfig[distr]['sympy']['name'],
        params: sympyParams
      }
    }

    async function update() {
      setLoading(true)
      const cdf = await fetchProbability(data, '/cdf/plot')
      const formula = await fetchProbability(data, '/cdf/formula')
      if (cdf) {
        setSpec(cdf)
        setFormula(formula.formula)
      }
      else setFailed(true)
      setLoading(false)
    }
    update()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, thisTrigger])


  return <div>
    <h2>Cumulative Distribution Function (CDF) {loading && <i>- Loading</i>} </h2>
    <div className="visualization">

      <div className="flex flex-col gap-3">
        {!pmf && <div className="flex gap-5 items-center flex-wrap">
          <h4>Formula</h4>
          <div className="overflow-scroll max-w-96">
            <BlockMath math={formula.length < 200 && formula !== 'timeout' ? `F(${pmf ? 'k' : 'x'}) = ${formula}` : 'Unable\\ to\\ display'} />
          </div>

          <button className='button-secondary' onClick={async () => {
            setCopied(true)
            const textToCopy = formula
            await navigator.clipboard.writeText(textToCopy)
          }}> {copied ? '✅' : 'Copy'} </button>
        </div>}
        <div className="flex items-center gap-5 flex-wrap">
          <h4>Evaluate</h4>
          <div className="flex flex-col gap-1">
            <form className="flex gap-2 items-center" onSubmit={async e => {
              e.preventDefault()
              const data = {
                distr: {
                  name: distr,
                  params: params
                },
                x: parseFloat(val.cdf)
              }
              const res = await fetchProbability(data, '/cdf/calc')
              if (res) setResult({ ...result, cdf: { x: val.cdf, y: res.val } })
            }}>
              <InlineMath math={pmf ? 'k = ' : 'x ='} />
              <input type='number' step='0.001' className="w-16" name='cdf' value={val.cdf}
                onChange={e => setVal({ ...val, cdf: e.target.value })} required />
              <button type='submit' className="button-secondary">Apply</button>
              {result.cdf && <InlineMath math={`F(${result.cdf.x}) = ${result.cdf.y}`} />}
            </form>
            <form className="flex gap-2 items-center" onSubmit={async e => {
              e.preventDefault()
              const data = {
                distr: {
                  name: distr,
                  params: params
                },
                x: parseFloat(val.ppf)
              }
              const res = await fetchProbability(data, '/ppf/calc')
              if (res) setResult({ ...result, ppf: { x: val.ppf, y: res.val } })
            }}>
              <InlineMath math={pmf ? 'F(k) = ' : 'F(x) = '} />
              <input type='number' step='0.001' className="w-16" name='ppf' value={val.ppf}
                onChange={e => setVal({ ...val, ppf: e.target.value })} required />
              <button type='submit' className="button-secondary">Apply</button>
              {result.ppf && <InlineMath math={`x = ${result.ppf.y}`} />}
            </form>

          </div>
        </div>
        <div className="grow" />
        <PlotSizeToggler setPlotSize={setPlotSize} thisTrigger={thisTrigger} plotSize={plotSize} setThisTrigger={setThisTrigger} />

      </div>
      <div className="shrink-0 overflow-scroll">
        <Vega className='plot' spec={spec} actions={false} />
      </div>
    </div>
  </div>

}