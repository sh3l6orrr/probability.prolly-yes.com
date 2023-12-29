'use client'

import { useProbabilityStore } from "./store"

export default function Moments() {
  const { moments } = useProbabilityStore()

  return <div>
    <h2>Moments</h2>
    <div className="
     bg-neutral-100 dark:bg-black shadow-lg
      w-full rounded-2xl p-6">
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