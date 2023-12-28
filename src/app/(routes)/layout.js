import './globals.css'

export default function Layout({ children }) {
  return (
    <div className='
    min-h-screen grid place-content-center
    dark:bg-neutral-900'>
      {children}
    </div>
  )
}
