'use client'

import { useProbabilityStore } from "./store"

export default function Moments() {
  const { moments } = useProbabilityStore()

  return <div>
    <h2>Moments</h2>
    <div className="
     bg-neutral-100 dark:bg-black shadow-lg
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
  </div>
}