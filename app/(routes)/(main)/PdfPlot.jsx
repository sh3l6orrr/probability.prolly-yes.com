import { useEffect } from "react"
import { useProbabilityStore } from "./store";
import { showPdf, showPmf } from "./actions";
import { BlockMath } from 'react-katex'

export default function PdfPlot({ pmf }) {
  const { params, distr, trigger, setFailed } = useProbabilityStore()
  useEffect(() => {
    let formData = new FormData();
    for (const key in params) formData.append(key, params[key])
    formData.append('distr', distr)

    async function update() {
      const pdf = pmf ? await showPmf(formData) : await showPdf(formData)
      if (pdf) await vegaEmbed('#pdf', pdf, { height: 334, actions: false })
      else setFailed(true)
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, distr])

  return <div>
    <h2>{pmf ? 'Probability Mass Function (PMF)' : 'Probability Density Function (PDF)'}</h2>
    <div className="visualization">
      <div>
        <div className='plot' id='pdf' />
      </div>
      <div className="flex">
        <BlockMath math={expr[distr]} />
      </div>
    </div>
  </div>
}

const expr = {
  norm: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x - \\mu)^2}{2\\sigma^2}}',
  t: 'f(t) = \\frac{\\Gamma\\left(\\frac{\\nu + 1}{2}\\right)}{\\sqrt{\\nu \\pi} \\, \\Gamma\\left(\\frac{\\nu}{2}\\right)} \\left(1 + \\frac{t^2}{\\nu}\\right)^{-\\frac{\\nu + 1}{2}}',
  f: 'f(x) = \\frac{\\Gamma\\left(\\frac{d_1 + d_2}{2}\\right)}{\\Gamma\\left(\\frac{d_1}{2}\\right) \\Gamma\\left(\\frac{d_2}{2}\\right)} \\left(\\frac{d_1}{d_2}\\right)^{\\frac{d_1}{2}} \\frac{x^{\\frac{d_1}{2} - 1}}{\\left(1 + \\frac{d_1x}{d_2}\\right)^{\\frac{d_1 + d_2}{2}}}',
  chi2: 'f(x) = \\frac{1}{2^{\\frac{k}{2}} \\Gamma\\left(\\frac{k}{2}\\right)} x^{\\frac{k}{2} - 1} e^{-\\frac{x}{2}}',
  binom: 'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}'
}