import { useEffect } from "react"
import { useProbabilityStore } from "./store"
import { showCdf, showPdf } from "./actions"

export default function Plot() {
  const { showPlot, setShowPlot, distr, params, rerender, setRerender } = useProbabilityStore()

  useEffect(() => {
    let formData = new FormData();
    for (const key in params) formData.append(key, params[key])
    formData.append('distr', distr)

    async function update() {
      let data;
      switch (showPlot) {
        case 'pdf':
          data = await showPdf(formData)
          break
        case 'cdf':
          data = await showCdf(formData)
          break
      }
      if (data) await vegaEmbed('#plot', data)
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender])

  return <>
    <h2>Plots</h2>
    <div className="
      bg-neutral-100 dark:bg-black
      min-h-96 w-full
      rounded-2xl p-6
    ">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <button onClick={() => {
            setShowPlot('pdf')
            setRerender(!rerender)
          }}>PDF</button>
          <button onClick={() => {
            setShowPlot('cdf')
            setRerender(!rerender)
          }}>CDF</button>
        </div>
        <div id='plot' />
      </div>

    </div>

  </>
}