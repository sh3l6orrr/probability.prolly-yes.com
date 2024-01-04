'use client'

import PdfPlot from "./PdfPlot"
import CdfPlot from "./CdfPlot"
import Moments from "./Moments"
import Selector from "./Selector"
import Parameters from "./Parameters"
import Distribution from "./Distribution"
import PmfPlot from "./PmfPlot"
import Panel from "./Panel"
import Sampling from "./Sampling"
import { useProbabilityStore } from "./store"

export default function Stage() {
  const { showPlot } = useProbabilityStore()

  return <div>
    <aside className="bg-white dark:bg-black flex flex-col
    w-screen md:fixed md:w-96 md:h-screen md:border-r">
      <Panel />
      <Distribution />
      <Parameters />
      <Selector />
    </aside>

    <div className="p-8 flex flex-col gap-4 md:ml-96 ">
      {showPlot.includes('moments') && <div style={{ order: showPlot.indexOf('moments') + 1 }}> <Moments /></div>}
      {showPlot.includes('pdf') && <div style={{ order: showPlot.indexOf('pdf') + 1 }}><PdfPlot /></div>}
      {showPlot.includes('pmf') && <div style={{ order: showPlot.indexOf('pmf') + 1 }}><PmfPlot /></div>}
      {showPlot.includes('cdf') && <div style={{ order: showPlot.indexOf('cdf') + 1 }}><CdfPlot /></div>}
      {showPlot.includes('sampling') && <div style={{ order: showPlot.indexOf('sampling') + 1 }}><Sampling /></div>}
      {showPlot.length === 0 && <h2>{"You didn't select any visualizations."}</h2>}
    </div>

  </div>
}