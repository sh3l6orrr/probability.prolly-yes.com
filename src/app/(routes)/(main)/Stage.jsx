'use client'

import Script from "next/script"
import PdfPlot from "./PdfPlot"
import CdfPlot from "./CdfPlot"
import Moments from "./Moments"
import Selector from "./Selector"
import Parameters from "./Parameters"
import Distribution from "./Distribution"
import PmfPlot from "./PmfPlot"
import Panel from "./Panel"
import { useProbabilityStore } from "./store"
import { useEffect } from "react"
import { showCdf, showPdf, getMoments, showPmf } from "./actions"


export default function Stage() {
  const { showPlot, distr, params, rerender, setMoments } = useProbabilityStore()

  useEffect(() => {
    let formData = new FormData();
    for (const key in params) formData.append(key, params[key])
    formData.append('distr', distr)

    async function update() {

      if (showPlot.includes('pdf')) {
        const pdf = await showPdf(formData)
        if (pdf) await vegaEmbed('#pdf', pdf)
      }
      if (showPlot.includes('pmf')) {
        const pmf = await showPmf(formData)
        if (pmf) await vegaEmbed('#pmf', pmf)
      }
      if (showPlot.includes('cdf')) {
        const cdf = await showCdf(formData)
        if (cdf) await vegaEmbed('#cdf', cdf)
      }
      if (showPlot.includes('moments')) {
        const moments = await getMoments(formData)
        if (moments) setMoments(moments)
      }
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distr, params, showPlot])
  return <div>
    <aside className="fixed w-96 h-screen bg-white dark:bg-black border-r flex flex-col">
      <Panel />
      <Distribution />
      <Parameters />
      <Selector />
    </aside>
    
    <div className="ml-96 p-8 flex flex-col gap-3">
      {showPlot.includes('moments') && <div style={{order: showPlot.indexOf('moments') + 1}}> <Moments /></div>}

      {showPlot.includes('pdf') && <div style={{order: showPlot.indexOf('pdf') + 1}}><PdfPlot /></div>}
      {showPlot.includes('pmf') && <div style={{order: showPlot.indexOf('pmf') + 1}}><PmfPlot /></div>}
      {showPlot.includes('cdf') && <div style={{order: showPlot.indexOf('cdf') + 1}}><CdfPlot /></div>}
    </div>
    <Script src="https://cdn.jsdelivr.net/npm/vega@5"></Script>
    <Script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></Script>
    <Script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></Script>
  </div>
}