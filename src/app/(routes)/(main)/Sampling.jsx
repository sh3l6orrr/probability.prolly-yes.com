import { useEffect, useState } from "react"
import { useProbabilityStore } from "./store"
import { getSampling } from "./actions"

export default function Sampling() {
  const { nSample, setNSample, distr, params } = useProbabilityStore()
  const [specifyN, setSpecifyN] = useState(false)
  const [triggerSample, setTriggerSample] = useState(false)

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
  }, [nSample, distr, params, triggerSample])
  return <div>
    <h2>Sampling From the Distribution</h2>
    <div className="bg-neutral-100 dark:bg-black rounded-2xl p-6 shadow-lg flex justify-between gap-3 flex-col lg:flex-row">
      <div id='sampling' />
      <div className="flex flex-col gap-3 w-full max-h-96">
        <div className='flex flex-wrap gap-2 items-center'>
          # Samples:
          {!specifyN && <>
            {defaultSampleSizes.map(item=><button key={item} className={nSample === item ? 'bg-blue-200 dark:text-black' : ''} onClick={() => {
              setTriggerSample(!triggerSample)
              setNSample(item)
            }}>{item}</button>)}
            <button onClick={() => setSpecifyN(true)}>Other values</button>

          </>}
          {specifyN && <>
            <input className='w-32' name='nSample' maxLength="4" value={nSample} onChange={e => setNSample(e.target.value)} />
            <button onClick={() => setTriggerSample(!triggerSample)}>Re-generate</button>
            <button onClick={() => setSpecifyN(false)}>Use default values</button>
          </>}

        </div>

        Samples generated:
        <p className='overflow-y-scroll h-full border rounded p-4' id='sample' />

      </div>
    </div>
  </div>
}

const defaultSampleSizes = [50, 100, 500, 1000]