export const metadata = {
  title: "About"
}

export default function Page() {
  return <>
    <div className="h-12"></div>
    <main className="p-8 gap-4 flex flex-col">
      <h1>Online Probability Distribution Calculator</h1>
      <p>The project is built on top of <a className='text-blue-500' href='https://scipy.org'>Scipy</a>, <a className='text-blue-500' href='https://sympy.org'>Sympy</a>,
        and the visualization library <a className='text-blue-500' href='https://altair-viz.github.io'>Vega-Altair</a>. This project is part of the <a className='text-blue-500' href='https://www.prolly-yes.com'>ProllyYes toolset</a>.
      </p>
      <p>For feature requests or bug reports, <a className='text-blue-500' href="mailto:sh3l6orrr@gmail.com">mail to the maintainer</a>.</p>
    </main>


  </>
}