'use client'

import { useProbabilityStore } from "./store"
import { useEffect } from "react"
import { getMoments } from "./actions"

export default function Moments() {
  const { moments, setMoments, rerender, params, distr} = useProbabilityStore()
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
  }, [rerender])
  return <>
    <h2>Moments</h2>
    <div className="
     bg-neutral-100 dark:bg-black
      w-full rounded-2xl p-6">
      <div className="flex justify-between">
        <div>
          Mean
          <h3>{moments.mean}</h3>
        </div>
        <div>
          Variance
          <h3>{moments.variance}</h3>
        </div>
        <div>
          Skewness
          <h3>{moments.skewness}</h3>
        </div>
        <div>
          Kurtosis
          <h3>{moments.kurtosis}</h3>
        </div>
      </div>
    </div>


  </>
}