'use client'

import Script from "next/script"
import Settings from "./Settings"
import Plot from "./Plot"
import Moments from "./Moments"

export default function Stage() {

  return <>
    <Settings />
    <div className="h-5" />
    <Moments />
    <div className="h-5" />
    <Plot />
    <Script src="https://cdn.jsdelivr.net/npm/vega@5"></Script>
    <Script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></Script>
    <Script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></Script>
  </>
}