import './globals.css'
import 'katex/dist/katex.min.css'
import Script from 'next/script'

export default function Layout({ children }) {

  return <>
    <div className='min-h-screen dark:bg-neutral-900'>
      {children}
    </div>
    <Script src="https://cdn.jsdelivr.net/npm/vega@5" />
    <Script src="https://cdn.jsdelivr.net/npm/vega-lite@5" />
    <Script src="https://cdn.jsdelivr.net/npm/vega-embed@6" />
  </>

}
