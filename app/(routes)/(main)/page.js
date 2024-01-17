export const metadata = {
  title: "Probability Distribution Calculator",
  description: "ProllyYes: Best online tools for probability and statistics.",
}

import Stage from "./Stage"
import ShowPlotSelector from "./ShowPlotSelector"
import ParametersSelector from "./ParametersSelector"
import DistributionSelector from "./DistributionSelector"
import Panel from "./Panel"

export default function Home() {
  return <>
    <div className="bg-white dark:bg-black flex flex-col
    w-screen md:fixed md:w-96 md:h-screen md:border-r md:overflow-scroll md:top-0">
      <aside>
        <div className="md:h-12" />
        <Panel />
        <DistributionSelector />
        <ParametersSelector />
        <ShowPlotSelector />
      </aside>
    </div>
    <div className="px-8 py-4 md:ml-96 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Stage />
      </div>
      <div className="grow" />
      <div className="">
        ProllyYes @ 2024 <div className="w-2 inline-block"/><h1 className="text-sm dark:text-gray-400 text-gray-600 inline">Best free online tool for calculation and visualization of probability distributions and statistics. </h1>
      </div>
    </div>


  </>
}
