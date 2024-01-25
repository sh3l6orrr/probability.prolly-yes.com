'use client'

import Pdf from "./Pdf"
import Cdf from "./Cdf"
import Attributes from "./Attributes"
import Sampling from "./Sampling"
import { useProbabilityStore } from "./store"
import Meta from "./Meta"

export default function Stage() {
  const { showPlot, type } = useProbabilityStore()

  return <div className="flex flex-col gap-4">
    {showPlot.includes('meta') && <div style={{ order: showPlot.indexOf('meta') + 1 }}><Meta pmf={type === 'discrete'}/></div>}
    {showPlot.includes('attributes') && <div style={{ order: showPlot.indexOf('attributes') + 1 }}> <Attributes /></div>}
    {showPlot.includes('pdf') && <div style={{ order: showPlot.indexOf('pdf') + 1 }}><Pdf pmf={type === 'discrete'} /></div>}
    {showPlot.includes('cdf') && <div style={{ order: showPlot.indexOf('cdf') + 1 }}><Cdf pmf={type === 'discrete'} /></div>}
    {showPlot.includes('sampling') && <div style={{ order: showPlot.indexOf('sampling') + 1 }}><Sampling /></div>}
    {showPlot.length === 0 && <h2>{"You didn't select any visualizations."}</h2>}
  </div>
}