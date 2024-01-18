export const metadata = {
  title: "About"
}

export default function Page() {
  return <>
    <main className="p-8 gap-4 flex flex-col">
      <h1>ProllyYes: Probability Distribution Calculator & Visualization</h1>
      <p>The project is built on top of <a className='text-blue-500' href='https://scipy.org'>Scipy</a>, <a className='text-blue-500' href='https://sympy.org'>Sympy</a>,
        and the visualization library <a className='text-blue-500' href='https://altair-viz.github.io'>Vega-Altair</a>.
      </p>
      <p>For feature requests or bug reports, <a className='text-blue-500' href="mailto:sh3l6orrr@gmail.com">mail to the maintainer</a>.</p>
    </main>


  </>
}