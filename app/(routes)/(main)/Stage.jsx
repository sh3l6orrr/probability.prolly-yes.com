'use client'

import PdfPlot from "./PdfPlot"
import CdfPlot from "./CdfPlot"
import Moments from "./Moments"
import ShowPlotSelector from "./ShowPlotSelector"
import ParametersSelector from "./ParametersSelector"
import DistributionSelector from "./DistributionSelector"
import Panel from "./Panel"
import Sampling from "./Sampling"
import { useProbabilityStore } from "./store"

export default function Stage() {
  const { showPlot, type } = useProbabilityStore()

  return <div>
    <aside className="bg-white dark:bg-black flex flex-col
    w-screen md:fixed md:w-96 md:h-screen md:border-r md:overflow-scroll md:top-0">
      <div className="md:h-12" />
      <Panel />
      <DistributionSelector />
      <ParametersSelector />
      <ShowPlotSelector />
    </aside>

    <div className="px-8 py-4 flex flex-col gap-4 md:ml-96 ">
      {showPlot.includes('moments') && <div style={{ order: showPlot.indexOf('moments') + 1 }}> <Moments /></div>}
      {showPlot.includes('pdf') && <div style={{ order: showPlot.indexOf('pdf') + 1 }}><PdfPlot pmf={type==='discrete'}/></div>}
      {showPlot.includes('cdf') && <div style={{ order: showPlot.indexOf('cdf') + 1 }}><CdfPlot pmf={type==='discrete'}/></div>}
      {showPlot.includes('sampling') && <div style={{ order: showPlot.indexOf('sampling') + 1 }}><Sampling /></div>}
      {showPlot.length === 0 && <h2>{"You didn't select any visualizations."}</h2>}
    </div>

  </div>
}