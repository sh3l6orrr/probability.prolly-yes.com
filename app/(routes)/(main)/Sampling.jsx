import { useEffect, useState, useRef } from "react"
import { useProbabilityStore } from "./store"
import { getSampling } from "./actions"
import { InlineMath } from 'react-katex'
import { Vega } from "react-vega"

export default function Sampling() {
  const { nSample, setNSample, distr, params, trigger, setFailed } = useProbabilityStore()
  const [specifyN, setSpecifyN] = useState(false)
  const [spec, setSpec] = useState({})
  const [thisTrigger, setThisTrigger] = useState(false)
  const [plotSize, setPlotSize] = useState({
    width: 400,
    height: 300
  })
  const contentRef = useRef(null)

  useEffect(() => {
    const data = {
      distr: {
        name: distr,
        params: params
      },
      n_sample: nSample,
      size: plotSize
    }
    async function update() {
      const sampling = await getSampling(data)
      if (sampling) {
        setSpec(sampling)
        document.getElementById('sample').textContent = sampling.sample.join(', ')
      } else setFailed(true)
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, thisTrigger])



  return <div>
    <h2>Sampling From the Distribution</h2>
    <div className="visualization">
      <div className="flex flex-col gap-5 max-h-96 grow">
        {!specifyN && <div className="flex justify-between">
          <div className='flex flex-wrap gap-2 items-center'>
            <InlineMath math={`n =`} />
            {defaultSampleSizes.map(item => <button key={item} className={nSample === item ? 'bg-blue-200 dark:text-black' : ''} onClick={() => {
              setNSample(item)
              setThisTrigger(!thisTrigger)
            }}>{item}</button>)}
          </div>
          <button className='button-secondary' onClick={() => setSpecifyN(true)}>Customize</button>
        </div>}
        {specifyN && <div className="flex justify-between">
          <div className='flex flex-wrap gap-2 items-center'>
            <InlineMath math={`n =`} />
            <input className='w-32' name='nSample' maxLength="4" value={nSample} onChange={e => setNSample(e.target.value)} />
            <button onClick={() => setThisTrigger(!thisTrigger)}>Generate</button>
          </div>
          <button className='button-secondary' onClick={() => setSpecifyN(false)}>Use Default Values</button>
        </div>}
        <div className="flex justify-between">
          <div>
            Samples generated:
          </div>
          <button className='button-secondary' onClick={async () => {
            const textToCopy = contentRef.current.innerText
            await navigator.clipboard.writeText(textToCopy)
          }}> Copy </button>
        </div>

        <div ref={contentRef} className='overflow-y-scroll border rounded-2xl p-3 border-gray-300 dark:border-gray-700 ' id='sample' />
        <form className="flex items-center gap-5 flex-wrap">
          <h4>Plot Size</h4>

          <div className="flex gap-5 items-center">
            Width
            <input type="range" min='250' max='500' className="w-16" value={plotSize.width}
              onChange={e => setPlotSize({ ...plotSize, width: e.target.value })} onMouseUp={() => setThisTrigger(!thisTrigger)} />
            Height
            <input type="range" min='250' max='500' className="w-16" value={plotSize.height}
              onChange={e => setPlotSize({ ...plotSize, height: e.target.value })} onMouseUp={() => setThisTrigger(!thisTrigger)} />
          </div>
        </form>
      </div>
      <div>
        <Vega spec={spec} className="plot" actions={false}/>
      </div>
    </div>

  </div>
}

const defaultSampleSizes = [50, 100, 500, 1000]