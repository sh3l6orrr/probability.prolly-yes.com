'use client'

import Script from "next/script"
import PdfPlot from "./PdfPlot"
import CdfPlot from "./CdfPlot"
import Moments from "./Moments"
import Selector from "./Selector"
import Parameters from "./Parameters"
import Distribution from "./Distribution"
import PmfPlot from "./PmfPlot"

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
  }, [rerender])
  return <>
    <div className="flex flex-col gap-3">
      <Distribution />
      <Parameters />
      <Selector />
      {showPlot.includes('moments') && <Moments />}
      {showPlot.includes('pdf') && <PdfPlot />}
      {showPlot.includes('pmf') && <PmfPlot />}
      {showPlot.includes('cdf') && <CdfPlot />}
    </div>
    <Script src="https://cdn.jsdelivr.net/npm/vega@5"></Script>
    <Script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></Script>
    <Script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></Script>
  </>
}