import { showCdf } from "./actions";
import distriConfig from "./distrConfig";
import { useProbabilityStore } from "./store";
import { useEffect } from "react";
import { BlockMath } from 'react-katex'

export default function CdfPlot() {
  const { params, distr, trigger, setFailed } = useProbabilityStore()
  useEffect(() => {
    const data = {
      distr: { 
        name: distr, 
        params: params
      }
    }
    async function update() {
      const cdf = await showCdf(data)
      if (cdf) await vegaEmbed('#cdf', cdf, { height: 334, actions: false })
      else setFailed(true)
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  return <div>
    <h2>Cumulative Distribution Function (CDF)</h2>
    <div className="visualization">

      <div className="flex">
        <BlockMath math={distriConfig[distr].cdf} />
      </div>
      <div>
        <div className='plot' id='cdf' />
      </div>
    </div>
  </div>

}