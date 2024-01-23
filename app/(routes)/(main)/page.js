export const metadata = {
  title: "Online Probability Distribution Calculator",
  description: "Probability Distribution Calculator from ProllyYes",
}

import Stage from "./Stage"
import Settings from "./Settings"
export default function Home() {
  return <>
    <div className="bg-white dark:bg-black flex flex-col
    w-screen fixed md:w-96 md:h-screen md:border-r md:overflow-scroll md:top-0 z-30">
      <aside>
        <div className="md:h-12" />
        <Settings />
      </aside>
    </div>
    <div className="px-8 py-4 md:ml-96 flex flex-col gap-4 mt-40 md:mt-0">
      <div className="flex flex-col gap-4">
        <Stage />
      </div>
      <div className="grow" />
      <div className="">
        ProllyYes @ 2024 <div className="w-2 inline-block"/><h1 className="text-sm dark:text-gray-400 text-gray-600 inline">An online tool for calculation and visualization of probability distributions. </h1>
      </div>
    </div>


  </>
}
