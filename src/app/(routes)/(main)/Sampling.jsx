import { useEffect, useState, useRef } from "react"
import { useProbabilityStore } from "./store"
import { getSampling } from "./actions"

export default function Sampling() {
  const { nSample, setNSample, distr, params, trigger } = useProbabilityStore()
  const [specifyN, setSpecifyN] = useState(false)
  const [triggerSample, setTriggerSample] = useState(false)
  const contentRef = useRef(null)

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
  }, [distr, trigger, triggerSample])



  return <div>
    <h2>Sampling From the Distribution</h2>
    <div className="bg-neutral-100 dark:bg-black rounded-2xl p-6 shadow-lg flex justify-between gap-3 flex-col lg:flex-row">
      <div id='sampling' />
      <div className="flex flex-col gap-3 w-full max-h-96">
        <div className='flex flex-wrap gap-3 justify-between'>
          {!specifyN && <>
            <div className='flex flex-wrap gap-2 items-center'>
              Size:
              {defaultSampleSizes.map(item => <button key={item} className={nSample === item ? 'bg-blue-200 dark:text-black' : ''} onClick={() => {
                setNSample(item)
                setTriggerSample(!triggerSample)
              }}>{item}</button>)}
            </div>
            <button className='button-secondary' onClick={() => setSpecifyN(true)}>Customize</button>

          </>}
          {specifyN && <>
            <div className='flex flex-wrap gap-2 items-center'>
              Size:
              <input className='w-32' name='nSample' maxLength="4" value={nSample} onChange={e => setNSample(e.target.value)} />
              <button onClick={() => setTriggerSample(!triggerSample)}>Generate</button>
            </div>
            <button className='button-secondary' onClick={() => setSpecifyN(false)}>Use Default Values</button>
          </>}

        </div>


        <div className="flex justify-between">
          <div>
            Samples generated:
          </div>
          <button className='button-secondary' onClick={async () => {
            const textToCopy = contentRef.current.innerText
            await navigator.clipboard.writeText(textToCopy)
          }}> Copy </button>
        </div>
        <div ref={contentRef} className='overflow-y-scroll max-h-full border rounded-2xl p-3' id='sample' />

      </div>
    </div>
  </div>
}

const defaultSampleSizes = [50, 100, 500, 1000]