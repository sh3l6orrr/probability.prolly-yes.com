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
        await vegaEmbed('#sampling', sampling.hist)
        document.getElementById('sample').textContent = sampling.sample.join(', ')
      }
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nSample])
  return <div>
    <h2>Sampling From the Distribution</h2>
    <div className="bg-neutral-100 dark:bg-black rounded-2xl p-6 shadow-lg h-104 flex justify-between gap-3">
      <div id='sampling' />
      <div className="flex flex-col gap-3">

          #Samples: 
          <input name='nSample' maxLength="6" value={nSample} onChange={e => setNSample(e.target.value)} />

          Samples generated: 
          <p className='overflow-y-scroll' id='sample' />

      </div>
    </div>
  </div>
}