import { useProbabilityStore } from "./store"
import { useEffect } from "react"
import { getMoments } from "./actions"

export default function Moments() {
  const { params, distr, setMoments, moments } = useProbabilityStore()
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
  }, [params, distr])
  return <div>
    <h2>Moments</h2>
    <div className="bg-neutral-100 dark:bg-black shadow-lg rounded-2xl p-6">
      <div className="grid grid-cols-4 justify-items-center text-center">
        <div>
          <i>Mean</i>
          <h2>{moments.mean}</h2>
        </div>
        <div>
          <i>Variance</i>
          <h2>{moments.variance}</h2>
        </div>
        <div>
          <i>Skewness</i>
          <h2>{moments.skewness}</h2>
        </div>
        <div>
          <i>Kurtosis</i>
          <h2>{moments.kurtosis}</h2>
        </div>
      </div>
    </div>
  </div>
}