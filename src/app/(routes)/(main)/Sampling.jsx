import { useEffect, useState, useRef } from "react"
import { useProbabilityStore } from "./store"
import { getSampling } from "./actions"
import { InlineMath } from 'react-katex'

export default function Sampling() {
  const { nSample, setNSample, distr, params, trigger, setFailed } = useProbabilityStore()
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
        await vegaEmbed('#sampling', sampling.hist, { height: 334, actions: false })
        document.getElementById('sample').textContent = sampling.sample.join(', ')
      } else setFailed(true)
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distr, trigger, triggerSample])



  return <div>
    <h2>Sampling From the Distribution</h2>
    <div className="visualization">
      <div>
        <div className='plot' id='sampling' />
      </div>

      <div className="flex flex-col gap-3 w-full max-h-96">
        <div>
          {!specifyN && <div className="flex justify-between">
            <div className='flex flex-wrap gap-2 items-center'>
              <InlineMath math={`n =`} />
              {defaultSampleSizes.map(item => <button key={item} className={nSample === item ? 'bg-blue-200 dark:text-black' : ''} onClick={() => {
                setNSample(item)
                setTriggerSample(!triggerSample)
              }}>{item}</button>)}
            </div>
            <button className='button-secondary' onClick={() => setSpecifyN(true)}>Customize</button>
          </div>}
          {specifyN && <div className="flex justify-between">
            <div className='flex flex-wrap gap-2 items-center'>
              <InlineMath math={`n =`} />
              <input className='w-32' name='nSample' maxLength="4" value={nSample} onChange={e => setNSample(e.target.value)} />
              <button onClick={() => setTriggerSample(!triggerSample)}>Generate</button>
            </div>
            <button className='button-secondary' onClick={() => setSpecifyN(false)}>Use Default Values</button>
          </div>}
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
        <div ref={contentRef} className='overflow-y-scroll max-h-full border rounded-2xl p-3 border-gray-300 dark:border-gray-700' id='sample' />

      </div>
    </div>
  </div>
}

const defaultSampleSizes = [50, 100, 500, 1000]