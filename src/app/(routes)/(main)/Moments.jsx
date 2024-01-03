import { useProbabilityStore } from "./store"
import { useEffect, useState } from "react"
import { getMoments } from "./actions"

export default function Moments() {
  const { params, distr, trigger } = useProbabilityStore()
  const [moments, setMoments] = useState({ mean: 0, variance: 1, skewness: 0, kurtosis: 0 })
  useEffect(() => {
    let formData = new FormData();
    for (const key in params) formData.append(key, params[key])
    formData.append('distr', distr)

    async function update() {
      const moments = await getMoments(formData)
      if (moments) setMoments(moments)
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, distr])
  return <div>
    <h2>Moments</h2>
    <div className="bg-neutral-100 dark:bg-black shadow-lg rounded-2xl p-6">
      <div className="flex gap-5">
        <div className="flex px-4 items-center gap-2">
          Mean
          <h2>{moments.mean}</h2>
        </div>
        <div className="flex px-4 items-center gap-2">
          Variance
          <h2>{moments.variance}</h2>
        </div>
        <div className="flex px-4 items-center gap-2">
          Skewness
          <h2>{moments.skewness}</h2>
        </div>
        <div className="flex px-4 items-center gap-2">
          Kurtosis
          <h2>{moments.kurtosis}</h2>
        </div>
      </div>
    </div>
  </div>
}