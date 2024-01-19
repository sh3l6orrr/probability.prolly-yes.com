import { useEffect, useState } from "react";
import StageView from "./StageView";
import { fetchProbability } from "./actions";
import { useProbabilityStore } from "./store";
import distriConfig from "./distrConfig";
import { BlockMath } from "react-katex";

export default function Meta({ pmf }) {
  const { params, distr, trigger, setFailed } = useProbabilityStore()
  const [formulas, setFormulas] = useState({ pdf: '', cdf: '', pmf: '', expectation: '', variance: '' })
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
    data['type'] = pmf ? 'discrete' : 'continuous'
    async function update() {
      setLoading(true)

      const meta = await fetchProbability(data, '/meta')
      alert(JSON.stringify(meta))
      if (meta) setFormulas(meta)
      else setFailed(true)

      setLoading(false)
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])
  return <>
    <StageView title='Meta' loading={loading}>
      <div className="flex flex-col gap-5">
      <div className="flex items-center gap-x-5 flex-wrap">
          <h3>Expectation</h3>
          <BlockMath math={formulas.expectation} />
        </div>
        <div className="flex items-center gap-x-5 flex-wrap">
          <h3>Variance</h3>
          <BlockMath math={formulas.variance} />
        </div>
        <div className="flex items-center gap-x-5 flex-wrap">
          <h3>{pmf ? 'PMF' : 'PDF'}</h3>
          <BlockMath math={pmf ? formulas.pmf : formulas.pdf} />
        </div>
        <div className="flex items-center gap-x-5 flex-wrap">
          <h3>CDF</h3>
          <BlockMath math={formulas.cdf} />
        </div>
      </div>
    </StageView>
  </>

}