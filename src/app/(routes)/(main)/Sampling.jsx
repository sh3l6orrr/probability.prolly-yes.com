import { useEffect } from "react"
import { useProbabilityStore } from "./store"
import { getSampling } from "./actions"

export default function Sampling() {
  const { nSample, setNSample, distr, params } = useProbabilityStore()
  useEffect(() => {
    let formData = new FormData();
    for (const key in params) formData.append(key, params[key])
    formData.append('distr', distr)

    async function update() {
      const newformData = formData
      newformData.append('n_sample', nSample)
      const sampling = await getSampling(newformData)
      if (sampling) {
        await vegaEmbed('#sampling', sampling.hist, { height: 334 })
        document.getElementById('sample').textContent = sampling.sample.join(', ')
      }
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nSample, distr, params])
  return <div>
    <h2>Sampling From the Distribution</h2>
    <div className="bg-neutral-100 dark:bg-black rounded-2xl p-6 shadow-lg flex justify-between gap-3 flex-col md:flex-row">
      <div id='sampling' />
      <div className="flex flex-col gap-3 w-full max-h-96">

          #Samples: 
          <input className='w-32' name='nSample' maxLength="4" value={nSample} onChange={e => setNSample(e.target.value)} />

          Samples generated: 
          <p className='overflow-y-scroll h-full' id='sample' />

      </div>
    </div>
  </div>
}