export default function PlotSizeToggler({ setPlotSize, setThisTrigger, plotSize, thisTrigger }) {
  return <>
    <form className="md:flex items-center gap-5 flex-wrap hidden">
      <h4>Plot Size</h4>

      <div className="flex gap-5 items-center">
        Width
        <input type="range" min='250' max='500' className="w-16" value={plotSize.width}
          onChange={e => setPlotSize({ ...plotSize, width: parseInt(e.target.value) })} onMouseUp={() => setThisTrigger(!thisTrigger)} />
        Height
        <input type="range" min='250' max='500' className="w-16" value={plotSize.height}
          onChange={e => setPlotSize({ ...plotSize, height: parseInt(e.target.value)})} onMouseUp={() => setThisTrigger(!thisTrigger)} />
      </div>
    </form>
  </>
}