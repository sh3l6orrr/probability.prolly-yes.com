import { useProbabilityStore } from "./store"
import { useEffect, useState } from "react"
import { getMoments } from "./actions"
import { InlineMath } from 'react-katex'

export default function Moments() {
  const { params, distr, trigger, setFailed } = useProbabilityStore()
  const [moments, setMoments] = useState({ mean: 0, variance: 1, skewness: 0, kurtosis: 0 })
  const [support, setSupport] = useState('')
  useEffect(() => {
    const data = {
      distr: {
        name: distr,
        params: params
      }
    }
    async function update() {
      const moments = await getMoments(data)
      if (moments) {
        setMoments(moments.moments)
        setSupport(moments.support)
      }
      else setFailed(true)
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  return <div>
    <h2>General</h2>
    <div className="visualization">
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-x-8 gap-y-3 items-center">
          <h4>Support</h4>
          <InlineMath math={support.replace(/inf/g, '\\infty')} />
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 items-center">
          <h4>Moments</h4>
          <InlineMath math={`E(X) = ${moments.mean}`} />
          <InlineMath math={`Var(X) = ${moments.variance}`} />
          <InlineMath math={`Skew(X) = ${moments.skewness}`} />
          <InlineMath math={`Kurt(X) = ${moments.kurtosis}`} />
        </div>
      </div>

    </div>
  </div>
}