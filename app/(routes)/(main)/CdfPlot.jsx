import { showCdf } from "./actions";
import distriConfig from "./distrConfig";
import { useProbabilityStore } from "./store";
import { useEffect, useState } from "react";
import { BlockMath } from 'react-katex'
import { Vega } from "react-vega";

export default function CdfPlot() {
  const { params, distr, trigger, setFailed } = useProbabilityStore()
  const [spec, setSpec] = useState({})
  const [thisTrigger, setThisTrigger] = useState(false)
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
        </div>
        <form className="flex items-center gap-5 flex-wrap">
          <h4>Plot Size</h4>

          <div className="flex gap-5 items-center">
            Width
            <input type="range" min='250' max='500' className="w-16" value={plotSize.width}
              onChange={e => setPlotSize({ ...plotSize, width: e.target.value })} onMouseUp={() => setThisTrigger(!thisTrigger)} />
            Height
            <input type="range" min='250' max='500' className="w-16" value={plotSize.height}
              onChange={e => setPlotSize({ ...plotSize, height: e.target.value })} onMouseUp={() => setThisTrigger(!thisTrigger)} />
          </div>
        </form>
      </div>
      <div>
        <Vega className='plot' spec={spec} actions={false} />
      </div>
    </div>
  </div>

}