import { useEffect, useState, useRef } from "react"
import { useProbabilityStore } from "./store"
import { getSampling } from "./actions"
import { InlineMath } from 'react-katex'
import { Vega } from "react-vega"
import PlotSizeToggler from "./PlotSizeToggler"

export default function Sampling() {
  const { distr, params, trigger, setFailed } = useProbabilityStore()
  const [specifyN, setSpecifyN] = useState(false)
  const [spec, setSpec] = useState({})
  const [thisTrigger, setThisTrigger] = useState(false)
  const [samples, setSamples] = useState([''])
  const [nSample, setNSample] = useState(50)
  const [plotSize, setPlotSize] = useState({ width: 360, height: 300 })
  const contentRef = useRef(null)
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (copied) {
      const timeoutId = setTimeout(() => {
        setCopied(false);
      }, 3000)
      return () => clearTimeout(timeoutId);
    }

  }, [copied])
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
        setSpec(sampling.hist)
        setSamples(sampling.sample)
      } else setFailed(true)
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, thisTrigger])



  return <div>
    <h2>Sampling From the Distribution</h2>
    <div className="visualization">
      <div className='flex flex-col gap-5 grow'>
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
            <input className='w-32' name='nSample' maxLength="4" value={nSample} onChange={e => setNSample(parseInt(e.target.value))} />
            <button onClick={() => setThisTrigger(!thisTrigger)}>Generate</button>
          </div>
          <button className='button-secondary' onClick={() => setSpecifyN(false)}>Use Default Values</button>
        </div>}
        <div className="flex justify-between">
          <div>
            Samples generated:
          </div>
          <button className='button-secondary' onClick={async () => {
            setCopied(true)
            const textToCopy = contentRef.current.innerText
            await navigator.clipboard.writeText(textToCopy)
          }}> {copied ? '✅' : 'Copy'}  </button>
        </div>

        <div ref={contentRef} className='border rounded-2xl p-3 border-gray-300 dark:border-gray-700 overflow-y-scroll max-h-52'>{samples.join(', ')}</div>


        <PlotSizeToggler setPlotSize={setPlotSize} thisTrigger={thisTrigger} plotSize={plotSize} setThisTrigger={setThisTrigger} />
      </div>
      <div className="shrink-0 overflow-scroll">
        <Vega className='plot' spec={spec} actions={false} />
      </div>
    </div>

  </div>
}

const defaultSampleSizes = [50, 100, 500, 1000]