import { showCdf } from "./actions";
import { useProbabilityStore } from "./store";
import { useEffect } from "react";
import { BlockMath } from 'react-katex'

export default function CdfPlot() {
  const { params, distr, trigger, setFailed } = useProbabilityStore()
  useEffect(() => {
    let formData = new FormData();
    for (const key in params) formData.append(key, params[key])
    formData.append('distr', distr)

    async function update() {
      const cdf = await showCdf(formData)
      if (cdf) await vegaEmbed('#cdf', cdf, { height: 334, actions: false })
      else setFailed(true)
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, distr])

  return <div>
    <h2>Cumulative Distribution Function (CDF)</h2>
    <div className="visualization">
      <div>
        <div className='plot' id='cdf' />
      </div>
      <div className="flex">
        <BlockMath math={expr[distr]} />
      </div>
    </div>
  </div>

}

const expr = {
  norm: "F(x) = \\frac{1}{2} \\left[1 + \\text{erf}\\left(\\frac{x - \\mu}{\\sigma \\sqrt{2}}\\right)\\right]",
  t: "F(x) =\\frac{1}{2} + \\frac{1}{2} \\cdot \\text{sgn}(t) \\cdot I_{\\frac{\\nu}{2}, \\frac{1}{2}}\\left(\\frac{\\nu}{1 + t^2}\\right)",
  chi2: "F(x) =\\gamma\\left(\\frac{k}{2}, \\frac{x}{2}\\right)",
  f: "F(x) = I_{\\frac{d_1}{2}, \\frac{d_2}{2}}\\left(\\frac{d_1 x}{d_1 x + d_2}\\right)",
  binom: "P(X \\leq k) = \\sum_{i=0}^{k} \\binom{n}{i} p^i (1-p)^{n-i}"
}

