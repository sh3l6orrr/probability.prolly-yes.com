import { useEffect, useState } from "react";
import StageView from "./StageView";
import { fetchProbability } from "./actions";
import { useProbabilityStore } from "./store";
import distriConfig from "./distrConfig";
import { BlockMath } from "react-katex";

export default function Meta({ pmf }) {
  const { params, distr, trigger } = useProbabilityStore()
  const [formulas, setFormulas] = useState({ pdf: '', cdf: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let data = {}
    let sympyParams = {}
    Object.keys(params).forEach((key) => {
      const newKey = distriConfig[distr]['sympy']['params'][key]
      sympyParams[newKey] = distriConfig[distr]['params'][key]['label']
    })
    data['sympy'] = {
      name: distriConfig[distr]['sympy']['name'],
      params: sympyParams
    }
    async function update() {
      setLoading(true)

      const pdf = await fetchProbability(data, '/pdf/formula/meta')
      const cdf = await fetchProbability(data, '/cdf/formula/meta')
      if (pdf && pdf.formula !== 'timeout' && pdf.formula.length < 250) setFormulas({ ...formulas, pdf: `f(${pmf ? 'k' : 'x'}) = ${pdf.formula}` })
      else setFormulas({ ...formulas, pdf: 'Unable\\ to\\ display' })

      if (cdf && cdf.formula !== 'timeout' && cdf.formula.length < 250) setFormulas({ ...formulas, cdf: `F(${pmf ? 'k' : 'x'}) = ${cdf.formula}` })
      else setFormulas({ ...formulas, cdf: 'Unable\\ to\\ display' })

      setLoading(false)
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])
  return <>
    <StageView title='Meta' loading={loading}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-x-5 flex-wrap">
          <h3>{pmf ? 'PMF' : 'PDF'}</h3>
          <BlockMath math={formulas.pdf} />
        </div>
        <div className="flex items-center gap-x-5 flex-wrap">
          <h3>CDF</h3>
          <BlockMath math={formulas.cdf} />
        </div>
      </div>
    </StageView>
  </>

}