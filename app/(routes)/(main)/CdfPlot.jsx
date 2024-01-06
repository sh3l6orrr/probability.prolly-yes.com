import { showCdf } from "./actions";
import distriConfig from "./distrConfig";
import { useProbabilityStore } from "./store";
import { useEffect, useState } from "react";
import { BlockMath, InlineMath } from 'react-katex'
import { Vega } from "react-vega";
import PlotSizeToggler from "./PlotSizeToggler";
import { calcCdf, calcPpf } from "./actions";

export default function CdfPlot() {
  const { params, distr, trigger, setFailed } = useProbabilityStore()
  const [spec, setSpec] = useState({})
  const [thisTrigger, setThisTrigger] = useState(false)
  const [val, setVal] = useState({ cdf: '', ppf: '' })
  const [result, setResult] = useState({ cdf: null, ppf: null })
  const [plotSize, setPlotSize] = useState({
    width: 400,
    height: 300
  })
  useEffect(() => {
    setResult({ cdf: null, ppf: null })
  }, [trigger])

  useEffect(() => {
    const data = {
      distr: {
        name: distr,
        params: params
      },
      size: plotSize
    }
    async function update() {
      const cdf = await showCdf(data)
      if (cdf) setSpec(cdf)
      else setFailed(true)
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, thisTrigger])


  return <div>
    <h2>Cumulative Distribution Function (CDF)</h2>
    <div className="visualization">

      <div className="flex flex-col gap-3">
        <div className="flex gap-5 items-center">
          <h4>Formula</h4>
          <BlockMath math={distriConfig[distr].cdf} />
          <button className='button-secondary' onClick={async () => {
            const textToCopy = distriConfig[distr].cdf
            await navigator.clipboard.writeText(textToCopy)
          }}> Copy </button>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <h4>Calculate</h4>
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
              const res = await calcCdf(data)
              if (res) setResult({ ...result, cdf: { x: val.cdf, y: res.val } })
            }}>
              <InlineMath math={'x = '} />
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
              const res = await calcPpf(data)
              if (res) setResult({ ...result, ppf: { x: val.ppf, y: res.val } })
            }}>
              <InlineMath math={'F(x) = '} />
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
      <div>
        <Vega className='plot' spec={spec} actions={false} />
      </div>
    </div>
  </div>

}