export const metadata = {
  title: "Probability Distribution Calculator & Visualization",
  description: "Best online tools for probability and statistics.",
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
      <aside >
        <div className="md:h-12" />
        <Panel />
        <DistributionSelector />
        <ParametersSelector />
        <ShowPlotSelector />
      </aside>
      <div className="p-8" >
        <h1 className="text-sm dark:text-gray-400 text-gray-600">
          ProllyYes is the best free online tool for calculation and visualization of probability distributions and statistics.
        </h1>
      </div >
      <div className="grow" />
      <footer className="text-sm dark:text-gray-400 text-gray-600 p-8">ProllyYes @ 2024</footer>
    </div>
    <Stage />
  </>
}
